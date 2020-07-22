<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-20 09:45:33
--> 
<template>
  <div>
    <rl-text v="采用发布、订阅模式，构造一个对象，实现发布和订阅方法；组件a调用订阅方法，监听事件，组件b调用发布方法，派发事件，当事件被派发时，所有订阅了该方法的组件都能收到通知，从而进行通信，常用于没有关系组件间的通信。">
    </rl-text>
    <sub-title>实现, main.js：</sub-title>
    <mk :content="main" />
    <sub-title>a组件，订阅通知：</sub-title>
    <mk :content="aJs" />
    <sub-title>b组件，派发事件：</sub-title>
    <mk :content="bJs" />
    <other></other>
    <!-- <sub-title>也可以不用Vue实例，自己实现一个Bus类：</sub-title>
    <rl-img imgName="eventbus"></rl-img> -->
  </div>
</template>

<script>
import other from './other'
export default {
  components: {
    other
  },
  data() {
    return {
      main: this.genJs(
        `
import Vue from 'vue'
// Vue实例已经实现了订阅和发布方法：$on、$emit，可以直接使用😆
// 在Vue原型上挂一个$bus，所有的Vue实例都能通过它进行通信
Vue.prototype.$bus = new Vue()
`
      ),
      aJs: this.genJs(
        `
created() {
  // 订阅事件监听
  this.$bus.$on('hello', v => {
    alert('a组件接收到通知，值为：' + v)
  })
}
`
      ),
      bJs: this.genHtml(
        `
<div>
  <button @click='$bus.$emit('hello', '我是b组件，嘻嘻')'>用事件总线，派发事件</button>
</div>
        `
      )
    }
  },
  created() {
    // 订阅事件监听
    this.$bus.$on('hello', v => {
      alert('a组件接收到通知，值为：' + v)
    })
  },
  beforeDestroy() {
    // 销毁时移除监听
    this.$bus.$off('hello')
  }
}
</script>

<style lang="scss" scoped>
</style>