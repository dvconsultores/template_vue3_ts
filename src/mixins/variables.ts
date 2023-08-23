import axios from "axios"
import { useTheme } from "vuetify/lib/framework.mjs"
import { useStore } from "vuex"

export default {
  // ? custom defined
  globalRules: {
    required: [(v: string) => !!v || "Field required"],
    email: [
      (v: string) => !!v || "Field required",
      (v: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'Invalid email.'
      },
    ],
  },

  isLogged() {
    return localStorage.getItem("tokenAuth")
  },
  user() {
    return useStore().state.user
  },
  appIsLaunched() {
    return localStorage.getItem("appIsLaunched")
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