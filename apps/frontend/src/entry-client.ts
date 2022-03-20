import { createApp } from './main'
import axios from 'axios'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  axios.defaults.baseURL = window.location.host
  app.mount('#app')
})
