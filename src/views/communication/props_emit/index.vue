<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:40:16
--> 
<template>
  <div>
    <child name="vue"
           @click="handleEmit"></child>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child
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