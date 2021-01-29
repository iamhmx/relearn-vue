<!--
 * @Author: mingxing.huang
 * @Date: 2021-01-28 15:03:09
-->
<template>
  <div>
    <md></md>
    <!-- <button @click="enterSubPage(1)">进入子页面，id=1</button>
    <router-view></router-view> -->
  </div>
</template>

<script>
import md from './index.md'
export default {
  components: {
    md
  },
  methods: {
    enterSubPage(id) {
      this.$router.push({
        name: 'subPage',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
