### nextTick 原理

先看一下这段代码

```html
<div id="demo">
  <p id="p1">{{num}}</p>
</div>
```

```js
const app = new Vue({
  el: '#demo',
  data: { num: -1 },
  mounted() {
    this.num = 1
    // 此时p标签的内容并没有变化，说明渲染是异步的
    console.log('p1.innerHTML:' + p1.innerHTML)

    this.$nextTick(() => {
      // 这里才是最新的值，why？
      console.log('p1.innerHTML:' + p1.innerHTML)
    })
  }
})
```

`nextTick` 的实现，为了便于理解只留核心逻辑（源码位置：<https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js>）

```js
export function nextTick(cb) {
  // 将cb放入回调数组中
  callbacks.push(cb)
  // 调用timerFunc方法
  timerFunc()
}
```

`timerFunc` 的实现

```js
let timerFunc
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  // 微任务
  timerFunc = () => {
    p.then(flushCallbacks)
  }
  isUsingMicroTask = true
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  let counter = 1
  // 微任务
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 宏任务
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 宏任务
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

- `timerFunc` 优先使用微任务（`Promise`、`MutationObserver`），如果不行，退化成宏任务（ `setImmediate`、`setTimeout`）

`flushCallbacks` 方法实现：将 `callbacks` 里面的回调方法都执行一遍

```js
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

### 总结

- `nextTick` 优先使用微任务处理更新队列，如果不行，退化成宏任务处理
- `vue` 会将更新队列放到微任务中，当前宏任务执行完后，会清空微任务队列，执行所有更新操作，然后浏览器刷新
