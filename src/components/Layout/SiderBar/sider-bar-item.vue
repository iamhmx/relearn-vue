<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 16:24:47
--> 
<template>
  <div class="sider-bar-item-container">
    <div @click="toggle"
         :class="activeBg"
         :style="{paddingLeft: (level - 1) * 15 + 'px'}">
      <div class="sider-bar-item"
           @click="click">
        <span :class="['link', activeCls]">{{model.title}}</span>
        <svg-icon v-if="isFolder"
                  :class="['arrow', open ? 'up' : 'down', activeCls]"
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
      active: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (
          this.$route.matched
            .map(item => item['path'])
            .includes(this.model.path)
        ) {
          this.active = true
        } else {
          this.active = false
        }
      }
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    },
    activeCls() {
      return this.active ? 'active' : ''
    },
    activeBg() {
      if (this.active && !this.isFolder) {
        return 'active-bg'
      }
      return ''
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
  .active-bg {
    background: rgba(65, 184, 131, 0.1);
  }
}
</style>