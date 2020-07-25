<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:45:28
--> 
<template>
  <div>
    <md></md>
    <div class="rl-show-area">
      <p>在父组件中，通过this.$refs.child获取子组件实例，调用子组件add方法：<button @click="$refs.child.add()">this.$refs.child.add()</button></p>
      <!-- 子组件 -->
      <child ref="child"></child>
    </div>
    <point>$children和$refs的区别是：前者只能获取子组件，而$refs，可以获取到所有设置了ref属性的子组件、子孙组件、子节点以及子孙节点。</point>
  </div>
</template>

<script>
import child from './child'
import md from './index.md'
export default {
  components: {
    child,
    md,
  },
}
</script>

<style lang="scss" scoped>
</style>