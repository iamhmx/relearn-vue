<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-08 21:56:35
-->
<template>
  <div>
    <usage></usage>
    <div class="rl-show-area">
      <button @click="clickNoticeDefault">默认提示</button>
      <button @click="clickNoticeError" style="margin: 0 20px;">错误提示</button>
      <button @click="clickNoticeSuccess">成功提示</button>
    </div>
    <im1></im1>
    <im2></im2>
  </div>
</template>

<script>
import usage from './usage.md'
import im1 from './im1.md'
import im2 from './im2.md'
export default {
	components: {
		usage,
		im1,
		im2,
	},
	methods: {
		clickNoticeDefault() {
			this.$notice({
				title: '提示',
				content: '默认提示',
			})
		},
		clickNoticeSuccess() {
			this.$notice.success({
				title: '提示',
				content: '成功提示',
			})
		},
		clickNoticeError() {
			this.$notice.error({
				title: '提示',
				content: '错误提示',
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
