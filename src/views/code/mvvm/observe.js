/*
 * @Author: mingxing.huang
 * @Date: 2020-08-28 16:14:02
 */
class Observe {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive(obj, key, val) {
    this.walk(val)
    Object.defineProperty(obj, key, {
      get() {
        console.log('读取：', key)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          console.log('设置：', key)
          val = newVal
        }
      }
    })
  }
}

export default Observe
