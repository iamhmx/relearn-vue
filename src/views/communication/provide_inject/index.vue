<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 11:37:22
--> 
<template>
  <div>
    <rl-text v="父组件provide数据，所有后代组件都可以通过inject获得数据，常用于深层次的父子组件通信，封装组件库。"></rl-text>
    <sub-title>父组件：</sub-title>
    <mk :content="html"></mk>
    <mk :content="content" />
    <sub-title>子组件template：</sub-title>
    <mk :content="childHtml" />
    <sub-title>子组件script：</sub-title>
    <mk :content="childJs" />
    <sub-title>孙子组件template：</sub-title>
    <mk :content="grandsonHtml" />
    <sub-title>孙子组件script：</sub-title>
    <mk :content="grandsonJs" />
    <p>改变父组件的count，观察子组件中注入数据的变化：<button @click="parentCount++">count + 1</button></p>
    <child></child>
    <grandson></grandson>
    <point v='provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。绿色部分的值就是通过注入父组件获取的，这就是可响应的。'></point>
  </div>
</template>

<script>
import child from './child'
import grandson from './grandson'

export default {
  components: {
    child,
    grandson
  },
  data() {
    return {
      parentCount: 0,
      html: this.genHtml(
        `<p><button @click="parentCount++">count + 1</button></p>`
      ),
      content: this.genJs(`
export default {
  data() {
    return {
      parentCount: 0,
    }
  },
  provide() {
    return {
      // provide父组件的属性parentCount
      count: this.parentCount,
      // provide父组件自身实例
      parent: this
    }
  }
}`),
      childHtml: this.genHtml(`
<template>
  <div>
    <p>孩子组件，显示注入的count：{{childCount}}</p>
    <p class="reactive">孩子组件，通过注入的父组件实例获取值：{{parent.parentCount}}</p>
  </div>
</template>`),
      childJs: this.genJs(`
export default {
  // 注入数据，可以直接使用数组的形式
  // inject: ['count', 'parent']
  inject: {
    // 取别名、设置默认值
    childCount: {
      from: 'count',
      default: 0
    },
    parent: {
      from: 'parent'
    }
  }
}`),
      grandsonHtml: this.genHtml(`
<template>
  <div>
    <p>孙子组件，显示注入的count：{{count}}</p>
    <p class="reactive">孙子组件，通过注入的父组件实例获取值：{{parent.parentCount}}</p>
  </div>
</template>
      `),
      grandsonJs: this.genJs(`
export default {
  // 注入数据，使用数组的形式
  inject: ['count', 'parent']
}
      `)
    }
  },
  provide() {
    return {
      // provide父组件的属性parentCount
      count: this.parentCount,
      // provide父组件自身实例
      parent: this
    }
  }
}
</script>

<style lang="scss" scoped>
</style>