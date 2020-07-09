<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:45:56
--> 
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'form',
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => {}
    },
    labelWidth: String,
    labelPosition: {
      type: String,
      default: 'left',
      validator: val => {
        return ['left', 'center', 'right'].includes(val)
      }
    }
  },
  provide() {
    return {
      form: this
    }
  },
  created() {
    this.fields = []
    this.$on('add-item', item => {
      this.fields.push(item)
    })
  },
  methods: {
    validate(cb) {
      let tasks = this.fields
        .filter(field => field.prop)
        .map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>