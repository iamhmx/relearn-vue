import Vue from 'vue'
import VueRouter from 'vue-router'
import communicationRoutes from "./communication";
import componentRoutes from "./component";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/communication'
  },
  communicationRoutes,
  componentRoutes,
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
