import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 插件
import plugins from "./utils/create";
// 全局样式
import "@/styles/global.scss";
import code from "@/mixins/code";
// 全局组件
import "@/components/global";
// 导入svg
import "@/icons";

Vue.use(plugins)
Vue.mixin(code)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
