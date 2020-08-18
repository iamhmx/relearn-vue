export default {
  render(h) {
    // // 因为通过混入了router，所以组件上能拿到router对象
    // // 将router对象中的路由信息和当前path解构出来
    // const { routeMap, currentPath } = this.$router
    // // 取出当前path对应的组件
    // const comp = routeMap[currentPath] ? routeMap[currentPath].component : null
    // return h(comp)

    // 实现嵌套路由
    // 标记当前路由深度
    this.$vnode.data.routerView = true
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前路由的parent是一个router-view
          depth++
        }
      }
      parent = parent.$parent
    }

    let comp = null
    // 根据路由层级，从匹配到的路由里出去当前路由
    const route = this.$router.matched[depth]
    if (route) {
      comp = route.component
    }
    return h(comp)
  }
}
