### 实现 `notice` 组件：

```html
<template>
  <transition name="fade">
    <div v-if="isShow" class="notice-container">
      <div class="notice-content" :style="sty">{{ title }}：{{ content }}</div>
    </div>
  </transition>
</template>
```

```js
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 内容
    content: {
      type: String
    },
    // 显示时间
    duration: {
      type: Number,
      default: 2000
    },
    // 类型
    type: {
      type: String
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    // 根据 type，设置不同的颜色
    sty() {
      let bgColor = '#e9e9eb'
      let color = '#909399'
      if (this.type === 'success') {
        bgColor = '#e1f3d8'
        color = '#67c23a'
      } else if (this.type === 'error') {
        bgColor = '#fde2e2'
        color = '#f56c6c'
      }
      return {
        backgroundColor: bgColor,
        color
      }
    }
  },
  methods: {
    // 显示消息
    show() {
      this.isShow = true
      setTimeout(() => {
        // 消息消失、移除组件
        this.isShow = false
        this.remove()
      }, this.duration)
    }
  }
}
```

### 实现帮助方法，创建 `notice` 组件实例，并追加到页面上：

```js
// src/util/noticePlugin.js
function create(Component, props) {
  // 传入组件配置项，调用extend，得到组件构造方法
  const Ctor = Vue.extend(Component)
  // 创建组件实例，propsData接收传入的props数据
  const vm = new Ctor({ propsData: props })
  // 挂载，得到真实dom
  vm.$mount()
  // 移除组件方法，先从body中删除，再销毁组件
  vm.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  // 添加到body上
  document.body.appendChild(vm.$el)
  return vm
}
```
