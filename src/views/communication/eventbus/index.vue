<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-20 09:45:33
--> 
<template>
  <div>
    <md></md>
    <other></other>
  </div>
</template>

<script>
import md from './index.md'
import other from './other'
export default {
  components: {
    md,
    other,
  },
  created() {
    // 订阅事件监听
    this.$bus.$on('hello', (v) => {
      alert('a组件接收到通知，值为：' + v)
    })
  },
  beforeDestroy() {
    // 销毁时移除监听
    this.$bus.$off('hello')
  },
}
</script>

<style lang="scss" scoped>
</style>