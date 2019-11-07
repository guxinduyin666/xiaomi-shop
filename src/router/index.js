import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/shoppingCart',
        name: 'shoppingCart',
        component: () => import(/* webpackChunkName: "shoppingCart" */ '../views/ShoppingCart.vue')
    },
    {
        path: '/address',
        name: 'address',
        component: () => import(/* webpackChunkName: "address" */ '../views/Address.vue')
    },
    {
        path: '*',
        redirect: {name: 'home'}
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path != '/') {
        const user = JSON.parse(Vue.prototype.$cookie.get('user'))||{};
        if (!user.userName) {
            Vue.prototype.$message('您没有访问当前页面的权限,请先登录!');
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router
