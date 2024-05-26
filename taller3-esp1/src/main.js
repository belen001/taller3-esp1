import '@fontsource/poppins';
import './style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { router } from "@/router/router.js";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

