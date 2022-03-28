import App from './App.vue'
import { createApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()
const router = createRouter(pinia)
app.use(router)
app.use(pinia)

app.mount('#app')
