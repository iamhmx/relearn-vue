### 对于像checkbox这种选择型控件，可以设置model选项来指定接收的属性名和派发的事件名。
自定义组件custom2.vue：  
```html
<template>
  <div>
    苹果
    <input type="checkbox"
           :checked="checked"
           @change="changeHandle"
           value="苹果" />
  </div>
</template>
```
```js
export default {
  // 指定v-model接收的属性、派发的方法
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  methods: {
    changeHandle(e) {
      this.$emit('change', e.target.checked)
    },
  },
}
```