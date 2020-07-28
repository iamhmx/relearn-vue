<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-16 17:01:19
 * 子标题组件
--> 
<template>
  <div class="sub-title-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sub-title',
}
</script>

<style lang="scss" scoped>
.sub-title-container {
  padding: 10px 0;
}
</style>