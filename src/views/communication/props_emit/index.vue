<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:40:16
--> 
<template>
  <div>
    <md></md>
    <child name="vue"
           @clickChild="handleEmit"></child>
    <point>子组件派发的clickChild事件，虽然是在父组件中实现的，但是监听者仍然是子组件child；事件监听原则：谁派发谁监听。</point>
  </div>
</template>

<script>
import md from './index.md'
import child from './child'
export default {
  components: {
    child,
    md,
  },
  methods: {
    handleEmit(val) {
      alert('子组件通过$emit派发click事件，值为' + val)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>