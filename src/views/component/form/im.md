### 从内到外实现，先实现 `form-input` 组件：

1. `MFormInput` 需要和 `model` 数据的值进行双向绑定，需要实现 `v-model`
2. 接收类似 `input` 标签的属性，比如：`type、placeholder`
3. 当输入的值改变时，需要根据校验规则做校验

### MFormInput.vue：

```html
<template>
  <div class="form-input-container">
    <!-- $attrs可以获取到没有申明在props中的属性，通过v-bind="$attrs"解构传给input组件 -->
    <input class="input" :value="value" v-bind="$attrs" @input="onInput" />
  </div>
</template>
```

```js
export default {
  // 关闭attrs继承，否则$attrs收集的属性，会挂到根标签上
  inheritAttrs: false,
  props: {
    // v-model：接收一个value
    value: String
  },
  methods: {
    onInput(e) {
      // v-model：emit一个input事件
      this.$emit('input', e.target.value)

      // 触发规则校验，让父组件自己去派发事件，通知父组件需要进行校验
      this.$parent.$emit('validate')
      // 注：这里用$parent去获取父组件实例存在问题，因为MFormItemInput并不一定是MFormItem的直接子组件，
      // 有可能还包裹了其他组件，类似：
      // <MFormItem>
      //   <Col>
      //     <MFormInput></MFormInput>
      //   </Col>
      // </MFormItem>
      // 如果这样$parent，就不是MFormItem了，后面再进行优化
    }
  }
}
```

### MFormItem.vue：

```html
<template>
  <div class="form-item-container">
    <!-- 存放label和input -->
    <div class="form-item-content">
      <label :style="labelStyle">{{label}}</label>
      <slot></slot>
    </div>
    <!-- 显示校验错误信息 -->
    <span class="form-item-error" :style="errorStyle" v-show="error"
      >{{error}}</span
    >
  </div>
</template>
```

```js
import Schema from 'async-validator'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    // prop的值是model对象中的key，其的作用，就是从model数据中取具体的值
    prop: {
      type: String,
      default: ''
    }
  },
  // 注入MForm提供的MForm组件实例，从而获取model、rules数据
  inject: ['form'],
  data() {
    return {
      // 校验错误信息
      error: ''
    }
  },
  mounted() {
    // 监听validate，做校验，MFormInput中触发的校验通知会在这里监听到
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    // 校验方法实现
    validate() {
      // 获取对应FormItem校验规则
      const rules = this.form.rules[this.prop]
      // 获取校验值
      const value = this.form.model[this.prop]
      // 校验描述对象
      const descriptor = { [this.prop]: rules }
      // 创建校验器
      const schema = new Schema(descriptor)
      // schema.validate会返回一个Promise，没有触发catch就说明验证通过
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // 将错误信息显示
          this.error = errors[0].message
        } else {
          // 校验通过，重置错误信息
          this.error = ''
        }
      })
    }
  }
}
```
