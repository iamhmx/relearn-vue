<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:40:16
--> 
<template>
  <div>
    <rl-text>常用于父子组件之间传值，不适合层级太深的父子组件通信。</rl-text>
    <sub-title>父组件：</sub-title>
    <mk :content="html" />
    <mk :content="js" />
    <sub-title>子组件：</sub-title>
    <mk :content="childHtml" />
    <mk :content="childJs" />
    <child name="vue"
           @clickChild="handleEmit"></child>
    <point v="子组件派发的clickChild事件，虽然是在父组件中实现的，但是监听者仍然是子组件child；事件监听原则：谁派发谁监听。"></point>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child
  },
  data() {
    return {
      html: this.genHtml(`
<!-- 父组件，给子组件child传入name属性，值为vue -->
<child name="vue" @clickChild="handleEmit"></child>
      `),
      js: this.genJs(`
export default {
  methods: {
    handleEmit(val) {
      alert('子组件通过$emit派发click事件，值为' + val)
    }
  }
}`),
      childHtml: this.genHtml(`
<!-- 子组件派发一个名为clickChild -->
<button @click="clickHandle">Try it!</button>`),
      childJs: this.genJs(`
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
}`)
    }
  },
  methods: {
    handleEmit(val) {
      alert('子组件通过$emit派发click事件，值为' + val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>