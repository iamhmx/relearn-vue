/*
 * @Author: mingxing.huang
 * @Date: 2020-08-28 10:07:39
 */
class Mvvm {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    observe(this.$data)
    proxy(this)

    new Compile(this.$options.el, this)
  }
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  new Observe(obj)
}

function defineReactive(obj, key, val) {
  observe(val)
  // 每一个key对应一个dep
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      console.log('读取：', key)
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

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        console.log('读取：', key)
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

class Observe {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        console.log('编译元素：', node.nodeName)
        this.compileElement(node)
      } else if (this.isInterpolation(node)) {
        console.log('编译插值文本：', node.textContent)
        this.compileText(node)
      }
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
        const method =
          this.$vm.$options.methods && this.$vm.$options.methods[attrValue]
        // 设置事件监听
        node.addEventListener(event, method.bind(this.$vm))
      }
    })
  }

  // 编译文本节点
  compileText(node) {
    // 调用update，生成textUpdater方法，并执行调用
    this.update(node, RegExp.$1, 'text')
  }

  html(node, exp) {
    // 调用update，生成htmlUpdater方法，并执行调用
    this.update(node, exp, 'html')
  }

  model(node, exp) {
    // 调用update，生成modelUpdater方法，并执行调用
    this.update(node, exp, 'model')
    // 监听事件
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }

  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }

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

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 将当前watcher设置给Dep.target
    Dep.target = this
    // 读一次key，触发getter，收集
    this.vm[this.key]
    // 清除
    Dep.target = null
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}
