<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-23 10:41:25
-->
<template>
  <div>
    <input type="text"
           :value="value"
           @input="valueInput" />
  </div>
</template>

<script>
export default {
  props: {
    // 接收value属性
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    valueInput(e) {
      // emit名为input的事件
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
