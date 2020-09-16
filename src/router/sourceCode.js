/*
 * @Author: mingxing.huang
 * @Date: 2020-08-18 09:58:14
 */
import Layout from '@/components/Layout'

const bucket = {
  path: '/sourcecode',
  redirect: '/sourcecode/defineProperty',
  component: Layout,
  meta: {
    title: '响应式原理',
    icon: 'code'
  },
  children: [
    {
      path: '/sourcecode/defineProperty',
      name: 'defineProperty',
      component: () => import('../views/sourcecode/defineProperty/index.vue'),
      meta: {
        title: 'defineProperty'
      }
    },
    {
      path: '/sourcecode/array-reactive',
      name: 'array-reactive',
      component: () => import('../views/sourcecode/array_reactive'),
      meta: {
        title: '数组的响应式处理'
      }
    },
    {
      path: '/sourcecode/mvvm',
      name: 'mvvm',
      component: () => import('../views/sourcecode/mvvm'),
      meta: {
        title: '手写一个简单的mvvm框架'
      }
    },
    {
      path: '/sourcecode/v2',
      name: 'v2',
      component: () => import('../views/sourcecode/v2'),
      meta: {
        title: 'vue2.0响应式改进'
      }
    }
  ]
}
export default bucket
