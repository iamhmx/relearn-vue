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
      Fork me on Github
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
    cursor: pointer;
    font-weight: bolder;
    font-style: italic;
  }
}
</style>