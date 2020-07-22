<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-22 13:51:29
--> 
<template>
  <div>
    <p>
      <button @click="$bus.$emit('hello', '嘻嘻')">用事件总线，派发事件</button>
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>