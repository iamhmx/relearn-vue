<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:46:10
--> 
<template>
  <div>
    <!-- 自定义组件实现v-model：接收一个value，emit一个input事件 -->
    <input class="input"
           :value="value"
           :type="type"
           v-bind="$attrs"
           @input="onInput">
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'
export default {
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      // 解耦$parent，因为form-item-input并不一定是form-item的子组件，有可能还包裹了其他组件
      // 如果这样$parent，就不是form-item了
      // console.log('parent：', this.$parent)
      // this.$parent.$emit('validate')
      // 使用mixins混入的dispatch方法，向上找到form-item
      this.dispatch('form-item', 'validate')
    }
  }
}
</script>

<style scoped>
.input {
  height: 20px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 5px;
}
</style>