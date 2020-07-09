<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:37:22
--> 
<template>
  <div>
    <p><button @click="parentCount++">count + 1</button></p>
    <child></child>
    <grandson></grandson>
    <p class="tips">注：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。橙色部分就是直接注入父组件，并取其data。</p>
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
      count: this.parentCount,
      parent: this
    }
  }
}
</script>

<style lang="scss" scoped>
</style>