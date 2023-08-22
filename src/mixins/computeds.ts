export default {
  data() {
    return {
      globalRules: {
        required: [(v: string) => !!v || "Field required"],
        email: [
          (v: string) => !!v || "Field required",
          (v: string) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid email.'
          },
        ],
      }
    }
  },
  computed: {
    // isLogged() {
    //   return this.$wallet.isSignedIn()
    // },
    // user() {
    //   return this.$store.state.dataUser
    // },
    appIsLaunched() {
      return localStorage.getItem("appIsLaunched")
    },
    // baseDomainPath() {
    //   return this.axios.defaults.baseURL
    // },
    // getTheme() {
    //   return this.$vuetify.theme.name
    // },
    // getThemeSrc() {
    //   return `@/assets/sources/themes/${this.$vuetify.theme.name}/`
    // }
  },
  methods: {
    // basePath(url, prefix = "/app") {
    //   return `${this.appIsLaunched ? prefix : ''}${url}`
    // },
  }
}
