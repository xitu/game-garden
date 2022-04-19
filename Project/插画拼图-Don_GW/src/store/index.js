import Vuex from './vuex'
import list from '@/config'

export default new Vuex.Store({
  state: {
    list,
    current: {},
  },
  mutations: {
    SET_CURRENT(state, current) {
      state.current = current
    },

    SET_PASS_CURRENT(state) {
      state.current.pass = 1
    },
  },
})
