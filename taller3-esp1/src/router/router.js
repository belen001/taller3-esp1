import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
// { path: '/about', component: AboutView },
]
export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})