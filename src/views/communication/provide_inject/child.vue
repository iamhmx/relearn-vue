<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:38:26
--> 
<template>
  <div>
    <p>孩子组件，显示注入的count：{{childCount}}</p>
    <p class="reactive">孩子组件，通过注入的父组件实例获取值：{{parent.parentCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'Child',
  // 注入数据，可以直接使用数组的形式
  // inject: ['count', 'parent']
  inject: {
    // 取别名、设置默认值
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
.reactive {
  color: $primary-color;
}
</style>