/*
 * @Author: mingxing.huang
 * @Date: 2020-07-08 16:23:28
 */
const component = {
    path: '/component',
    redirect: '/component/form',
    component: () => import('../views/empty.vue'),
    children: [
        {

            path: '/component/form',
            name: 'form',
            component: () => import('../views/component/form')
        },
        {

            path: '/component/notice',
            name: 'notice',
            component: () => import('../views/component/notice')
        }
    ]
}
export default component