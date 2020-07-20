<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:10:01
--> 
<template>
  <div>
    常用于父子组件之间通信，兄弟组件之间通信也可以通过共同的父组件进行搭桥通信。
    <sub-title>层级关系：</sub-title>
    <rl-desc :des="desData"></rl-desc>
    <!-- 用标签包裹子组件，同样可以通过$children拿到实例 -->
    <div>
      <child name='child1'>
        <!-- 子组件包裹子组件，里面的子组件就不是当前组件的孩子了，是孙子了 -->
        <child name='child2'></child>
      </child>
    </div>
    <p>子组件可以通过<strong>$parent</strong>访问父组件实例，从而可以访问父组件的属性，调用父组件方法。</p>
    <pre>
      <code class="rl-js">
        <span class="rl-keyword">this</span>.$children[0].$parent === <span class="rl-keyword">this</span>
      </code>
    </pre>
    <p>子组件可以通过<strong>$root</strong>访问祖先组件实例</p>
    <pre>
      <code class="rl-js">
        <span class="rl-keyword">this</span>.$children[0].$root === <span class="rl-keyword">this</span><span>.$root</span>
      </code>
    </pre>
    <point class="tips">$children是一个存放子组件的数组，但不保证子组件顺序</point>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child
  },
  data() {
    return {
      des: '',
      show: false,
      desData: [
        {
          title: '父组件：parent',
          content:
            '可以通过this.$children访问子组件实例，this.$children可以拿到child1，但拿不到child2'
        },
        {
          title: '孩子组件：child1',
          content:
            '可以通过this.$children访问他的子组件实例child2，this.$parent可以访问父组件parent'
        },
        {
          title: '孙子组件：child2',
          content: ''
        }
      ]
    }
  },
  mounted() {
    console.log('孩子组件：', this.$children)
    console.log('孙子组件：', this.$children[0].$children)
  }
}
</script>

<style lang="scss" scoped>
</style>