<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:13:41
--> 
<template>
  <div class="tree-node-container">
    <div @click="toggle"
         :style="{paddingLeft: (level - 1) * 15 + 'px'}">
      <label>{{model.title}}</label>
      <span v-if="isFolder">{{open ? '-' : '+'}}</span>
    </div>
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

<script>
export default {
  name: 'TreeNode',
  props: {
    model: Object,
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-node-container {
  text-align: left;
}
</style>