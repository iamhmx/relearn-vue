<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:46:03
--> 
<template>
  <div class="form-item-container">
    <div class="form-item-content">
      <label :style="labelStyle">{{label}}</label>
      <slot></slot>
    </div>
    <span class="form-item-error"
          :style="errorStyle"
          v-show="error">{{error}}</span>
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '../../../mixins/emitter'
export default {
  componentName: 'form-item',
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  inject: ['form'],
  data() {
    return {
      error: ''
    }
  },
  computed: {
    labelStyle() {
      return {
        fontSize: '14px',
        width: this.form.labelWidth,
        textAlign: this.form.labelPosition
      }
    },
    errorStyle() {
      return {
        fontSize: '12px',
        position: 'absolute',
        left: this.form.labelWidth,
        top: '40px',
        height: '15px',
        lineHeight: '15px'
      }
    }
  },
  mounted() {
    // 监听validate，做校验
    this.$on('validate', () => {
      this.validate()
    })
    // 告诉form，我已经注册了，解耦$parent
    // this.$parent.$emit('add-item', this)
    this.dispatch('form', 'add-item', this)
  },
  methods: {
    validate() {
      // 获取对应FormItem校验规则
      const rules = this.form.rules[this.prop]
      // 获取校验值
      const value = this.form.model[this.prop]
      // 校验描述对象
      const descriptor = { [this.prop]: rules }
      // 创建校验器
      const schema = new Schema(descriptor)
      // 返回Promise，没有触发catch就说明验证通过
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // 将错误信息显示
          this.error = errors[0].message
        } else {
          // 校验通过
          this.error = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item-container {
  height: 60px;
  position: relative;
  .form-item-content {
    display: flex;
    font-display: row;
    align-items: center;
    height: 40px;
  }
  .form-item-error {
    color: red;
  }
}
</style>