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
      <span class="star">Star</span>
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
    padding: 1px 5px;
    cursor: pointer;
    background-color: #eee;
    background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
    background-repeat: no-repeat;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .star {
      font-size: 11px;
      font-weight: 700;
      line-height: 14px;
      padding-left: 2px;
    }
    &:hover {
      background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
    }
  }
}
</style>