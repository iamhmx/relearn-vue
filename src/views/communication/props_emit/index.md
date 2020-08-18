### 常用于父子组件之间传值，不适合深层级的父子组件通信

父组件：

```html
<!-- 父组件，给子组件child传入name属性，值为vue -->
<child name="vue" @clickChild="handleEmit"></child>
```

```js
export default {
  methods: {
    handleEmit(val) {
      alert('子组件通过$emit派发clickChild事件，值为' + val)
    }
  }
}
```

子组件：

```html
<!-- 子组件派发一个名为clickChild -->
<button @click="clickHandle">Try it!</button>
```

```js
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickHandle() {
      this.$emit('clickChild', 'hello ' + this.name)
    }
  }
}
```
