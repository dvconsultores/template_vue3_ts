import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'
import { useStorage } from 'vue3-storage-secure'

// Types
import type { App } from 'vue'

export default (app: App) => {
  const storage = useStorage()

  // set default baseURL
  axios.defaults.baseURL = process.env.API_URL || 'DEFAULT_DOMAIN_API';

  // request interceptor
  axios.interceptors.request.use(
    config => {
      // set default header auth
      const token = config.headers.Authorization
      const tokenAuth = storage?.getStorageSync("tokenAuth")
      if (!tokenAuth) storage?.setStorageSync('tokenAuth', token)

      config.headers['Authorization'] = token || tokenAuth
      return config
    },
    error => Promise.reject(error)
  )

  // response interceptor
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error?.response.status === 401) router.push('/auth')
      return Promise.reject(error)
    }
  )

  app
  .use(VueAxios, axios)
  .provide('axios', app.config.globalProperties.axios)
}
