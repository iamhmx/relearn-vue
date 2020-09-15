var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhooks', secret: 'relearnvuehahaha' })

http
  .createServer(function(req, res) {
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

handler.on('push', function(event) {
  console.log(
    '接收到一个push事件，for %s to %s：',
    event.payload.repository.name,
    event.payload.ref
  )
  if (
    event.payload.ref === 'refs/heads/master' &&
    event.payload.head_commit.message.startsWith('[cicd]')
  ) {
    console.log('deploy master branch')
    run_cmd('sh', ['./deploy-dev.sh'], text => console.log(text))
  }
})

function run_cmd(cmd, args, cb) {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  let res = ''

  child.stdout.on('data', buffer => (res += buffer.toString()))
  child.stdout.on('end', () => cb(res))
}
