import Vue from 'vue'

class Store {
  constructor({ state, mutations }) {
    Object.assign(this, {
      state: Vue.observable(state || {}),
      mutations,
    })
  }

  commit(type, arg) {
    this.mutations[type](this.state, arg)
  }
}

export default {
  Store,
}
