<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:41:31
--> 
<template>
  <div>
    <button @click="clickHandle">Try it</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickHandle() {
      this.$emit('clickChild', `hello ${this.name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>