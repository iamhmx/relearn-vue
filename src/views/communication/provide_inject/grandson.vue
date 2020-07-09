<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:38:42
--> 
<template>
  <div>
    <p>孙子组件，直接注入的data：{{grandsonCount}}</p>
    <p style="color: orange;">孙子组件，注入的父组件实例：{{parent.parentCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'Grandson',
  inject: {
    grandsonCount: {
      from: 'count',
      default: 0
    },
    parent: {
      from: 'parent'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>