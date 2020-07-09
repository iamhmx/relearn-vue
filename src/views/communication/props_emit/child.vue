<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:41:31
--> 
<template>
  <div>
    <div>父组件传入的props：key为name，值为{{name}}</div>
    <p>
      <button @click="clickHandle">点我调用$emit</button>
    </p>
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
      this.$emit('click', `hello ${this.name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>