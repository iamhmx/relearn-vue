<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:13:10
--> 
<template>
  <div class="tree-container">
    <rl-text v="实现效果（左侧菜单就是一个tree，只是多了些样式）："></rl-text>
    <div class="rl-show-area"
         style="margin-bottom:20px;">
      <tree :data="treeData"></tree>
    </div>
    <rl-text v="组件使用："></rl-text>
    <mk :content="usage"></mk>
    <rl-text v="数据格式："></rl-text>
    <mk :content="dataStr"></mk>
    <rl-text v="组件设计："></rl-text>
    <rl-desc :des="desData"></rl-desc>
    <rl-text v="tree组件实现，tree.vue："></rl-text>
    <mk :content="treeHtml"></mk>
    <mk :content="treeJs"></mk>
    <rl-text v="tree-node组件实现，tree-node.vue："></rl-text>
    <mk :content="nodeHtml"></mk>
    <mk :content="nodeJs"></mk>
  </div>
</template>

<script>
import tree from './tree'
export default {
  components: {
    tree,
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
      dataStr: this.genJs(`
treeData: [
  {
    title: '显示内容'
    children: [
      {
        title: '显示内容',
        children: []
      }
    ]
  }
]
      `),
      usage: this.genHtml(`<tree :data="treeData"></tree>`),
      treeHtml: this.genHtml(`
<template>
  <div class="tree">
    <!-- 遍历显示一级节点 -->
    <tree-node v-for="item in data"
               :key="item.title"
               :model="item"></tree-node>
  </div>
</template>
      `),
      treeJs: this.genJs(`
import node from './tree-node'
export default {
  components: {
    'tree-node': node
  },
  props: {
    // 数据
    data: {
      type: Array,
      required: true
    }
  }
}
      `),
      nodeHtml: this.genHtml(`
<template>
  <div class="tree-node-container">
    <!-- 展示当前节点信息 -->
    <div @click="toggle"
         :style="{paddingLeft: (level - 1) * 15 + 'px'}">
      <label>{{model.title}}</label>
      <span v-if="isFolder"
            style="margin-left: 20px;">{{open ? '-' : '+'}}</span>
    </div>
    <!-- 如果有孩子元素，遍历，递归显示，自己显示自己 -->
    <div v-if="isFolder"
         v-show="open">
      <tree-node class="item"
                 v-for="item in model.children"
                 :model="item"
                 :key="item.title"
                 :level="level + 1"></tree-node>
    </div>
  </div>
</template>
      `),
      nodeJs: this.genJs(`
export default {
  // name必须设置
  name: 'TreeNode',
  props: {
    // 当前节点数据
    model: Object,
    // 当前节点层级，用于缩进样式控制
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 如果是父级节点，控制是否展开
      open: false
    }
  },
  computed: {
    // 父级节点判断标识，有children，且children长度大于0
    isFolder() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    // 展开、收起方法
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
}
      `),
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