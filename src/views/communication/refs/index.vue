<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:45:28
--> 
<template>
  <div>
    <sub-title>dom结构：</sub-title>
    <rl-img imgName="refs"></rl-img>
    <sub-title>打印this.$refs结果：</sub-title>
    <rl-img imgName="refs-result"></rl-img>
    <!-- 子组件 -->
    <child ref="child"></child>
    <!-- 子节点 -->
    <div ref="div1">
      <!-- 子孙节点 -->
      <div ref=div2></div>
    </div>
    <p>通过this.$refs，可以获取到所有设置了ref属性的子组件、子孙组件、子节点以及子孙节点</p>
    <point>$children和$refs的区别是：前者只能获取子组件</point>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child
  },
  mounted() {
    console.log('refs：', this.$refs)
  }
}
</script>

<style lang="scss" scoped>
</style>