import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 插件
import plugins from "./utils/create";
// 全局样式
import "@/styles/global.scss";
// 混入代码显示相关内容
import code from "@/mixins/code";
// 全局组件
import "@/components/global";
// 导入svg
import "@/icons";
// import Bus from "@/views/communication/eventbus/bus"

import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

Vue.component('mk', MarkdownItVue)
Vue.use(plugins)
Vue.mixin(code)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
