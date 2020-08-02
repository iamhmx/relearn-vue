<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-22 11:32:07
--> 
<template>
  <div class="text-container">
    <h3>{{v}}</h3>
  </div>
</template>

<script>
export default {
	name: 'rl-text',
	props: {
		v: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.text-container {
	// line-height: 30px;
	margin-bottom: 10px;
}
</style>