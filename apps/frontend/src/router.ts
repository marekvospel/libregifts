import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router'
import routes from '~pages'
import { useStore } from './stores/index.store'
import { Pinia } from 'pinia'

export function createRouter(pinia: Pinia) {
  const store = useStore(pinia)

  const router = _createRouter({
    /*
     * use appropriate history implementation for server/client
     * import.meta.env.SSR is injected by Vite.
     */
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })

  router.beforeEach((to, from, next) => {
    if (!import.meta.env.SSR && to.meta.auth && !store.token)
      next('/admin/sign/in')


    next()
  })

  return router
}
