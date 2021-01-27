### vue1.x、2.x，利用 `Object.defineProperty` 来对 `data` 中的数据进行拦截

- `Object.defineProperty(obj, prop, descriptor)`
  - `obj`：传入的对象
  - `prop`：对象的属性（key）
  - `descriptor`：描述对象，可以设置 `get()`、`set()` 来对属性的访问进行拦截，当读取时，触发 `get()` 方法，当设置属性时，触发 `set()` 方法

### 使用 api

```js
/**
 * @description: 监测对象的每一个属性
 * @param {data：需要监测的对象}
 */
function observe(data) {
  // 类型判断
  if (typeof data !== 'object' || data === null) {
    return
  }
  // 遍历对象属性，对每一个属性进行属性拦截
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

/**
 * @description: 对obj进行监测，监听属性的get和set操作
 * @param {obj：监测对象；key：对象属性；val：当前属性值}
 */
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    // 读取时触发
    get: () => {
      console.log(`读取${key}`)
      return val
    },
    // 设置时触发
    set: newVal => {
      if (newVal !== val) {
        console.log(`设置${key}：`, newVal)
        val = newVal
      }
    }
  })
}

function testApi() {
  let data = {
    name: '重学vue',
    address: 'https://relearnvue.com',
    // 对象属性
    skill: {
      vue: 'aaa'
    },
    // 数组属性
    array: ['aaa', 'bbb', 'ccc']
  }
  // 对数据data进行拦截处理
  observe(data)

  // 读取操作，触发get
  // 读取单个值
  data.name // 打印：读取name
  data.address // 打印：读取address

  // 设置操作，触发set
  data.name = 'relearnvue' // 打印：设置name： relearnvue
}
```

### 递归处理嵌套对象

```js
// 尝试读取skill对象
data.skill // 打印：读取skill
data.skill.vue // 打印：读取skill，❌
```

- 在读取`data.skill.vue`时，并没有打印 **“读取：vue”**，需要修改 `defineReactive` 方法，处理 `val` 是对象的情况

```js
function defineReactive(obj, key, val) {
  // 处理嵌套对象
  observe(val)
  ...
}
```

### 新增属性

```js
// 给data对象设置新的属性，然后读取，并没有任何打印
data.author = 'hhh'
data.author
```

- 这样设置不会触发 `get()` 和 `set()`，所以直接给 `vue` 的 `data` 设置的新属性没有做响应式处理，需要使用`$set`

```js
// 使用$set给新增属性做响应式
this.$set(data, 'author', 'hhh')
```

### 操作数组

- 先看一下 `vue` 官方对于数组响应式的说明：

<img src="http://relearnvue.com/static/vue-array.png" style="width: 800px;">

- 实际测试一下：

```js
// 通过索引读取和设置数组元素
data.array[0]
// 打印：
// 读取array
// 读取0
data.array[0] = 'xxx'
// 打印：
// 读取array
// 设置0： xxx

// 通过数组api修改数组
data.array.push('www')
// 打印：
// 读取array
```

测试结果：

1. `Object.defineProperty` 会把数组的索引当做 `key` 来对数组元素的访问进行拦截监听，但在 `vue` 并没有采用这个方式，why？官方回答是：**性能！**
2. `Object.defineProperty` 监听不到通过 api 修改数组的操作

<img src="http://relearnvue.com/static/vue-array-ans.png" style="width: 800px;">
