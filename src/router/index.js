import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueRouter from '@/views/bucket/vue-router/mvue-router'
import communicationRoutes from './communication'
import componentRoutes from './component'
import bucketRoutes from './bucket'
import codeRoutes from './sourceCode'
import flushRoutes from './flush'
import deployRoutes from './deploy'

// import routes from './example'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/communication'
  },
  communicationRoutes,
  componentRoutes,
  bucketRoutes,
  codeRoutes,
  flushRoutes,
  deployRoutes,
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
