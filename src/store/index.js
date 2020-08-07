import Vue from 'vue'
import Vuex from './mvuex'

Vue.use(Vuex)

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
    async_add({ commit }) {
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
