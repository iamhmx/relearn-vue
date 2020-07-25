### 常用于父与子、父与子孙组件之间通信。
父组件：  
```html
<div>
  <!-- 子组件 -->
  <child ref='child'></child>
  <!-- 子节点 -->
  <div ref='div1'>
    <!-- 子孙节点 -->
    <div ref='div2'></div>
  </div>
<div>
```
子组件：  
```html
<template>
  <div>
    子组件的count：{{count}}
  </div>
</template>
```
```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add() {
      this.count++
    }
  }
}
```