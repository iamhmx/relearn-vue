### 原理

`webpack` 会读取配置文件，从入口文件 `entry` 开始，分析模块之间的依赖，处理代码转换，将所有模块打包到一个资源文件中

原始文件：

```js
// ./src/index.js
import { aStr } from './a.js'
import { bStr } from './b.js'
console.log(`${aStr}，${bStr}`)

// ./src/a.js
export const aStr = '你好'

// ./src/b.js
export const bStr = '世界'
```

配置文件：`webpack.config.js`

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  }
}
```

打包后的内容会输出到 `dist/main.js` 中，可以直接将内容放到浏览器中执行，得到结果

`main.js` 的内容是一个立即执行函数，大致内容结构如下：

```js
;(function(modules) {
  // 1.接收处理后的模块
  // 2.补齐浏览器执行需要的方法：require/export等
  // 3.执行入口文件
})(
  // 参数是模块对象
  {
    './a.js': {
      dependencies: {},
      code: ''
    }
  }
)
```

### 实现

打包入口文件，`bundle.js`

```js
const config = require('./webpack.config')
const webpack = require('./src/webpack')
// new一个实例，调用run
new webpack(config).run()
```

实现 `webpack` 类，`webpack.js`：

```js
const fs = require('fs')
const path = require('path')
// 按模块解析生成AST
const parser = require('@babel/parser')
// 解析依赖
const traverse = require('@babel/traverse').default
// 处理code
const { transformFromAst } = require('@babel/core')

module.exports = class webpack {
  constructor(options) {
    // 保存入口和输出目录
    this.entry = options.entry
    this.output = options.output
    // 保存模块
    this.modules = []
  }
  // 入口方法
  run() {
    // 解析入口
    const info = this.parse(this.entry)
    this.modules.push(info)
  }
}
```

解析方法 `parse`：

```js
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
      const pathName = './' + path.join(path.dirname(entryFile), node.source.value)
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
```

修改 `run` 方法，递归处理依赖：

```js
run() {
    const info = this.parse(this.entry)
    this.modules.push(info)
    // 递归处理所有依赖
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const { dependencies } = item
      if (dependencies) {
        for (const d in dependencies) {
          // 继续调用parse，解析
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
    // 生成代码，输出文件
    this.file(obj)
  }
```

代码生成、输出文件方法 `file`：

```js
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
```

执行 `node bundle.js`，会生成 `dist/main.js` 文件：

```js
;(function(modules) {
  // 补齐require函数
  function require(module) {
    // 在模块内部的require是引用的相对当前文件的路径，需要转换成相对于工程目录的路径
    function newRequire(relativePath) {
      return require(modules[module].dependencies[relativePath])
    }
    // 定义exports对象，挂载导出的内容
    var exports = {}
    ;(function(require, exports, code) {
      // 执行代码
      eval(code)
    })(newRequire, exports, modules[module].code)
    return exports
  }
  // 执行入口
  require('./src/index.js')
})({
  './src/index.js': {
    dependencies: { './a.js': './src/a.js', './b.js': './src/b.js' },
    code:
      '"use strict";\n\nvar _a = require("./a.js");\n\nvar _b = require("./b.js");\n\nconsole.log("".concat(_a.aStr, "\\uFF0C").concat(_b.bStr));'
  },
  './src/a.js': {
    dependencies: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.aStr = void 0;\nvar aStr = \'你好\';\nexports.aStr = aStr;'
  },
  './src/b.js': {
    dependencies: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.bStr = void 0;\nvar bStr = \'世界\';\nexports.bStr = bStr;'
  }
})
```

将这段代码，放到浏览器中执行，即可看到结果：

<img src="http://relearnvue.com/static/webpack.png">
