<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:13:10
--> 
<template>
  <div class="tree-container">
    <sub-title>组件设计：</sub-title>
    <rl-desc :des="desData"></rl-desc>
    <sub-title>数据格式：</sub-title>
    <pre>
      <code class="rl-js">
        <span>treeData: [</span>
        <span>  {</span>
        <span>    title: '显示内容'</span>
        <span>    children: [</span>
        <span>      {</span>
        <span>        title: '显示内容',</span>
        <span>        children: []</span>
        <span>      }</span>
        <span>    ]</span>
        <span>  }</span>
        <span>]</span>
      </code>
    </pre>
    <sub-title>组件使用：</sub-title>
    <pre>
      <code class="rl-js">
        <span class="rl-tag">{{tag3('tree')}} </span>:data="<span class="rl-string">treeData</span>"<span class="rl-tag">>{{tag2('tree')}}</span>
      </code>
    </pre>
    <sub-title>tree组件实现，tree.vue：</sub-title>
    <rl-img imgName="tree" />
    <sub-title>tree-node组件实现，tree-node.vue，template：</sub-title>
    <rl-img imgName="tree-node-template" />
    <sub-title>tree-node.vue，js：</sub-title>
    <rl-img imgName="tree-node-js" />
    <div style="padding: 20px 20px 100px 20px;">
      <sub-title>实现效果（左侧菜单就是一个tree，只是多了些样式）：</sub-title>
      <tree :data="treeData"></tree>
    </div>
  </div>
</template>

<script>
import tree from './tree'
export default {
  components: {
    tree
  },
  data() {
    return {
      desData: [
        {
          title: 'tree组件：',
          content: '管理tree数据data，遍历data，显示一级节点'
        },
        {
          title: 'tree-node组件：',
          content:
            '显示子节点，如果该子节点也有children，递归展示其所有子节点，直到所有节点都是叶子节点（即：没有children或children为空）'
        }
      ],
      treeData: [
        {
          title: '我是一级节点a',
          children: [
            {
              title: '我是二级节点aa',
              children: [
                {
                  title: '我是三级节点aaa'
                }
              ]
            },
            {
              title: '我是二级节点ab'
            }
          ]
        },
        {
          title: '我是一级节点b',
          children: [
            {
              title: '我是二级节点ba'
            },
            {
              title: '我是二级节点bb',
              children: [
                {
                  title: '我是三级节点bbb'
                }
              ]
            }
          ]
        }
      ]
    }
  }
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