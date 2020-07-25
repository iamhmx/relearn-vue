### 组件使用：
```html
<tree :data="treeData"></tree>
```
### 数据格式：
```js
treeData: [
  {
    title: '显示内容'
    children: [
      {
        title: '显示内容',
        children: []
      }
    ]
  }
]
```