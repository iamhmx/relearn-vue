### 实现目标

- 在 `html` 绑定 `counter`
- 初始化显示 `1`
- 间隔 1s，`counter` 加 1

```HTML
<body>
  <div id="app">
    <p>{{counter}}</p>
  </div>

  <!-- 实现mvvm.js -->
  <script src="./mvvm.js">
    const app = new Mvvm({
      el: '#app',
      data: {
        counter: 1
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
2. `html` 不认识双花括号，需要对 `html` 进行解析，并从 `data` 中取出对应的值，初始化页面
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

- 收集 watcher
- 通知更新

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

编译模板

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
    // 遍历节点，分类处理，这里只演示插值绑定类型
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 插值文本
      if (this.isInterpolation(node)) {
        console.log('编译插值文本：', node.textContent)
        this.compileText(node)
      }
      // 递归处理子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 判断是否是插值文本，并解出key
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 处理插值文本
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  // 生成更新函数
  update(node, key, type) {
    // 根据类型生成更新函数，这里就是：textUpdater
    const fn = this[type + 'Updater']
    // 执行更新函数，初始化页面
    fn && fn(node, this.$vm[key])

    // 用当前key和它的更新函数去创建watcher
    new Watcher(this.$vm, key, val => {
      fn && fn(node, val)
    })
  }

  // 这里是最终处理插值文本更新的地方
  textUpdater(node, val) {
    node.textContent = val
  }
}
```
