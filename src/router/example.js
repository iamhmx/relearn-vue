/*
 * @Author: mingxing.huang
 * @Date: 2020-08-17 17:00:10
 */

const routes = [
  {
    path: '/example/home',
    component: () => import('@/views/example/home.vue')
  },
  {
    path: '/example/about',
    component: () => import('@/views/example/about.vue'),
    children: [
      {
        path: '/example/about/info',
        component: {
          render(h) {
            return h('div', 'about info')
          }
        }
      }
    ]
  }
]

export default routes
