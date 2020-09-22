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
    },
    {
      path: '/flush/nextTick',
      name: 'nextTick',
      component: () => import('../views/flush/nextTick/index.vue'),
      meta: {
        title: 'nextTick'
      }
    },
    {
      path: '/flush/vnode_diff',
      name: 'vnode_diff',
      component: () => import('../views/flush/vnode_diff/index.vue'),
      meta: {
        title: '虚拟Dom与Diff'
      }
    }
  ]
}

export default bucket
