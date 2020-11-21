import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

const getDefaultState = () => {
  return {
    tokenScope: ''
  }
}
const state = getDefaultState()

const mutations = {
  SET_TOKEN_SCOPE (state, tokenScope) {
    state.tokenScope = tokenScope
  }
}

export const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
