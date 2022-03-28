import {
  createRouter as _createRouter,
  createWebHistory, Router,
} from 'vue-router'
import routes from '~pages'
import { useStore } from './stores/index.store'
import { Pinia } from 'pinia'

export function createRouter(pinia: Pinia): Router {
  const store = useStore(pinia)

  const router = _createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach((to, from, next) => {
    if (!import.meta.env.SSR && to.meta.auth && !store.token) return next('/admin/sign/in')

    next()
  })

  return router
}
