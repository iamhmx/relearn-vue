<template>
  <div id="app">
    <div id="nav">
      <section>组件通信：
        <router-link to='/communication/props_emit'>props & emit</router-link> |
        <router-link to='/communication/parent_children'>$parent & $children & $root</router-link> |
        <router-link to='/communication/refs'>$refs</router-link> |
        <router-link to='/communication/provide_inject'>provide & inject</router-link> |
      </section>
      <section>组件化：
        <router-link to='/component/notice'>notice</router-link> |
        <router-link to='/component/form'>form</router-link> |
      </section>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  text-align: left;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  padding: 20px;
}

.tips {
  color: red;
}
</style>
