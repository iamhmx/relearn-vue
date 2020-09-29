const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = class webpack {
  constructor(options) {
    // 保存入口和输出目录
    this.entry = options.entry
    this.output = options.output
    // 保存模块
    this.modules = []
  }
  run() {
    const info = this.parse(this.entry)
    this.modules.push(info)
    // 递归处理所有依赖
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const { dependencies } = item
      if (dependencies) {
        for (const d in dependencies) {
          this.modules.push(this.parse(dependencies[d]))
        }
      }
    }
    // 生成参数对象
    let obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    console.log('obj：', obj)
    // 生成代码，输出文件
    this.file(obj)
  }
  // 解析模块内容
  parse(entryFile) {
    // 读取模块内容
    const content = fs.readFileSync(entryFile, 'utf-8')
    // 将模块内容转成AST
    const ast = parser.parse(content, {
      sourceType: 'module'
    })
    // 将ast中的依赖解析出来
    let dependencies = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        const pathName =
          './' + path.join(path.dirname(entryFile), node.source.value)
        // key：代码中引入的相对路径；value：相对于工程的的路径
        dependencies[node.source.value] = pathName
      }
    })
    // 解析、处理执行代码
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    // 返回对象，如果dependencies中有依赖，还需要递归处理
    return {
      entryFile,
      dependencies,
      code
    }
  }
  file(code) {
    // 输出目录
    const filePath = path.join(this.output.path, this.output.filename)
    const codeStr = JSON.stringify(code)
    // 生成代码
    const bundle = `(function(modules){
      // 补齐require函数
      function require(module){
          // 在模块内部的require是引用的相对当前文件的路径，需要转换成相对于工程目录的路径
          function newRequire(relativePath){
            return require(modules[module].dependencies[relativePath])
          }
          // 定义exports对象，挂载导出的内容
          var exports = {};
          (function(require,exports,code){
              // 执行代码
              eval(code)
          })(newRequire,exports,modules[module].code)
          return exports;
        }
        // 执行入口
        require('${this.entry}')
    })(${codeStr})`
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}
