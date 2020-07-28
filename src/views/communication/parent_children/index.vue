<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:10:01
-->
<template>
  <div>
    <rl-text v="常用于父子组件之间通信，兄弟组件之间通信也可以通过共同的父组件进行搭桥通信。"></rl-text>
    <sub-title>层级关系：</sub-title>
    <rl-desc :des="desData"></rl-desc>
    <!-- 用标签包裹子组件，同样可以通过$children拿到实例 -->
    <div>
      <child name="child1">
        <!-- 子组件包裹子组件，里面的子组件就不是当前组件的孩子了，是孙子了 -->
        <child name="child2"></child>
      </child>
    </div>
    <md></md>
    <point>$children是一个存放子组件的数组，但不保证子组件顺序</point>
  </div>
</template>

<script>
import child from './child'
import md from './index.md'
export default {
  components: {
    child,
    md,
  },
  data() {
    return {
      des: '',
      show: false,
      desData: [
        {
          title: '父组件：parent',
          content:
            '可以通过this.$children访问子组件实例，this.$children可以拿到child1，但拿不到child2',
        },
        {
          title: '孩子组件：child1',
          content:
            '可以通过this.$children访问他的子组件实例child2，this.$parent可以访问父组件parent',
        },
        {
          title: '孙子组件：child2',
          content: '',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
