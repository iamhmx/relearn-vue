/*
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:08:25
 */
const communicationRoutes = {
    path: '/communication',
    redirect: '/communication/props_emit',
    component: () => import('../views/empty.vue'),
    children: [
        {

            path: '/communication/props_emit',
            name: 'props_emit',
            component: () => import('../views/communication/props_emit/index.vue')
        },
        {

            path: '/communication/parent_children',
            name: 'parent_children',
            component: () => import('../views/communication/parent_children/index.vue')
        },
        {

            path: '/communication/refs',
            name: 'refs',
            component: () => import('../views/communication/refs/index.vue')
        },
        {

            path: '/communication/provide_inject',
            name: 'provide_inject',
            component: () => import('../views/communication/provide_inject/index.vue')
        },
    ]
}
export default communicationRoutes