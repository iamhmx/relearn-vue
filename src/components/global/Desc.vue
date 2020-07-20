<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-17 09:33:37
 * 图层结构展示组件
--> 
<template>
  <div class="rl-desc-container">
    <div v-for="(item, index) in des"
         :key="item.title"
         :style="genStyle(index)">
      <div>{{item.title}}</div>
      <div>{{item.content}}</div>
    </div>
  </div>
</template>

<script>
const colors = ['#3c8dbc', '#00c0ef', '#00a65a', '#f39c12']
export default {
  name: 'rl-desc',
  props: {
    des: {
      type: Array,
      required: true
    }
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
        backgroundColor: index < 4 ? colors[index] : this.randomColor()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.rl-desc-container {
  margin: 0 auto;
  padding: 10px;
  text-align: left;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  position: relative;
  width: 500px;
  height: 300px;
}
</style>