<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:38:26
--> 
<template>
  <div>
    <p>孩子组件，直接注入的data：{{childCount}}</p>
    <p style="color: orange;">孩子组件，注入的父组件实例：{{parent.parentCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'Child',
  inject: {
    childCount: {
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