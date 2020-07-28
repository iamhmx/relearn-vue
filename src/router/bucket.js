/*
 * @Author: mingxing.huang
 * @Date: 2020-07-17 09:25:40
 */
import Layout from '@/components/Layout'

const bucket = {
  path: '/bucket',
  redirect: '/bucket/vue-router',
  component: Layout,
  meta: {
    title: '全家桶',
    icon: 'bucket'
  },
  children: [
    {
      path: '/bucket/vue-router',
      name: 'router',
      component: () => import('../views/bucket/vue-router'),
      meta: {
        title: 'vue-router原理及实现'
      }
    },
    {
      path: '/bucket/vuex',
      name: 'vuex',
      component: () => import('../views/bucket/vuex'),
      meta: {
        title: 'vuex原理及实现'
      }
    }
  ]
}
export default bucket
