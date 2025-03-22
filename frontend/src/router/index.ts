import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { name: '', path: "/", component: () => import("../pages/Login.vue") },
    { name: 'login', path: "/Login", component: () => import("../pages/Login.vue") },
    {
        name: 'Menu', path: "/Menu", component: () => import("../pages/Menu.vue"), children: [
            { name: 'List', path: 'List', component: () => import("../pages/List/List.vue") },
            { name: 'AccountManage', path: 'AccountManage', component: () => import("../pages/AccountManage/AccountManage.vue") },
            { name: 'AccountEdit', path: 'AccountEdit/:uuid', component: () => import("../pages/AccountManage/AccountEdit.vue") },
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
