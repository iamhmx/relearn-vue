<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 15:09:12
--> 
<template>
  <div class="sider-bar">
    <div class="logo">Relearn<span>V</span>ue</div>
    <tree :data="data"></tree>
  </div>
</template>

<script>
import tree from './sider-bar-tree'
export default {
  components: {
    tree
  },
  data() {
    return {
      data: ''
    }
  },
  created() {
    let routes = this.$root.$options.router.options.routes
    this.data = this.handleRoutes(routes)
    console.log('routes：', this.data)
  },
  methods: {
    handleRoutes(routes) {
      return routes
        .filter(r => {
          return r.path && r.path.length > 1
        })
        .map(r => {
          if (r.children && r.children.length > 0) {
            this.handleRoutes(r.children)
          }
          r.title = r.meta.title
          return r
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.sider-bar {
  padding: 10px;
  .logo {
    padding: 10px 0 20px 0;
    font-size: 20px;
    font-weight: bolder;
    span {
      color: $primary-color;
    }
  }
}
</style>