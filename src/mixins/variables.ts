import axios from "axios"
import store from "@/store"
import { useStorage } from "vue3-storage-secure"
import { useTheme } from "vuetify/lib/framework.mjs"

export default {
  // ? custom defines
  globalRules: {
    required: [
      (v: string) => !!v || "Field required",
      (v: File[]) => !!v?.length || "Field required",
    ],
    email: [
      (v: string) => !!v || "Field required",
      (v: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'Invalid email.'
      },
    ],
  },
  isProduction: process.env.NODE_ENV === 'production',

  isLogged() {
    return useStorage()?.getStorageSync('tokenAuth') ? true : false
  },
  profile() {
    return store.state.profile
  },
  appIsLaunched() {
    return useStorage()?.getStorageSync('appIsLaunched')
  },
  baseDomainPath() {
    return axios.defaults.baseURL
  },
  getTheme() {
    return useTheme().name
  },
  getThemeSrc() {
    return `@/assets/sources/themes/${useTheme().name}/`
  },
  basePath(url: string, prefix = "/app") {
    return `${this.appIsLaunched() ? prefix : ''}${url}`
  },

  //?  life cycle
  // mounted() {},
}
