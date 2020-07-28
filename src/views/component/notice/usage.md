### 使用方式：

```js
// main.js
import plugins from './utils/noticePlugin'
// 使用插件
Vue.use(plugins)
```

```js
// 在vue组件中使用：指定type，不传type默认为default
this.$notice({
  title: '提示',
  type: 'default', // default、success、error
  content: '默认提示'
})

this.$notice.success({
  title: '提示',
  content: '成功提示'
})

this.$notice.error({
  title: '提示',
  content: '错误提示'
})
```
