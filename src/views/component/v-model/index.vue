<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-23 10:37:10
--> 
<template>
  <div>
    <rl-text v="组件可以通过设置v-model来实现双向绑定，v-model是一个语法糖，实际做的事情是：接收一个名为value的prop，然后emit一个名为input的事件。"></rl-text>
    <sub-title>使用：</sub-title>
    <mk :content="usage"></mk>
    <sub-title>自定义组件custom1.vue：</sub-title>
    <mk :content="content1Html"></mk>
    <mk :content="content1Js"></mk>
    <custom1 v-model="a"></custom1>
    <p>a的值：{{a}}</p>
    <rl-text v="对于像checkbox这种选择型控件，可以设置model选项来指定接收的属性名和派发的事件名。"></rl-text>
    <sub-title>自定义组件custom2.vue：</sub-title>
    <mk :content="content2Html"></mk>
    <mk :content="content2Js"></mk>
    <custom2 v-model="b"></custom2>
    <p>b的值：{{b}}</p>
  </div>
</template>

<script>
import custom1 from './custom1'
import custom2 from './custom2'
export default {
  components: {
    custom1,
    custom2,
  },
  data() {
    return {
      a: '',
      b: true,
      content1Html: this.genHtml(`
<template>
  <div>
    <input type="text"
           :value="value"
           @input="valueInput">
  </div>
</template>`),
      content1Js: this.genJs(`
export default {
  props: {
    // 接收value属性
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    valueInput(e) {
      // emit名为input的事件
      this.$emit('input', e.target.value)
    },
  },
}
    `),
      usage: this.genHtml(`
...

<custom1 v-model="a"></custom1>
<p>a的值：{{a}}</p>
<custom2 v-model="b"></custom2>
<p>b的值：{{b}}</p>

...

data() {
    return {
      a: '',
      b: true
    }
}`),
      content2Html: this.genHtml(`
<template>
  <div>
    苹果
    <input type="checkbox"
           :checked="checked"
           @change="changeHandle"
           value="苹果" />
  </div>
</template>
`),
      content2Js: this.genJs(`
export default {
  // 指定v-model接收的属性、派发的方法
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  methods: {
    changeHandle(e) {
      this.$emit('change', e.target.checked)
    },
  },
}`),
    }
  },
}
</script>

<style lang="scss" scoped>
</style>