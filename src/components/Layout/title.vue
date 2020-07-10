<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-09 14:05:29
--> 
<template>
  <div class="title">
    {{$route.meta.title}}
  </div>
</template>

<script>
export default {
  created() {
    console.log('route title：', this.$route)
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  font-weight: bolder;
}
</style>