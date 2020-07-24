<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:41:31
--> 
<template>
  <p>
    子组件的count：{{count}}
  </p>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    add() {
      this.count++
    },
  },
}
</script>

<style lang="scss" scoped>
</style>