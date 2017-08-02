import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userinfo: null, // 用户信息
  cars: null,
  carinfo: null,
  newcar: null,
  newcarstep: 1,
  test: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
