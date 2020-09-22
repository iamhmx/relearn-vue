### 虚拟 Dom

描述完整 `Dom` 结构的 `JS` 对象。`vue` 会将模板编译成 `render` 方法，执行 `render` 方法，就会得到虚拟 `Dom`，在发生更新时，通过比较新旧虚拟 `Dom`，得到最小 `Dom` 操作量，结合 `vue` 批量异步更新策略，高效刷新。

```html
<div id="app">
  <h1>虚拟Dom</h1>
  <p>{{name}}</p>
</div>
```

```js
const app = new Vue({
  el: '#app',
  data: { name: '重学vue' }
})
console.log(app.$options.render)
```

编译模板，生成 `render` 方法：

```
ƒ anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('h1',[_v("虚拟Dom")]),_v(" "),_c('p',[_v(_s(name))])])}
}
```

执行 `render` 方法，将得到虚拟 `Dom`，它可以完全描述真实 `Dom`

```js
{
  tag: 'div',
  data: {
    attrs: {
      id: 'app'
    }
  }
  children: [
    {tag: 'h1', children: [{tag: 'undefined', text: '虚拟Dom'}]},
    {tag: 'undefined', text: ' '}, // 这个节点是换行产生的
    {tag: 'p', children: [{tag: 'undefined', text: '重学vue'}]}
  ]
}
```

### Diff

比较新旧虚拟 `Dom`，找出不同的地方，进行更新。`web` 中很少会跨层操作 `Dom`，所以 `Diff` 采用：**深度优先，同层比较**。

`Diff` 规则：

1. 老的有孩子，新的没有孩子，就删除
2. 老的没有孩子，新的有孩子，就增加
3. 新老都有孩子，就比较孩子（深度优先）

第 3 种情况是 2 个 `children` 的比较，直接双循环比较时间复杂度为 `O(n ^ 2)`，为了减少复杂度，`vue` 作了以下优化，在两个数组的首尾设置指针，并取出对应的四个节点：

- 老的开始：`oldStartIdx`，`oldStartVnode`
- 老的结束：`oldEndIdx`, `oldEndVnode`
- 新的开始：`newStartIdx`，`newStartVnode`
- 新的结束：`newEndIdx`，`newEndVnode`

然后进行两两比较：

1. 当 `oldStartVnode` 和 `newStartVnode` 或者 `oldEndVnode` 和 `newEndVnode` 满足 `sameVnode`（同一节点），直接将该 `VNode` 节点进行 `patchVnode`（更新） 即可
2. 如果 `oldStartVnode` 与 `newEndVnode` 满足 `sameVnode`。说明 `oldStartVnode` 已经跑到了 `oldEndVnode` 后面去了，进行 `patchVnode` 的同时还需要将节点移动到 `oldEndVnode` 的后面
3. 如果 `oldEndVnode` 与 `newStartVnode` 满足 `sameVnode`，说明 `oldEndVnode` 跑到了 `oldStartVnode` 的前面，进行 `patchVnode` 的同时要将节点移动到 `oldStartVnode` 的前面
4. 如果以上情况均不符合，则在 `old VNode` 中找与 `newStartVnode` 相同的节点，若存在执行 `patchVnode`，同时将 节点移动到 `oldStartIdx` 的前面
5. 如果 `newStartVnode` 在 `old VNode` 节点中找不到一致的 `sameVnode`，这个时候会调用 `createElm` 创建一个新的节点，并移动到 `oldStartIdx` 前面
6. 当 `old VNode` 遍历完后，将剩余的新节点直接创建并追加
7. 当 `new VNode`遍历完后，将剩余的老节点直接删除

代码实现（保留关键逻辑，源码：<https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js> 404 行）

```js
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  // 首尾4个指针和4个节点
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // 循环比较，当首尾指针交叉时，循环结束
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 调整首尾节点
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 老的开始 == 新的开始
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      )
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 老的结束 == 新的结束
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 老的开始 == 新的结束
      // 先更新
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      )
      // 再移动
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        )
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 老的结束 == 新的开始
      // 先更新
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      )
      // 再移动
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) {
        // 在老的里面没有找到，新增
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        )
      } else {
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 在老的中间位置找到了，更新并移动
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          )
          oldCh[idxInOld] = undefined
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // key相同，但是节点不同，当做新节点处理
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          )
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx > oldEndIdx) {
    // 老的遍历完了，将剩余的新节点，新增并追加
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    )
  } else if (newStartIdx > newEndIdx) {
    // 新的遍历完了，将剩余的老节点，移除
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}
```

`v-for` 中为什么要设置 `key`？答案在这里，`sameVnode` 实现

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  )
}
```

在进行 `Diff` 时，`key` 很大概率决定了两个节点是否相同，设置 `key`，可以最大限度的复用节点，避免不必要的节点创建，从而提升性能

思考：`data` 中有数据：`arr = ['a', 'b', 'c']`，在`'a'`, `'b'`之间，插入`'d'`，`Diff` 过程是怎样的？
