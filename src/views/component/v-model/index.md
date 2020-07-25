### 组件可以通过设置v-model来实现双向绑定，v-model是一个语法糖，实际做的事情是：接收一个名为value的prop，然后emit一个名为input的事件。
使用：  
```js
...

<custom1 v-model="a"></custom1>
<p>a的值：{{a}}</p>
<custom2 v-model="b"></custom2>
<p>b的值：{{b}}</p>

...

data() {
    return {
      a: '',
      b: true
    }
}
```
自定义组件custom1.vue：
```html
<template>
  <div>
    <input type="text"
           :value="value"
           @input="valueInput">
  </div>
</template>
```
```js
export default {
  props: {
    // 接收value属性
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    valueInput(e) {
      // emit名为input的事件
      this.$emit('input', e.target.value)
    },
  },
}
```