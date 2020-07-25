### 父组件provide数据，所有后代组件都可以通过inject获得数据，常用于深层次的父子组件通信，封装组件库。
父组件：
```html
<button @click="parentCount++">count + 1</button>
```
```js
export default {
  data() {
    return {
      parentCount: 0,
    }
  },
  provide() {
    return {
      // provide父组件的属性parentCount
      count: this.parentCount,
      // provide父组件自身实例
      parent: this
    }
  }
}
```
子组件：  
```html
<template>
  <div>
    <!-- 当父组件的count改变是，这里并不会改变 -->
    <p>孩子组件，显示注入的count：{{childCount}}</p>
    <p class="reactive">孩子组件，通过注入的父组件实例获取值：{{parent.parentCount}}</p>
  </div>
</template>
```
```js
export default {
  // 注入数据，可以直接使用数组的形式
  // inject: ['count', 'parent']
  inject: {
    // 取别名、设置默认值
    childCount: {
      from: 'count',
      default: 0
    },
    parent: {
      from: 'parent'
    }
  }
}
```
孙子组件：  
```html
<template>
  <div>
    <!-- 当父组件的count改变是，这里并不会改变 -->
    <p>孙子组件，显示注入的count：{{count}}</p>
    <p class="reactive">孙子组件，通过注入的父组件实例获取值：{{parent.parentCount}}</p>
  </div>
</template>
```
```js
export default {
  // 注入数据，使用数组的形式
  inject: ['count', 'parent']
}
```