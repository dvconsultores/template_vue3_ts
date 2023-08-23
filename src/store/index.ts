import { createStore } from 'vuex'

// TODO checkout for default store config
const store = createStore({
  state: {
    user: {
      uid: undefined,
      username: undefined,
      email: undefined,
      avatar: undefined,
    },
    drawer: true,
  },
  mutations: {
    // setData(state, data) {
    //   // MUTATE USER STATE
    // },
    // signIn(state, key) {
    //   // LOG IN
    // },
    // signOut() {
    //   // LOG OUT
    // },
    setDrawerState(state, value) {
      state.drawer = value
    }
  },
  actions: {
    // modalConnect() {
    //   const layout = this.$router.app.$children
    //     .find(data => data.$el === document.getElementById("layout"));

    //   layout.$refs.connect.modalConnect = true
    // },
    getData({commit}) {
      // GET USER DATA TO SET DATA
      commit("setData", {});
    },
  },
  getters: {
    // pagination: () => ({items = [], currentPage = Number, itemsPerPage = Number, search = String, filterA = String}) => {
    //   let filters = [...items]
  
    //   // search
    //   if (search) filters = filters.filter(data => data.name.includes(search))
    //   // filter A (tier)
    //   if (filterA) filters = filters.filter(data => data.tier === filterA)
  
    //   return filters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    // }
  },
  modules: {},
})

export default store
