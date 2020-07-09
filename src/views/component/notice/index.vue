<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-08 21:56:35
--> 
<template>
  <div>
    <h2>实现消息提示插件notice</h2>
    <button @click="clickNoticeDefault">默认提示</button>
    <button @click="clickNoticeError">错误提示</button>
    <button @click="clickNoticeSuccess">成功提示</button>
  </div>
</template>

<script>
export default {
  methods: {
    clickNoticeDefault() {
      this.$notice({
        title: '提示',
        content: '默认提示'
      })
    },
    clickNoticeSuccess() {
      this.$notice({
        title: '提示',
        type: 'success',
        content: '成功提示'
      })
    },
    clickNoticeError() {
      this.$notice({
        title: '提示',
        type: 'error',
        content: '错误提示'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>