<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-13 16:41:09
 * Tips显示组件
--> 
<template>
  <div class="rl-point">
    <mk :content="tips"></mk>
  </div>
</template>

<script>
export default {
  name: 'point',
  props: {
    v: {
      type: String,
      required: true
    },
    t: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    tips() {
      return `
::: ${this.t}
${this.v}
:::
      `
    }
  }
}
</script>

<style lang="scss" scoped>
</style>