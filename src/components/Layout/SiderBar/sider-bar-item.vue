<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 16:24:47
--> 
<template>
  <div class="sider-bar-item-container">
    <div @click="toggle"
         :style="{paddingLeft: (level - 1) * 15 + 'px'}">
      <div class="sider-bar-item"
           @click="click">
        <span :class="['link', active, isFolderAndActive ? 'active-folder' : '']">{{model.title}}</span>
        <svg-icon v-if="isFolder"
                  :class="['arrow', open ? 'up' : 'down']"
                  icon="arrow_down"></svg-icon>
      </div>
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
      open: false,
      active: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.path === this.model.path) {
          this.active = 'active'
        } else {
          this.active = ''
        }
      }
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    },
    isFolderAndActive() {
      if (this.isFolder) {
        for (let i = 0; i < this.model.children.length; i++) {
          const c = this.model.children[i]
          if (this.$route.path === c.path) {
            return true
          }
        }
      }
      return false
    },
    href() {
      return this.isFolder ? 'javascript:void(0)' : this.model.path
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    click() {
      if (!this.isFolder) {
        this.$router.push(this.model.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sider-bar-item-container {
  text-align: left;
  cursor: pointer;
  .sider-bar-item {
    font-size: 14px;
    padding: 15px 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .link {
      color: #222;
      transition: color 0.2s;
    }
    .active {
      color: rgb(65, 184, 131);
    }
    .active-folder {
      color: rgb(65, 184, 131);
    }
    .arrow {
      transition: transform 0.3s;
    }
    .down {
      transform: rotateZ(180deg);
    }
    .up {
      transform: rotateZ(0deg);
    }
    &:hover {
      .link {
        color: rgb(65, 184, 131);
      }
    }
  }
}
</style>