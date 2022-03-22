import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'


/*
 * SSR requires a fresh app instance per request, therefore we export a function
 * that creates a fresh app instance. If using Vuex, we'd also be creating a
 * fresh store here.
 */
export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const router = createRouter(pinia)
  app.use(router)
  app.use(pinia)
  return { app, router, pinia }
}
