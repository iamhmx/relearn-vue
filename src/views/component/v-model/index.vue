<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-23 10:37:10
-->
<template>
  <div>
    <md1></md1>
    <div class="rl-show-area">
      <custom1 v-model="a"></custom1>
      a的值：{{ a }}
    </div>
    <md2></md2>
    <div class="rl-show-area">
      <custom2 v-model="b"></custom2>
      b的值：{{ b }}
    </div>
  </div>
</template>

<script>
import custom1 from './custom1'
import custom2 from './custom2'
import md1 from './index.md'
import md2 from './index2.md'
export default {
  components: {
    custom1,
    custom2,
    md1,
    md2,
  },
  data() {
    return {
      a: '',
      b: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>
