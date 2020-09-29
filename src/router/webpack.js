/*
 * @Author: mingxing.huang
 * @Date: 2020-09-28 14:39:26
 */
import Layout from '@/components/Layout'

const webpackRoute = {
  path: '/webpack',
  redirect: '/webpack/bundle',
  component: Layout,
  meta: {
    title: 'webpack',
    icon: 'webpack'
  },
  children: [
    {
      path: '/webpack/bundle',
      name: 'bundle',
      component: () => import('../views/webpack/bundle'),
      meta: {
        title: '打包原理及实现'
      }
    }
  ]
}
export default webpackRoute
