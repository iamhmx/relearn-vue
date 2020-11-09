### 实现步骤：

- 实现 `notice` 组件，确定需要展示的内容和展现形式
- 将 `notice` 组件封装成插件，将使用方法挂在 `Vue` 原型上，方便使用

### 最终使用方式：

```js
// 在main.js中，导入，并使用
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
// 成功提示
this.$notice.success({
  title: '提示',
  content: '成功提示'
})
// 错误提示
this.$notice.error({
  title: '提示',
  content: '错误提示'
})
```
