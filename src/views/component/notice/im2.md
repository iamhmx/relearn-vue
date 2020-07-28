### 封装成插件，方便使用：

```js
// src/util/noticePlugin.js
export default {
  // 暴露install方法
  install(Vue) {
    // 在Vue原型上挂载方法
    Vue.prototype.$notice = options => {
      // 使用create帮组方法，传入组件配置项，得到notice实例，然后显示
      const notice = create(Notice, options)
      notice.show()
      return notice
    }
    Vue.prototype.$notice.success = options => {
      return Vue.prototype.$notice(Object.assign(options, { type: 'success' }))
    }
    Vue.prototype.$notice.error = options => {
      return Vue.prototype.$notice(Object.assign(options, { type: 'error' }))
    }
  }
}
```
