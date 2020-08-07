### vuex 使用方式：

```js
// store/index.js
import Vue from 'vue'
// todo：实现vuex
import Vuex from 'vuex'

// 使用Vuex，可知Vuex是一个插件，在实现的时候需要提供install方法
Vue.use(Vuex)

// 创建store对象并导出
export default new Vuex.Store({
  // 数据保存在state中
  state: {
    count: 1
  },
  // mutations，提交变更：commit
  mutations: {
    // mutations里面的方法都自带一个state参数，这个state是哪里来的？？？
    add(state) {
      state.count++
    }
  },
  // actions，派发事件：dispatch，可执行异步操作，然后commit
  actions: {
    // actions里面的方法都自带一个store对象作为参数，通常解构使用，这个store是哪里来的？？？
    async_add({ dispatch, commit }) {
      setTimeout(() => {
        commit('add')
      }, 2000)
    }
  },
  // getters，计算属性
  getters: {
    doubleCount: state => {
      return state.count * 2
    }
  }
})
```

```js
// main.js
import store from './store'

new Vue({
  // 传入store对象
  store,
  render: h => h(App)
}).$mount('#app')
```

```js
// 在组件实例中使用：
this.$store.state.count // 访问数据
this.$store.getters.doubleCount // 访问getter
this.$store.dispatch('async_add') // 派发action
this.$store.commit('add') // 提交mutation
```

### 实现 `vuex`:

从上面的使用方法我们可以知道以下几点：

- `vuex` 是一个插件
- 会把 `store` 对象挂载 `Vue` 的原型上，以便在 `vue` 实例中可以通过 `this.$store` 来访问
- `vuex` 中会实现 `dispatch` 和 `commit` 方法
- `vuex` 中保存的数据 `state` 是响应式的，当数据修改时，使用它的组件都会重新渲染

### 创建 `mvuex.js` :

```js
let MVue

class Store {
  constructor(options) {
    // options就是传入的配置对象：state{}、mutations{}、actions{}、getters{}
    this.$options = options

    const state = options.state
    // state如何响应式？因为vue对象的data是响应式的，利用vue，可以把state做成响应式数据
    // 在实例中：this.$store.state就能访问到这里的state，this.$store.state.count，就能访问到data里面的数据
    // 实际上是this.$store.state.data.count，由于state是vue实例，对date做了代理，所以使用this.$store.state.count即可
    // this.state = new MVue({
    //   data: state
    // })

    // 直接将state暴露不是一个好方法，参考源码（https://github.com/vuejs/vuex/blob/dev/src/store.js）306行
    // 利用存取器，将state保护起来
    this._vm = new MVue({
      data: {
        $$state: state // $$xxx属性将不会做代理
      }
    })

    // mutations
    this._mutations = options.mutations

    // actions
    this._actions = options.actions

    // 绑定commit、dispatch执行上下文，参考源码（https://github.com/vuejs/vuex/blob/dev/src/store.js）40行
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload)
    }
  }

  // 存取器
  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('use store.replaceState() to explicit replace store state.')
  }

  // 实现commit方法
  commit(type, payload) {
    // 根据type取出对应的mutation
    const mt = this._mutations[type]
    if (!mt) {
      console.error('未知的mutation type：', +type)
      return
    }
    // mutation方法中的第一个参数state就是在这里传入的
    mt(this.state, payload)
  }

  // 实现dispatch方法
  dispatch(type, payload) {
    // 根据type取出对应的action
    const action = this._actions[type]
    if (!action) {
      console.error('未知的action type：', +type)
      return
    }
    // action方法中的第一个参数store就是在这里传入的
    action(this, payload)
  }
}

const install = Vue => {
  MVue = Vue

  // 挂载store对象
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }
```

### `vuex` 中的 getters 如何实现？

- `getters` 就是 `vuex` 的计算属性
- `state` 的响应式，利用了 `vue` 实例的 `data`，同样可以利用 `vue` 实例的 `computed` 来实现 `getters`
- 使用方式：`this.$store.getters.doubleCount`，`getters` 对象的 `key` 是方法名，`value` 是方法执行的结果

```js
constructor(options) {
  // 定义getters对象，就是this.$store.getters这个对象
  this.getters = {}
  const computed = {}
  // 遍历getters的key，key就是方法名
  Object.keys(options.getters).forEach(key => {
    // 构造computed对象，方法名作为key，函数作为value
    computed[key] = () => {
      // 该方法的结果，就是getter方法执行结果
      return options.getters[key](this.state)
    }
    // 拦截属性访问，当访问this.$store.getters.doubleCount时，实际上是返回_vm计算属性的值
    // 而计算属性的值，就是getter方法执行结果
    Object.defineProperty(this.getters, key, {
      get: () => {
        return this._vm[key]
      },
      set: () => {
        console.error(`请不要尝试给getters.${key}直接赋值`)
      }
    })
  })

  this._vm = new MVue({
    data: {
      $$state: state
    },
    // 传入computed
    computed
  })
}
```
