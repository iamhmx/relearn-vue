<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:13:10
-->
<template>
  <div class="tree-container">
    <h3>实现效果（左侧菜单就是一个tree，只是多了些样式）：</h3>
    <div class="rl-show-area"
         style="margin-bottom:20px;">
      <tree :data="treeData"></tree>
    </div>
    <md1></md1>
    <rl-text v="组件设计："></rl-text>
    <rl-desc :des="desData"></rl-desc>
    <md2></md2>
  </div>
</template>

<script>
import tree from './tree'
import md1 from './md1.md'
import md2 from './md2.md'
export default {
  components: {
    tree,
    md1,
    md2,
  },
  data() {
    return {
      desData: [
        {
          title: 'tree组件：',
          content: '管理tree数据data，遍历data，显示一级节点',
        },
        {
          title: 'tree-node组件：',
          content:
            '显示子节点，如果该子节点也有children，递归展示其所有子节点，直到所有节点都是叶子节点（即：没有children或children为空）',
        },
      ],
      treeData: [
        {
          title: '我是一级节点a',
          children: [
            {
              title: '我是二级节点aa',
              children: [
                {
                  title: '我是三级节点aaa',
                },
              ],
            },
            {
              title: '我是二级节点ab',
            },
          ],
        },
        {
          title: '我是一级节点b',
          children: [
            {
              title: '我是二级节点ba',
            },
            {
              title: '我是二级节点bb',
              children: [
                {
                  title: '我是三级节点bbb',
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.tree-container {
  .desc-tree {
    padding: 10px;
    text-align: left;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
  }
  .tree-root {
    width: 400px;
    height: 200px;
    background: rgb(22, 176, 122);
    position: relative;
    margin: 0 auto;
    .tree-node-item {
      position: absolute;
      top: 50px;
      right: 30px;
      left: 30px;
      bottom: 10px;
      background: rgb(230, 92, 94);
    }
  }
}
</style>
