import { createMemoryHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

export const routes = [

    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            isPrivated: false,
            showInNav: true
        }
    },
    {
        path: '/records',
        name: 'Récords',
        component: () => import('@/views/Records.vue'),
        meta: {
            isPrivated: false,
            showInNav: true
        }
    },
    {
        path: '/play',
        name: 'Jugar',
        component: () => import('@/views/Play.vue'),
        meta: {
            isPrivated: true,
            showInNav: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            isPrivated: false,
            showInNav: false
        }
    }

]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useAuthStore();

    if (to.name !== 'Login' && !isAuthenticated && to.meta.isPrivated) next({ name: 'Login' })
    else next()
})
