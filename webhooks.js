const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/webhooks', secret: 'relearnvuehahaha' })

http
  .createServer((req, res) => {
    handler(req, res, err => {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(6519, () => {
    console.log('Webhooks Listen at 6519')
  })

handler.on('error', err => console.error('Error：', err.message))

handler.on('push', event => {
  const { payload } = event
  console.log(
    '接收到一个push事件，for %s to %s：',
    payload.repository.name,
    payload.ref
  )
  if (payload.ref === 'refs/heads/master') {
    console.log('deploy master branch')
    run_cmd('sh', ['./deploy-dev.sh'], text => console.log(text))
  }
})

function run_cmd(cmd, args, cb) {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  let res = ''

  child.stdout.on('data', buffer => (res += buffer))
  child.stdout.on('end', () => cb(res))
}
