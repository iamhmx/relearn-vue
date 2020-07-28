<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:39:11
-->
<template>
  <transition name="fade">
    <div v-if="isShow"
         class="notice-container">
      <div class="notice-content"
           :style="sty">{{ title }}：{{ content }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: '提示',
    },
    // 内容
    content: {
      type: String,
    },
    // 显示时间
    duration: {
      type: Number,
      default: 2000,
    },
    // 类型
    type: {
      type: String,
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    // 根据type，设置不同的颜色
    sty() {
      let bgColor = '#e9e9eb'
      let color = '#909399'
      if (this.type === 'success') {
        bgColor = '#e1f3d8'
        color = '#67c23a'
      } else if (this.type === 'error') {
        bgColor = '#fde2e2'
        color = '#f56c6c'
      }
      return {
        backgroundColor: bgColor,
        color,
      }
    },
  },
  methods: {
    // 显示消息
    show() {
      this.isShow = true
      setTimeout(() => {
        // 消息消失、移除组件
        this.isShow = false
        this.remove()
      }, this.duration)
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.notice-container {
  background: rgba($color: #2e2e2e, $alpha: 0.01);
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  .notice-content {
    color: #fff;
    font-size: 14px;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
  }
}
</style>
