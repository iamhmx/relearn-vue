<!--
 * @Author: mingxing.huang
 * @Date: 2021-01-28 17:18:26
-->
<template>
  <div>子页面<button @click="enterSubPage(2)">进入子页面，id=2</button></div>
</template>

<script>
export default {
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
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
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件守卫，sub beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件守卫，sub beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件守卫，sub beforeRouteLeave')
    next()
  }
}
</script>

<style lang="scss" scoped></style>
