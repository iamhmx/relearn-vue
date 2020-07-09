<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:10:01
--> 
<template>
  <div>
    <p>父组件可以通过<strong>$children</strong>访问子组件实例，第一个子组件，this.$children[0]</p>
    <!-- 用节点包裹子组件，同样可以通过$children拿到实例 -->
    <div>
      <child name='child1'>
        <!-- 子组件包裹子组件，里面的子组件就不是当前组件的孩子了，是孙子了 -->
        <child name='child2'></child>
      </child>
    </div>
    <p>子组件可以通过<strong>$parent</strong>访问父组件实例，this.$children[0].$parent === this</p>
    <p>子组件可以通过<strong>$root</strong>访问祖先组件实例，this.$children[0].$root === this.$root</p>
    <p class="tips">注：$children是一个存放子组件的数组，但不保证子组件顺序</p>
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
      show: false
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