### 事件循环 Event Loop

先看一下这段代码的输出：

```js
console.log('script start')

setTimeout(() => {
  console.log('setTimeout1')
}, 0)

Promise.resolve()
  .then(function() {
    console.log('promise1')
    setTimeout(() => {
      console.log('setTimeout2')
    })
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
```

- 事件循环：浏览器为了协调事件处理、脚本执行、网络请求和渲染等任务而制定的工作机制
- 宏任务：代表一个个离散的、独立的工作单元。浏览器完成一个宏任务，**在下一个宏任务执行前，会对⻚面进行重新渲染**。常见的宏任务主要包括执行主线 `JS` 代码、定时器、各种事件如⻚面加载、输入、网络事件等。
- 微任务：微任务是更小的任务，是在当前宏任务执行结束后立即执行的任务。**如果存在微任务，浏览器会清空微任务之后再重新渲染**。常见的微任务有： `Promise`、`MutationObserver`等。

<img src="https://relearnvue.com/static/eventloop.png" style="width: 100%;">

- 打印结果：

```js
script start
script end
promise1
promise2
setTimeout1
setTimeout2
```
