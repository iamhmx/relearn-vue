/*
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:23:28
 */
import Layout from "@/components/Layout";

const component = {
    path: '/component',
    redirect: '/component/form',
    component: Layout,
    meta: {
        title: '组件化',
    },
    children: [
        {

            path: '/component/form',
            name: 'form',
            component: () => import('../views/component/form'),
            meta: {
                title: '封装form组件'
            }
        },
        {

            path: '/component/notice',
            name: 'notice',
            component: () => import('../views/component/notice'),
            meta: {
                title: '实现消息提示插件notice'
            }
        },
        {

            path: '/component/tree',
            name: 'tree',
            component: () => import('../views/component/tree/index.vue'),
            meta: {
                title: '实现树组件tree'
            }
        }
    ]
}
export default component