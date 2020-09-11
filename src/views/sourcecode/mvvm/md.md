### 实现目标

- 插值绑定

  - 在 `html` 中 绑定 `counter`
  - 初始化显示 `1`
  - 间隔 1s，`counter` 加 1

- `v-html`：显示一段 `html`
- `v-model`：实现双向绑定
- `@click`：实现点击事件

效果如下：

<img src="https://relearnvue.com/static/mvvm.gif">

```HTML
<body>
  <div id="app">
    <p>{{counter}}</p>
    <p @click="clickHandle">{{count}}</p>
    <p v-html="htmlContent"></p>
    <input type="text" v-model="username" />
    <p>{{username}}</p>
  </div>
  <script src="./mvvm.js"></script>
  <script>
    const app = new Mvvm({
      el: '#app',
      data: {
        counter: 1,
        count: 0,
        username: '我叫小红',
        htmlContent: "<span style='color: red;'>嘻嘻</span>"
      },
      methods: {
        clickHandle() {
          this.count++
        }
      }
    })
    // 改变counter
    setInterval(() => {
      app.counter++
    }, 1000)
  </script>
</body>
```

看起来很简单啊 😆 ， 自己实现一下试试

### mvvm 要做的事

1. 对 `data` 数据进行响应式处理
2. `{{}}`、`v-model`、`v-html`、`@click`并不是原生的 `html` 标记，需要进行解析，并从 `data` 中取出对应的值，初始化页面
3. 对 `html` 中用到的数据进行收集，当该值变化时，通知所有用到的地方进行更新

为了解决上面几个问题，创建一些类来负责对应的工作：

- Observe：负责数据响应式处理
- Compile：解析模板，给每一个 key 创建一个 watcher
- Watcher：负责执行更新函数（每一个模板中用到的数据都会对应一个 Watcher）
- Dep：收集 Watcher（同一个 key 可能在模板中多次使用，当数据更新时，通知 Dep，Dep 通知它收集到的所有 Watcher 执行更新）

### 原理图：

<img src="https://relearnvue.com/static/mvvm.png" style="width: 800px;">

### Dep

Dep 只做两件事情

- 收集 watcher（在哪里收集？）
- 通知更新（在哪里通知更新？）

```js
class Dep {
  constructor() {
    this.deps = []
  }
  // 添加watcher
  addDep(watcher) {
    this.deps.push(watcher)
  }
  // 通知更新，遍历每一个watcher，然后watcher调用自己的update方法
  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}
```

### Watcher

编译解析模板时，每遇到一个 `key`，就为它创建一个 `watcher` 对象，在初始化时，会读取一次，是为了触发 `getter` 方法，将该 `watcher` 添加到 `Dep` 中

```js
class Watcher {
  // updateFn就是更新方法
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 将当前watcher设置给Dep.target
    Dep.target = this
    // 读取一次key，触发getter，收集该watcher
    this.vm[this.key]
    // 清除
    Dep.target = null
  }
  // 更新方法
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}
```

### Observe

数据响应式

```js
class Observe {
  constructor(value) {
    this.value = value
    // 源码中会区分对象和数组，这里忽略...
    this.walk(value)
  }

  walk(obj) {
    // 对每一个key进行响应书处理
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }

  defineReactive(obj, key, val) {
    // 这里需要对val递归处理，略去...
    // 每一个key对应一个dep
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        console.log('读取：', key)
        // 当创建watcher时，Dep.target会指向当前watcher，添加到dep中
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          console.log('设置：', key)
          observe(newVal)
          val = newVal
          // 通知更新
          dep.notify()
        }
      }
    })
  }
}
```

### Compile

模板编译：遍历模板，解析出 `vue` 特有的指令、语法糖等，分别处理

```js
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 遍历节点，分类处理
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        // 编译元素
        this.compileElement(node)
      } else if (this.isInterpolation(node)) {
        // 编译插值文本
        this.text(node)
      }
      // 递归处理子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点
  compileElement(node) {
    const attrs = node.attributes
    // 遍历属性，解析指令
    Array.from(attrs).forEach(attr => {
      const attrName = attr.name
      const attrValue = attr.value
      if (attrName.startsWith('v-')) {
        // v-model、v-text、v-html等指令
        // 例如：v-html="htmlContent"
        // 解析出：html和htmlContent，html对应更新方法，htmlContent对应data中的值
        const dir = attrName.substring(2)
        // 执行
        this[dir] && this[dir](node, attrValue)
      } else if (attrName.startsWith('@')) {
        // @click="clickHandle"
        // 解析出click，给元素添加对应的事件，回调事件的名称就是clickHandle
        const event = attrName.substring(1)
        // 从methods里面取出方法
        const methods = this.$vm.$options.methods
        const method = methods && methods[attrValue]
        // 设置事件监听
        node.addEventListener(event, method.bind(this.$vm))
      }
    })
  }

  // 处理插值文本
  text(node) {
    // 调用update，生成textUpdater方法，并执行调用
    this.update(node, RegExp.$1, 'text')
  }

  // 处理v-html
  html(node, exp) {
    // 调用update，生成htmlUpdater方法，并执行调用
    this.update(node, exp, 'html')
  }

  // 处理v-model
  model(node, exp) {
    // 调用update，生成modelUpdater方法，并执行调用
    this.update(node, exp, 'model')
    // 监听事件
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }

  // 生成更新函数，并执行，创建对应的watcher
  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  // 更新函数
  // 插值
  textUpdater(node, val) {
    node.textContent = val
  }

  // v-html
  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  // v-model
  modelUpdater(node, val) {
    node.value = val
  }

  // 类型判断
  isElement(node) {
    return node.nodeType === 1
  }

  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}
```

以上就实现了一个简单的 `mvvm` 框架，这也是 `vue1.x` 的实现原理，在 `vue1.x` 中，没有引入虚拟 `DOM`，当然也没有 `diff`，**这样的实现方式有什么不足吗?**
