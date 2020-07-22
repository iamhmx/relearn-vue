<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-22 11:32:07
--> 
<template>
  <div class="text-container">
    <div>
      <slot name="title"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rl-text'
}
</script>

<style lang="scss" scoped>
.text-container {
  line-height: 28px;
}
</style>