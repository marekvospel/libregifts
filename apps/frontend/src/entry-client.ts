import { createApp } from './main'
import axios from 'axios'
import { useStore } from './stores/index.store'

const { app, router, pinia } = createApp()

// @ts-ignore
const initialState: any = window.__INITIAL_STATE__

pinia.state.value = initialState.pinia

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  axios.defaults.baseURL = window.location.protocol + '//' + window.location.host + '/api'
  app.mount('#app')

  const store = useStore()
  store.setToken(localStorage.getItem('token') ?? '')
})
