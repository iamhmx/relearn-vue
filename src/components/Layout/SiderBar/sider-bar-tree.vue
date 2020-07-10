<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 16:23:46
--> 
<template>
  <div class="tree">
    <tree-node v-for="item in data"
               :key="item.title"
               :model="item"></tree-node>
  </div>
</template>

<script>
import node from './sider-bar-item'
export default {
  components: {
    'tree-node': node
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>