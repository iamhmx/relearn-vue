```js
// parent.vue
this.$children[0] // child1
```
```js
// child1.vue
this.$children[0] // child2
this.$parent // parent
```
```js
// child2.vue
this.$parent // child1
this.$parent.$parent // parent
```