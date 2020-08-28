/*
 * @Author: mingxing.huang
 * @Date: 2020-08-18 09:58:14
 */
import Layout from '@/components/Layout'

const bucket = {
  path: '/code',
  redirect: '/code/defineProperty',
  component: Layout,
  meta: {
    title: '响应式原理',
    icon: 'code'
  },
  children: [
    {
      path: '/code/defineProperty',
      name: 'defineProperty',
      component: () => import('../views/code/defineProperty/index.vue'),
      meta: {
        title: 'defineProperty'
      }
    },
    {
      path: '/code/mvvm',
      name: 'mvvm',
      component: () => import('../views/code/mvvm'),
      meta: {
        title: '手写一个简单的mvvm框架'
      }
    }
  ]
}
export default bucket
