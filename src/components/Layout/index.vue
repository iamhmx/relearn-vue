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
        <!-- <div class="put-on-file">渝ICP备19009669号-2</div> -->
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
    width: 208px;
    min-width: 208px;
    max-width: 208px;
    flex: 0 0 208px;
    height: 100%;
    background: #fff;
    border-right: $border;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    overflow: auto;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .layout-right {
    flex: auto;
    margin-left: 208px;
    position: relative;
    .layout-title {
      padding: 20px;
      border-bottom: $border;
    }
    .layout-content {
      padding: 20px;
      margin: 0 auto;
      width: 800px;
      min-width: 800px;
      text-align: left;
      height: auto;
      font-size: 14px;
      .put-on-file {
        width: 100%;
        text-align: center;
        color: lightgrey;
      }
    }
  }
}
</style>