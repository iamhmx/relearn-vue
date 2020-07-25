<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-13 16:41:09
 * Tips显示组件
--> 
<template>
  <div class="rl-point">
    <svg-icon class="icon"
              icon="info"></svg-icon>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'point',
}
</script>

<style lang="scss" scoped>
.rl-point {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #e6f7ff;
  display: flex;
  flex-direction: row;
  .icon {
    min-width: 16px;
    height: 16px;
    margin-right: 4px;
    margin-top: 2px;
  }
}
</style>