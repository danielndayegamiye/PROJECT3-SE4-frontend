import { createStore } from 'vuex'
import Utils from '@/config/utils'

const user = Utils.getStore('user')

// Create the Vuex store
const store = createStore({
  state: {
    loginUser: user || null,
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
      Utils.setStore('user', user)
    },
  },
  actions: {},
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser
    },
  },
})

export default store
