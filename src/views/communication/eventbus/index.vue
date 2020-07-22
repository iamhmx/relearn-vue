<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-20 09:45:33
--> 
<template>
  <div>
    <rl-text>
      <template v-slot:title>事件总线原理：</template>
      采用<span class="rl-keyword">发布、订阅</span>模式，构造一个对象，实现发布和订阅方法，组件a调用订阅方法，监听事件，组件b调用发布方法，派发事件，当事件被派发时，所有订阅了该方法的组件都能收到通知，从而进行通信，常用于没有父子关系组件间的通信。
    </rl-text>
    <sub-title>实现, main.js：</sub-title>
    <pre>
      <code class="rl-js">
        <span class="rl-comment">// Vue实例已经实现了订阅和发布方法：$on、$emit，可以直接使用😆</span>
        <span class="rl-comment">// 在Vue原型上挂一个$bus，所有的Vue实例都能通过它进行通信</span>
        <span class="rl-string">Vue</span>.prototype.$bus = <span class="rl-tag">new</span> <span class="rl-string">Vue</span>()
      </code>
    </pre>
    <sub-title>a组件，订阅通知：</sub-title>
    <pre>
      <code class="rl-js">
        <span class="rl-keyword">export default</span> {
        <span>  created() {</span>
        <span class="rl-comment">    // 订阅事件监听</span>
        <span><span class="rl-keyword">    this</span>.$bus.$on(<span class="rl-string">'hello'</span>, v => {</span>
        <span>      alert(<span class="rl-string">'接收到通知，值为：'</span> + v)</span>
        <span>    })</span>
        <span>  }</span>
        <span>}</span>
    </code>
    </pre>
    <sub-title>b组件，派发事件：</sub-title>
    <pre>
      <code class="rl-html">
        <span class="rl-tag">{{tag1('div')}}</span>
          <span class="rl-tag">{{tag3('button')}}</span> @click="<span class="rl-tag">$bus</span>.$emit(<span class="rl-string">'hello'</span>, <span class="rl-string">'嘻嘻'</span>)"<span class="rl-tag">></span>用事件总线，派发事件<span class="rl-tag">{{tag2('button')}}</span>
        <span class="rl-tag">{{tag2('div')}}</span>
    </code>
    </pre>
    <other></other>
    <sub-title>也可以不用Vue实例，自己实现一个Bus类：</sub-title>
    <rl-img imgName="eventbus"></rl-img>
  </div>
</template>

<script>
import other from './other'
export default {
  components: {
    other
  },
  created() {
    // 订阅事件监听
    this.$bus.$on('hello', v => {
      alert('接收到通知，值为：' + v)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>