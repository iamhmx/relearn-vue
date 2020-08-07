<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-17 09:29:33
--> 
<template>
  <div>
    <md></md>
    <div class="rl-show-area">
      <p>count：{{$store.state.count}}</p>
      <p>doubleCount：{{$store.getters.doubleCount}}</p>
      <p>
        <button style="margin-right:10px;" @click="$store.commit('add')">add</button>
        <button @click="$store.dispatch('async_add')">async add</button>
      </p>
    </div>
  </div>
</template>

<script>
import md from './index.md'
export default {
	components: {
		md,
	},
}
</script>

<style lang="scss" scoped>
</style>