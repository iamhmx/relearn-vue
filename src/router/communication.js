/*
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:08:25
 */
import Layout from "@/components/Layout";

const communicationRoutes = {
    path: '/communication',
    redirect: '/communication/props_emit',
    component: Layout,
    meta: {
        title: '组件通信',
        icon: 'communication'
    },
    children: [
        {

            path: '/communication/props_emit',
            name: 'props_emit',
            component: () => import('../views/communication/props_emit/index.vue'),
            meta: {
                title: 'props & emit',
            }
        },
        {

            path: '/communication/parent_children',
            name: 'parent_children',
            component: () => import('../views/communication/parent_children/index.vue'),
            meta: {
                title: '$parent & $children',
            }
        },
        {

            path: '/communication/refs',
            name: 'refs',
            component: () => import('../views/communication/refs/index.vue'),
            meta: {
                title: '$refs',
            }
        },
        {

            path: '/communication/provide_inject',
            name: 'provide_inject',
            component: () => import('../views/communication/provide_inject/index.vue'),
            meta: {
                title: 'provide & inject',
            }
        },
        {

            path: '/communication/eventbus',
            name: 'eventbus',
            component: () => import('../views/communication/eventbus/index.vue'),
            meta: {
                title: 'eventbus',
            }
        }
    ]
}
export default communicationRoutes