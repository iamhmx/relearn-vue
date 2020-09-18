/*
 * @Author: mingxing.huang
 * @Date: 2020-09-17 11:08:20
 */
import Layout from '@/components/Layout'

const bucket = {
  path: '/flush',
  redirect: '/flush/eventloop',
  component: Layout,
  meta: {
    title: '异步更新策略',
    icon: 'flush'
  },
  children: [
    {
      path: '/flush/eventloop',
      name: 'eventloop',
      component: () => import('../views/flush/eventloop/index.vue'),
      meta: {
        title: '事件循环'
      }
    }
  ]
}

export default bucket
