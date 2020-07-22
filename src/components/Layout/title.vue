<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:05:29
--> 
<template>
  <div class="rl-title-container">
    <span class="title">{{$route.meta.title}}</span>
    <div class="github"
         @click="openGithub">
      <svg-icon icon="github"></svg-icon>
      Star
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openGithub() {
      window.open('https://github.com/iamhmx/relearn-vue', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.rl-title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  .title {
    text-align: left;
    font-weight: bolder;
  }
  .github {
    padding: 0 5px;
    cursor: pointer;
    border: 1px solid lightgrey;
    border-radius: 4px;
  }
}
</style>