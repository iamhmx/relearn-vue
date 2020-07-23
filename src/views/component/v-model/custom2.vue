<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-23 10:49:26
--> 
<template>
  <div>
    苹果
    <input type="checkbox"
           :checked="checked"
           @change="changeHandle"
           value="苹果" />
  </div>
</template>

<script>
export default {
  // 指定v-model接收的属性、派发的方法
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  methods: {
    changeHandle(e) {
      this.$emit('change', e.target.checked)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>