import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { name: '', path: "/", component: () => import("../pages/Login.vue") },
    { name: 'login', path: "/Login", component: () => import("../pages/Login.vue") },
    {
        name: 'mainPage', path: "/MainPage", component: () => import("../pages/MainPage.vue"), children: [

        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
