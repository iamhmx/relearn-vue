/*
 * @Author: mingxing.huang
 * @Date: 2020-07-24 14:57:12
 */
export const usageHtml = `
<MForm ref="form"
       :model="model"
       :rules="rules"
       label-position="right"
       label-width="100px">
  <MFormItem label="用户名："
             prop="username">
    <MFormInput v-model="model.username"
                placeholder="请输入用户名"></MFormInput>
  </MFormItem>
  <MFormItem label="密码："
             prop="password">
    <MFormInput type="password"
                v-model="model.password"
                placeholder="请输入密码"></MFormInput>
    </MFormItem>
  <MFormItem>
    <button @click="login">登录</button>
  </MFormItem>
</MForm>
`
export const usageJs = `
export default {
  data() {
    return {
      // 数据
      model: {
        username: '',
        password: '',
      },
      // 校验规则
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      }
    }
  },
  methods: {
    login() {
      // 点击登录，校验数据
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notice.success({
            title: '提示',
            content: '成功了',
          })
        } else {
          this.$notice({
            title: '提示',
            type: 'error',
            content: '校验没通过',
            duration: 3000,
          })
        }
      })
    }
  }
}`
export const inputHtml = `
<template>
  <div class="form-input-container">
    <!-- $attrs可以获取到没有申明在props中的属性，通过v-bind="$attrs"解构传给input组件 -->
    <input class="input"
           :value="value"
           v-bind="$attrs"
           @input="onInput">
  </div>
</template>
      `
export const inputJs = `
export default {
  // 关闭attrs继承，否则$attrs收集的属性，会挂到根标签上
  inheritAttrs: false,
  props: {
    // v-model：接收一个value
    value: String,
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
    },
  },
}`
export const itemHtml = `
<template>
  <div class="form-item-container">
    <!-- 存放label和input -->
    <div class="form-item-content">
      <label :style="labelStyle">{{label}}</label>
      <slot></slot>
    </div>
    <!-- 显示校验错误信息 -->
    <span class="form-item-error"
          :style="errorStyle"
          v-show="error">{{error}}</span>
  </div>
</template>`
export const itemJs = `
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
}`
export const mountedJs = `
// FormItem.vue
mounted() {
  ...
  // 告诉MForm，我已经挂载了，把我自己也交给你。注：这里需要优化
  this.$parent.$emit('add-item', this)
}`
export const formJs = `
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
}`
export const dispatch = `
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
}`
export const mixinJs = `
import emitter from '@/mixins/emitter'
...
mixins: [emitter]
`
export const inputExtral = `
// this.$parent.$emit('validate')
// 使用mixins混入的dispatch方法，向上找到form-item
this.dispatch('form-item', 'validate')`
export const itemExtral = `
// this.$parent.$emit('add-item', this)
this.dispatch('form', 'add-item', this)`