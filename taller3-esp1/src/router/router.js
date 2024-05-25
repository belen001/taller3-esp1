import { createMemoryHistory, createRouter } from 'vue-router'

export const routes = [

    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/play',
        name: 'Play',
        component: () => import('@/views/Play.vue'),
    }

]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})