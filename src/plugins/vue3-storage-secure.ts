import Vue3Storage from "vue3-storage-secure";

// Types
import type { App } from 'vue'

export const storageSecureCollection = {
  appIsLaunched: 'appIsLaunched',
  uid: 'uid',
  tokenAuth: 'tokenAuth',
  rememberEmail: 'rmEmail',
}

export default (app: App) => app.use(Vue3Storage, {
  namespace: process.env.SECURE_STORAGE_NAME_SPACE,
  secureKey: process.env.SECURE_STORAGE_KEY
})
