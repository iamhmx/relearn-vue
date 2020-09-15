/*
 * @Author: mingxing.huang
 * @Date: 2020-09-15 09:55:18
 */
import Layout from '@/components/Layout'

const bucket = {
  path: '/deploy',
  redirect: '/deploy/nginx',
  component: Layout,
  meta: {
    title: '部署与持续集成',
    icon: 'deploy'
  },
  children: [
    {
      path: '/deploy/nginx',
      name: 'nginx',
      component: () => import('../views/deploy/nginx/index.vue'),
      meta: {
        title: 'Nginx部署静态资源'
      }
    },
    {
      path: '/deploy/webhook',
      name: 'webhook',
      component: () => import('../views/deploy/webhook/index.vue'),
      meta: {
        title: '持续集成'
      }
    },
    {
      path: '/deploy/docker',
      name: 'docker',
      component: () => import('../views/deploy/docker/index.vue'),
      meta: {
        title: 'Docker部署'
      }
    }
  ]
}
export default bucket
