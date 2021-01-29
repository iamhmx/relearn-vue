### 全局守卫

```js
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 解析导航
  // 场景：路由权限控制，有权限next()，无权限next({name: 'Login'})
  next()
})

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  // 导航被确认，无next参数
})
```

### 路由独享守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过next回调，访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

### 路由守卫与组件生命周期

#### 页面 `a` 到页面 `b`（`host/a` --> `host/b`）

- 路由守卫会优先于组件生命周期执行
- 路由守卫执行顺序：全局 -> 路由独享 -> 组件守卫

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-eewtwzjb1bxvad91bd/c2d93d30-61d4-11eb-bdc1-8bd33eb6adaa.png">

#### 页面 `a/1` 到页面 `a/2`（`host/a/1` --> `host/a/2`）

- 页面 `a` 将被复用，不会被销毁；不会进入独享守卫，直接进入 `beforeRouteUpdate`

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-eewtwzjb1bxvad91bd/738e3540-61d5-11eb-bdc1-8bd33eb6adaa.png">

- 根据路由参数执行相应逻辑

```js
// 监听 $route 变化，执行相应逻辑
watch: {
  '$route.params.id'(id) {
      this.getNews(id)
  }
}

// 在beforeRouteUpdate钩子中，处理相应逻辑
beforeRouteUpdate(to, from, next) {
  this.getNews(to.params.id)
  next()
},
```
