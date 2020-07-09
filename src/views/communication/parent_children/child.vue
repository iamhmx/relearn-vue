<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:10:06
--> 
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>