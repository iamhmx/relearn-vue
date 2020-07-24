<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:38:42
--> 
<template>
  <div>
    <!-- 当父组件的count改变是，这里并不会改变 -->
    <p>孙子组件，显示注入的count：{{count}}</p>
    <p class="reactive">孙子组件，通过注入的父组件实例获取值：{{parent.parentCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'Grandson',
  // 注入数据，可以直接使用数组的形式，inject: ['count', 'parent']
  inject: {
    count: {
      from: 'count',
    },
    parent: {
      from: 'parent',
    },
  },
}
</script>

<style lang="scss" scoped>
.reactive {
  color: $primary-color;
}
</style>