<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-16 17:26:52
--> 
<template>
  <div class="rl-image-box">
    <img :src="src"
         style="width: 100%;border-radius: 4px;">
  </div>
</template>

<script>
export default {
  name: 'rl-img',
  props: {
    imgName: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: '.png'
    }
  },
  data() {
    return {
      src: require(`@/assets/${this.imgName}${this.format}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.rl-image-box {
  width: 600px;
  border-radius: 4px;
}
</style>