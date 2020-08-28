/*
 * @Author: mingxing.huang
 * @Date: 2020-08-28 16:15:51
 */
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        console.log('编译元素：', node.nodeName)
      } else if (this.isInterpolation(node)) {
        console.log('编译插值文本：', node.textContent)
        this.compileText(node)
      }
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 类型判断
  isElement(node) {
    return node.nodeType === 1
  }

  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 编译
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1]
  }
}

export default Compile
