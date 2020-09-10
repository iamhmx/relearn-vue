### 数组响应式

数组响应式，即：实现在操作数组的同时能够通知更新，`vue2.0` 采用原型覆盖的方式来处理数组的响应式

```js
// 获取数组原型
const arrayProto = Array.prototype
// 复制一份，避免污染
export const arrayMethods = Object.create(arrayProto)

// 7个修改数组的方法，需要覆盖的方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

// 遍历拦截修改数组的方法
methodsToPatch.forEach(function(method) {
  // 缓存原始方法
  const original = arrayProto[method]
  // 调用数组方法，实际会执行mutator
  def(arrayMethods, method, function mutator(...args) {
    // 执行原始方法，用于最终结果返回
    const result = original.apply(this, args)
    // 获取observer
    const ob = this.__ob__
    // 有新元素插入的3个操作
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 新加入元素有可能也是对象，需要执行响应式处理
    if (inserted) ob.observeArray(inserted)
    // 通知更新
    ob.dep.notify()
    // 返回数组操作的结果
    return result
  })
})
```
