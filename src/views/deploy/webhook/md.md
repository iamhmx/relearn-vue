### 利用 `webhook` 实现持续集成

1. 将本地代码上传 `GitHub` 仓库
2. 添加 `webhook`，配置服务器信息，当仓库中有指定事件发生（比如：`push`）时，会向指定的服务器发送请求
3. 在服务器端运行 `server` 服务，处理 `GitHub` 发过来的请求，然后执行具体的操作

### 配置 webhook

- 添加 `webhook`
  <img src="http://relearnvue.com/static/webhook1.png" style="width: 100%;">

- 配置服务器信息
  <img src="http://relearnvue.com/static/webhook2.png" style="width: 100%;">

### 编写后台服务

- `webhooks.js`

```js
var http = require('http')
// 使用github-webhook-handler处理webhook
var createHandler = require('github-webhook-handler')
// 创建handler实例，这里的path和secret要和github上保持一致
var handler = createHandler({ path: '/webhooks', secret: '123456' })

// 创建server，监听端口
http
  .createServer(function(req, res) {
    // 用handler处理请求
    handler(req, res, function(err) {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(6519, () => {
    console.log('Webhooks Listen at 6519')
  })

handler.on('error', function(err) {
  console.error('Error：', err.message)
})

// 监听push事件
handler.on('push', function(event) {
  console.log(
    '接收到一个push事件，for %s to %s：',
    event.payload.repository.name,
    event.payload.ref
  )
  // 只处理master分支上且commit message以[cicd]开头的push事件
  if (
    event.payload.ref === 'refs/heads/master' &&
    event.payload.head_commit.message.startsWith('[cicd]')
  ) {
    console.log('deploy master branch')
    // 执行命令
    run_cmd('sh', ['./deploy-dev.sh'], text => console.log(text))
  }
})

// 使用child_process执行shell文件
function run_cmd(cmd, args, cb) {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  let res = ''
  // 输出
  child.stdout.on('data', buffer => (res += buffer.toString()))
  child.stdout.on('end', () => cb(res))
}
```

- 将 `webhooks.js` 运行在服务器端，调试时可以用 `node`、`nodemon`，也可以用 `forever`、`pm2` 保持后台运行

- `deploy-dev.sh` 脚本
  1. 拉取最新代码
  2. 执行`build`

```shell
echo 正在部署...
echo git pull...
git pull origin master
npm install
npm run build
```

- 执行 `push` 后，`webhook` 服务会自动拉取最新代码，然后打包最新资源，用 `Nginx` 部署不需要重启，网址随即更新

```shell
$ git add -A && git commit -m '[cicd]test cicd' && git push origin master
```

<img src="http://relearnvue.com/static/webhook3.png">
