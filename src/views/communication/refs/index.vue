<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:45:28
--> 
<template>
  <div>
    <rl-text v="常用于父与子、父与子孙组件之间通信。"></rl-text>
    <sub-title>父组件：</sub-title>
    <mk :content="dom"></mk>
    <sub-title>打印 <span class="rl-keyword">this</span>.$refs 结果：</sub-title>
    <rl-img imgName="refs-result"></rl-img>
    <sub-title>子组件：</sub-title>
    <mk :content="childStr"></mk>
    <mk :content="childJs"></mk>
    <!-- 子节点 -->
    <div ref="div1">
      <!-- 子孙节点 -->
      <div ref=div2></div>
    </div>
    <div class="rl-show-area">
      <p>在父组件中，通过this.$refs.child获取子组件实例，调用子组件add方法：<button @click="$refs.child.add()">this.$refs.child.add()</button></p>
      <!-- 子组件 -->
      <child ref="child"></child>
    </div>
    <point v="$children和$refs的区别是：前者只能获取子组件，而$refs，可以获取到所有设置了ref属性的子组件、子孙组件、子节点以及子孙节点。"></point>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child,
  },
  data() {
    return {
      dom: this.genHtml(`
<div>
  <!-- 子组件 -->
  <child ref='child'></child>
  <!-- 子节点 -->
  <div ref='div1'>
    <!-- 子孙节点 -->
    <div ref='div2'></div>
  </div>
<div>`),
      childStr: this.genHtml(`
<template>
  <div>
    子组件的count：{{count}}
  </div>
</template>
`),
      childJs: this.genJs(`
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
`),
    }
  },
  mounted() {
    console.log('refs：', this.$refs)
  },
}
</script>

<style lang="scss" scoped>
</style>