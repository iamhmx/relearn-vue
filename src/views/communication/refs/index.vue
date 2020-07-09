<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 10:45:28
--> 
<template>
  <div>
    <child ref="child">我是子组件，我设置了ref="child"</child>
    <div ref="div">我是div，我设置了ref="div"</div>
    <p>通过this.$refs，可以获取到所有设置了ref属性的子组件和子节点</p>
    <p class="tips">注：$children和$refs的区别是：前者只能获取子组件，后者可以获取到设置了ref属性的所有子组件和子节点</p>
  </div>
</template>

<script>
import child from './child'
export default {
  components: {
    child
  }
}
</script>

<style lang="scss" scoped>
</style>