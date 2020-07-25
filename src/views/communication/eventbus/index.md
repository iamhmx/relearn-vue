### 采用发布、订阅模式，构造一个对象，实现发布和订阅方法；组件a调用订阅方法，监听事件，组件b调用发布方法，派发事件，当事件被派发时，所有订阅了该方法的组件都能收到通知，从而进行通信，常用于没有关系组件间的通信。
实现 `main.js`：
```js
import Vue from 'vue'
// Vue实例已经实现了订阅和发布方法：$on、$emit，可以直接使用😆
// 在Vue原型上挂一个$bus，所有的Vue实例都能通过它进行通信
Vue.prototype.$bus = new Vue()
```
a组件，订阅通知：
```js
created() {
  // 订阅事件监听
  this.$bus.$on('hello', v => {
    alert('a组件接收到通知，值为：' + v)
  })
}
```
b组件，派发事件：
```html
<button @click='$bus.$emit('hello', '我是b组件，嘻嘻')'>用事件总线，派发事件</button>
```