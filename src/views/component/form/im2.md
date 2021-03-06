### `MForm` 需要实现全局校验方法，对所有 `MFormItem` 进行校验，所以 `MForm` 要拿到所有 `MFormItem` 实例，并调用它们自己的 `validate` 方法，在 `MFormItem` 实例挂载后，通知 `MForm`，并把自己实例传给 `MForm`：

```js
// FormItem.vue
mounted() {
  ...
  // 告诉MForm，我已经挂载了，把我自己也交给你。注：这里需要优化
  this.$parent.$emit('add-item', this)
}
```

```js
// Form.vue
export default {
  ...
  provide() {
    // 提供MForm，方便MFormItem获取model、rules
    return {
      form: this
    }
  },
  created() {
    // 保存所有MFormItem实例
    this.fields = []
    // 监听add-item方法，保存MFormItem实例
    this.$on('add-item', item => {
      this.fields.push(item)
    })
  },
  methods: {
    // 全局校验方法，会这样使用：this.$refs.form.validate(valid => {})
    // 实现validate方法：
    validate(cb) {
      // 过滤掉没有prop的MFormItem，然后执行它们的validate方法，validate方法返回Promise对象
      let tasks = this.fields
          .filter(field => field.prop)
          .map(item => item.validate())
      // 所有校验通过，回调true，否则回调false
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
```

### 优化 `$parent` 会出现的问题

当父子结构被破坏时，`$parent` 就获取不到想要的父组件，有两个地方用到了 `$parent`：

- `MFormInput` 触发规则校验
- `MFormItem` 通知 `MForm` 已经挂载了

参考 `element-ui` 的实现，采用 `mixin` 的方式，混入一个 `dispatch` 方法，指定要处理事件的组件，让它处理：

```js
export default {
  methods: {
    // componentName：组件名；eventName：方法名；payload：参数
    dispatch(componentName, eventName, payload) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName
      // 向上查找父级组件，直到找到指定组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        // 找到了，执行方法
        parent.$emit.call(parent, eventName, payload)
      }
    }
  }
}
```

修改如下：

- 给 `MFormItem.vue` 添加 `componentName: 'form-item'`
- 给 `MForm.vue` 添加 `componentName: 'form'`
- 给 `MFormItem、MFormInput` 混入方法

```js
import emitter from '@/mixins/emitter'
...
mixins: [emitter]
```

修改 `MFormInput`：

```js
// this.$parent.$emit('validate')
// 使用mixins混入的dispatch方法，向上找到form-item
this.dispatch('form-item', 'validate')
```

修改 `MForm`：

```js
// this.$parent.$emit('add-item', this)
this.dispatch('form', 'add-item', this)
```
