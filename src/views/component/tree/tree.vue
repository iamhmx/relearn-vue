<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:13:10
-->
<template>
  <div class="tree">
    <!-- 遍历显示一级节点 -->
    <tree-node v-for="item in data"
               :key="item.title"
               :model="item"></tree-node>
  </div>
</template>

<script>
import node from './tree-node'
export default {
  components: {
    'tree-node': node,
  },
  props: {
    // 数据
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
