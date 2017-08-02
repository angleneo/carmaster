/**
 * Created by wujerry on 2017/6/28.
 */
import {
  INIT_USER,
  USER_LOGOUT,
  USER_LOGIN,
  SET_SESSIONKEY,
  USER_CARS,
  CAR_INFO,
  NEW_CAR,
  TEST
} from './mutation-types'

import {getStore, setStore, removeStore} from '../utils/mUtils'

export default {
  [USER_LOGIN] (state, uinfo) {
    state.userinfo = uinfo
    setStore('userinfo', state.userinfo)
  },
  [USER_LOGOUT] (state) {
    removeStore('userinfo')
    state.userinfo = null
  },
  [INIT_USER] (state) {
    let initUser = getStore('userinfo')
    if (initUser) {
      state.userinfo = initUser
    }
  },
  [SET_SESSIONKEY] (state, sessionKey) {
    state.sessionkey = sessionKey
    setStore('sessionkey', state.sessionkey)
  },
  [USER_CARS] (state, cars) {
    state.cars = cars
  },
  [CAR_INFO] (state, car) {
    state.carinfo = car
  },
  [NEW_CAR] (state, info) {
    if (!state.newcar) {
      state.newcar = {...info}
    } else {
      state.newcar = {...state.newcar, ...info}
    }
    console.log(state.newcar)
  },
  [TEST] (state, info) {
    state.test = info
  }
}
