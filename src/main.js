import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 插件
import plugins from './utils/noticePlugin'
// 全局样式
import '@/styles/global.scss'
// 混入代码显示相关内容
import code from '@/mixins/code'
// 全局组件
import '@/components/global'
// 导入svg
import '@/icons'

// import Bus from "@/views/communication/eventbus/bus"
import 'highlight.js/styles/atom-one-light.css'

import store from './store'

Vue.use(plugins)
Vue.mixin(code)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
