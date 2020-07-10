/*
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:44:15
 */
import Vue from 'vue'
import Notice from "@/components/Notice.vue";

function create(Component, props) {
    // 传入组件配置项，调用extend，得到组件构造方法
    const Ctor = Vue.extend(Component)
    // 创建组件实例
    const vm = new Ctor({ propsData: props })
    // 挂载
    vm.$mount()
    vm.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    document.body.appendChild(vm.$el)
    return vm;
}

export default {
    install(Vue) {
        Vue.prototype.$notice = (options) => {
            const notice = create(Notice, options)
            notice.show()
            return notice
        }
        Vue.prototype.$notice.success = (options) => {
            return Vue.prototype.$notice(Object.assign(options, { type: 'success' }))
        }
        Vue.prototype.$notice.error = (options) => {
            return Vue.prototype.$notice(Object.assign(options, { type: 'error' }))
        }
    }
}