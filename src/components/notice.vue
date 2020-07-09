<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:39:11
--> 
<template>
  <div v-if="isShow"
       class="notice-container">
    <div class="notice-content"
         :style="sty">{{title}}：{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String
    },
    duration: {
      type: Number,
      default: 2000
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    sty() {
      let bgColor = '#fff'
      if (this.type === 'success') {
        bgColor = '#bfecb4'
      } else if (this.type === 'error') {
        bgColor = '#eb968b'
      }
      return {
        backgroundColor: bgColor
      }
    }
  },
  methods: {
    show() {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
        this.remove()
      }, this.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-container {
  background: rgba($color: #2e2e2e, $alpha: 0.2);
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .notice-content {
    color: #222;
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