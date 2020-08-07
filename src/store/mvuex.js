let MVue

class Store {
  constructor(options) {
    // options就是传入的配置对象：state{}/mutations{}/actions{}
    this.$options = options

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
      },
      computed
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
