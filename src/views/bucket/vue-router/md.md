### 先看两个问题：

1. `router-link`、`router-view`是什么，有什么作用？
2. url 变化时，是如何拿到对应的页面进行渲染的？

### 工作流程图：

[流程图](https://github.com/iamhmx/relearn-vue/tree/master/src/assets/vue-router.png)

### `vue-router` 使用方式：

- step1：引入 `vue` 和 `vue-router`

```js
// 文件：src/router/index.js
import Vue from 'vue'
import VueRouter from './vue-router'
```

- step2：使用 VueRouter

```js
// 可知VueRouter是插件，会暴露install方法，供Vue调用
Vue.use(VueRouter)
```

- step3：定义路由配置项

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
```

- step4：创建 `router` 对象并导出

```js
const router = new VueRouter({
  routes // 将配置项传入
})
export default router
```

- step4：在 `main.js` 中导入 router 对象

```js
import router from './router'
```

- step5：在根组件初始化中传入 router 对象

```js
new Vue({
  // 传入router对象
  router,
  render: h => h(App)
}).$mount('#app')
```

- step6：在`vue`组件中，可以通过`this.$router`拿到路由器对象

### 实现自己的 `vue-router`，取名 `mvue-router`😁

- 创建 `MVueRouter` 类：

```js
// MVue保存Vue类
let MVue
class MVueRouter {
  // 使用：new MVueRouter({routes})
  constructor(options) {
    // 将传入的配置项保存，options里有路由配置项：routes
    this.$options = options

    // 将url中的path解析出来，根据路由配置项，可以通过path找到对应的component
    // 比如：当前window.location.hash是 "#/about"，initPath为 "/about"，对应的组件是 About
    const initPath = window.location.hash.slice(1) || '/'
    // 利用Vue的工具方法，将initPath设置成响应式数据，取名currentPath，方便当currentPath改变时，触发对应组件渲染更新
    MVue.util.defineReactive(this, 'currentPath', initPath)

    // 监听事件，更新最新的currentPath
    // 页面path改变
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    // 首次加载页面
    window.addEventListener('load', this.onHashChange.bind(this))

    // 缓存路由映射关系，处理成下面的格式，方便后面使用
    // {
    //     '/about/': {path: '/about', component: About}
    // }
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange() {
    // 拿到最新的path，注：因为currentPath是响应式的，当它改变时，会触发router-view更新
    this.currentPath = window.location.hash.slice(1)
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
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to
          }
        },
        this.$slots.default
      )
    }
  })

  // 实现router-view
  // router-view就是一个容器，路由对应的组件渲染在这里进行
  Vue.component('router-view', {
    render(h) {
      // 因为通过混入了router，所以组件上能拿到router对象
      // 将router对象中的路由信息和当前path解构出来
      const { routeMap, currentPath } = this.$router
      // 取出当前path对应的组件
      const comp = routeMap[currentPath]
        ? routeMap[currentPath].component
        : null
      return h(comp)
    }
  })
}
```
