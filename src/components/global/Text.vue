<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-22 11:32:07
--> 
<template>
  <div class="text-container">
    <mk :content="text"></mk>
  </div>
</template>

<script>
export default {
  name: 'rl-text',
  props: {
    v: {
      type: String,
      required: true
    }
  },
  computed: {
    text() {
      return '#### ' + this.v
    }
  }
}
</script>

<style lang="scss" scoped>
.text-container {
  // line-height: 30px;
  margin-bottom: 10px;
}
</style>