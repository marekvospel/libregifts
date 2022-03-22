import { createApp } from './main'
import axios from 'axios'
import { Pinia } from 'pinia'

const { app, router } = createApp()

// @ts-ignore
const initialState: any = window.__INITIAL_STATE__

// Hydrate state
const pinia: Pinia = app.config.globalProperties.$pinia
pinia.state.value = initialState.pinia

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  axios.defaults.baseURL = window.location.protocol + '//' + window.location.host + '/api'
  app.mount('#app')
})
