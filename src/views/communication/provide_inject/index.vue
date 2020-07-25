<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:37:22
--> 
<template>
  <div>
    <md></md>
    <div class="rl-show-area">
      <p>改变父组件的count，观察子组件中注入数据的变化：<button @click="parentCount++">count + 1</button></p>
      <child></child>
      <grandson></grandson>
    </div>
    <point>provide 和 inject 绑定并不是可响应的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的，绿色部分的值就是通过注入父组件获取的，这就是可响应的。</point>
  </div>
</template>

<script>
import child from './child'
import md from './index.md'
import grandson from './grandson'

export default {
  components: {
    md,
    child,
    grandson,
  },
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
      parent: this,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>