import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from "./utils/create";
import "@/styles/global.scss";
import code from "@/mixins/code";
import "@/components/global";

Vue.use(plugins)
Vue.mixin(code)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
