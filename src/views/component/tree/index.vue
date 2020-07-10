<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:13:10
--> 
<template>
  <tree :data="treeData"></tree>
</template>

<script>
import tree from './tree'
export default {
  components: {
    tree
  },
  data() {
    return {
      treeData: [
        {
          title: 'Web全栈架构师',
          children: [
            {
              title: 'Java架构师'
            },
            {
              title: '动效'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>