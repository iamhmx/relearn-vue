<!--
 * @Author: mingxing.huang
 * @Date: 2020-08-18 10:01:14
-->
<template>
  <div>
    <md></md>
  </div>
</template>

<script>
import md from './md.md'
export default {
	components: {
		md,
	},
	mounted() {
		this.test()
	},
	methods: {
		test() {
			let data = {
				name: '重学vue',
				address: 'https://relearnvue.com',
				skill: {
					vue: 'aaa',
				},
				array: ['aaa', 'bbb', 'ccc'],
			}
			// 对数据data进行拦截处理
			this.observe(data)
			// data.name
			// data.address
			// data.name = 'relearnvue'
			// // console.log('data1:', data)
			// data.skill
			// data.skill.vue
			// // console.log('data2:', data)
			// // data.skill
			// // data.author = 'hhh'
			// // data.author
			// this.$set(data, 'author', 'hhh')
			// 数组
			// data.array[0]
			// data.array[0] = 'xxx'
			// console.log('data：', data)
			// data.array.push('BBB')

			// data.array.length = 2

			data.array.push('xxxxx')
		},

		/**
		 * @description: 监测对象的每一个属性
		 * @param {data：需要监测的对象}
		 */
		observe(data) {
			// 类型判断
			if (typeof data !== 'object' || data === null) {
				return
			}
			// 遍历对象属性，对每一个属性进行属性拦截
			Object.keys(data).forEach((key) => {
				this.defineReactive(data, key, data[key])
			})
		},

		/**
		 * @description: 对obj中的key进行拦截，监听get和set操作
		 * @param {obj：监测对象；key：对象属性；val：当前属性值}
		 */
		defineReactive(obj, key, val) {
			this.observe(val)
			Object.defineProperty(obj, key, {
				get: () => {
					console.log(`读取${key}`)
					return val
				},
				set: (newVal) => {
					if (newVal !== val) {
						console.log(`设置${key}：`, newVal)
						val = newVal
					}
				},
			})
		},

		set(obj, key, val) {
			this.defineReactive(obj, key, val)
		},
	},
}
</script>

<style lang="scss" scoped>
</style>