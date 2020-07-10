<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 11:19:40
--> 
<template>
  <div class="layout-container">
    <div class="layout-sider-bar">
      <sider-bar></sider-bar>
    </div>
    <div class="layout-right">
      <div class="layout-title">
        <layout-title></layout-title>
      </div>
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import title from './title'
import siderBar from './SiderBar'
export default {
  components: {
    siderBar,
    'layout-title': title
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  .layout-sider-bar {
    width: 200px;
    height: 100%;
    background: #fff;
    border-right: $border;
  }
  .layout-right {
    flex-grow: 1;
    .layout-title {
      padding: 20px;
      border-bottom: $border;
    }
    .layout-content {
      padding: 20px;
    }
  }
}
</style>