<!--
 * @Author: mingxing.huang
 * @Date: 2020-09-21 16:33:31
-->
<template>
  <div>
    <md></md>
    <div v-html="content"></div>
  </div>
</template>

<script>
import md from './md.md'
// import { getArticle } from '@/api/index'
export default {
	components: {
		md,
	},
	// data() {
	//   return {
	//     content: ''
	//   }
	// },
	// async created() {
	//   const { data } = await getArticle('vnode_diff')
	//   console.log('result：', data)
	//   this.content = data
	// }
}
</script>

<style lang="scss" scoped></style>
