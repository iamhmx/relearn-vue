<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-17 09:33:37
 * 图层结构展示组件
--> 
<template>
  <div class="rl-desc-container">
    <div v-for="(item, index) in des" :key="item.title" :style="genStyle(index)">
      <div>{{item.title}}</div>
      <div>{{item.content}}</div>
    </div>
  </div>
</template>

<script>
const colors = ['#E0FFD2', '#BDFFFE', '#FFFFC9', '#A6A7FC']
export default {
	name: 'rl-desc',
	props: {
		des: {
			type: Array,
			required: true,
		},
	},
	methods: {
		genStyle(index) {
			return {
				padding: '10px',
				position: 'absolute',
				top: 70 * index + 'px',
				left: 30 * index + 'px',
				right: 30 * index + 'px',
				bottom: 10 * index + 'px',
				borderRadius: '4px',
				backgroundColor: index < 4 ? colors[index] : this.randomColor(),
				border: '1px solid #999',
			}
		},
		randomColor() {
			return (
				'(' +
				Math.random() * 256 +
				', ' +
				Math.random() * 256 +
				', ' +
				Math.random() * 256 +
				')'
			)
		},
	},
}
</script>

<style lang="scss" scoped>
.rl-desc-container {
	margin: 0 auto 20px;
	padding: 10px;
	text-align: left;
	font-size: 12px;
	color: #000;
	border-radius: 4px;
	position: relative;
	width: 500px;
	height: 300px;
}
</style>