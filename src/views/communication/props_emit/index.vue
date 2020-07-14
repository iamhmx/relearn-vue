<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 09:40:16
--> 
<template>
  <div>
    <pre>
      父组件
      <code class="rl-html">
        <span class="rl-comment">{{comment('父组件，给子组件child传入name属性，值为vue')}}</span>
        <span class="rl-tag">{{tag3('child')}} <span>name=</span><span class="rl-string">"vue" </span><span>@clickChild=</span><span class="rl-string">"handleEmit"</span>></span><span class="rl-tag">{{tag2('child')}}</span>
      </code>
      <code class="rl-js">
        <span class="rl-keyword">export default</span> {
        <span>  methods: {</span>
        <span>    <span class="rl-keyword">handleEmit</span>(val) {</span>
        <span>      <span class="rl-keyword">alert</span>('<span class="rl-string">子组件通过$emit派发clickChild事件，值为</span>' + val)</span>
        <span>    }</span>
        <span>  }</span>
        <span>}</span>
      </code>
    </pre>
    <pre>
      子组件
      <code class="rl-html">
        <span class="rl-comment">{{comment('子组件派发一个名为clickChild')}}</span>
        <span class="rl-tag">{{tag3('button')}} <span>@click=</span><span class="rl-string">"clickHandle"</span>></span>Try it!<span class="rl-tag">{{tag2('button')}}</span>
      </code>
      <code class="rl-js">
        <span class="rl-keyword">export default</span> {
        <span>  props: {</span>
        <span>    name: {</span>
        <span>      type: <span class="rl-string">String</span>,</span>
        <span>      default: ''</span>
        <span>    }</span>
        <span>  }</span>
        <span>  methods: {</span>
        <span>    <span class="rl-keyword">clickHandle</span>() {</span>
        <span>      <span class="rl-keyword">this</span>.$emit('<span class="rl-string">clickChild</span>', `hello ${<span class="rl-keyword">this</span>.name}`)</span>
        <span>    }</span>
        <span>  }</span>
        <span>}</span>
      </code>
    </pre>
    <child name="vue"
           @clickChild="handleEmit"></child>
    <point>子组件派发的clickChild事件，虽然是在父组件中实现的，但是监听者仍然是子组件child；事件监听原则：谁派发谁监听。</point>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child
  },
  methods: {
    handleEmit(val) {
      alert('子组件通过$emit派发click事件，值为' + val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>