<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:37:22
--> 
<template>
  <div>
    <rl-text>父组件provide数据，所有后代组件都可以通过inject获得数据，常用于深层次的父子组件通信，封装组件库。</rl-text>
    <sub-title>父组件：</sub-title>
    <rl-img imgName="provide"></rl-img>
    <sub-title>子组件：</sub-title>
    <rl-img imgName="inject1"></rl-img>
    <sub-title>孙子组件：</sub-title>
    <rl-img imgName="inject2"></rl-img>
    <p><button @click="parentCount++">count + 1</button></p>
    <child></child>
    <grandson></grandson>
    <point>provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。<span style="color: rgb(65, 184, 131)">绿色部分</span>的值就是通过注入父组件获取的，这就是可响应的。</point>
  </div>
</template>

<script>
import child from './child'
import grandson from './grandson'
export default {
  components: {
    child,
    grandson
  },
  data() {
    return {
      parentCount: 0
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
</script>

<style lang="scss" scoped>
</style>