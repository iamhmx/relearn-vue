/*
 * @Author: mingxing.huang
 * @Date: 2020-08-17 16:56:49
 */
import RouterView from './router-view'
import RouterLink from './router-link'

// MVue保存Vue类
let MVue
class MVueRouter {
  // 使用：new MVueRouter({routes})
  constructor(options) {
    // 将传入的配置项保存，options里有路由配置项：routes
    this.$options = options

    // // 将url中的path解析出来，根据路由配置项，可以通过path找到对应的component
    // // 比如：当前window.location.hash是 "#/about"，initPath为 "/about"，对应的组件是 About
    // const initPath = window.location.hash.slice(1) || '/'
    // // 利用Vue的工具方法，将initPath设置成响应式数据，取名currentPath，方便当currentPath改变时，触发对应组件渲染更新
    // MVue.util.defineReactive(this, 'currentPath', initPath)

    // // 缓存路由映射关系，处理成下面的格式，方便后面使用
    // // {
    // //     '/about/': {path: '/about', component: About}
    // // }
    // this.routeMap = {}
    // this.$options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })

    // 实现嵌套路由
    this.current = window.location.hash.slice(1) || '/'
    MVue.util.defineReactive(this, 'matched', [])
    // 递归遍历路由表，得到匹配关系
    this.match()

    // 监听事件，更新最新的currentPath
    // 页面path改变
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    // 首次加载页面
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange() {
    // // 拿到最新的path，注：因为currentPath是响应式的，当它改变时，会触发router-view更新
    // this.currentPath = window.location.hash.slice(1)

    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }

  match(routes) {
    // 获取匹配的路由
    // path：'/home/info'，将会匹配到'/home'和'/home/info'
    routes = routes || this.$options.routes
    for (const route of routes) {
      // 根路由
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}
// 实现install方法
MVueRouter.install = Vue => {
  // 保存Vue，为什么要这样设计，而不是直接引入vue呢？
  // 不能要求router的使用者去安装vue
  MVue = Vue

  // 通过全局混入的方式，将根组件中的router对象挂载到原型上
  Vue.mixin({
    beforeCreate() {
      // 判断当前组件的选项中是否存在router，存在router的，就是根组件
      if (this.$options.router) {
        // 所以Vue组件都可以通过this.$router拿到路由器实例
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 实现router-link组件，实际上就是对a标签的封装
  // 使用：<router-link to="/about">关于</router-link>
  Vue.component('router-link', RouterLink)

  // 实现router-view
  // router-view就是一个容器，路由对应的组件渲染在这里进行
  Vue.component('router-view', RouterView)
}
export default MVueRouter
