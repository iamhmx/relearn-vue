<!--
 * @Author: mingxing.huang
 * @Date: 2020-09-16 19:31:02
-->
<template>
  <div>
    <h3>vue1.0 响应式</h3>
    <div>
      在
      <router-link to="/sourcecode/mvvm">“手写一个简单的 mvvm 框架”</router-link>中，实现了 vue1.0 的响应式原理，总结一下特点和不足：
    </div>
    <md></md>
  </div>
</template>

<script>
import md from './md.md'
export default {
	components: {
		md,
	},
}
</script>

<style lang="scss" scoped>
</style>