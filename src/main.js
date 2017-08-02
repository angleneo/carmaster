// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Custom from './components/custom'
import {setStore, getStore, removeStore} from './utils/mUtils'
import {userInfo, serverToken, wechatOpenId} from '@/service/user'
import {mapMutations} from 'vuex'
import Filters from './filter'

import Toast from 'vue2-toast'

import './assets/css/bootstrap.css'
import './assets/css/public.css'
import 'vue2-toast/lib/toast.css'
import './assets/fontawesome/css/font-awesome.min.css'

Vue.use(Toast)
Vue.use(Filters)

Vue.use(Custom)

Vue.config.productionTip = false


router.beforeEach(async (to, from, next) => {
  // setStore('token', 'w1231411')
  // setStore('tokenexp', (new Date()).getTime() + 7200 * 1000)
  // setStore('wechatid', 'oxLTCs9JsfqxIJ0CfLDJoFUHYQHg')
  // setStore('wechatid', 'oVg0txFvBaUcxx4YOFR_ENkwE524')
  // setStore('phonenumber', '15000268555')
  // removeStore('token')
  // removeStore('tokenexp')
  // removeStore('wechatid')
  // removeStore('phonenumber')
  let token = getStore('token')
  let tokenexp = getStore('tokenexp')
  let wechatid = getStore('wechatid')
  let phonenumber = getStore('phonenumber')
  // phonenumber = '15000268562'
  // 是否存在Token
  if (!token || !tokenexp || (new Date()).getTime() > parseInt(tokenexp)) {
    let tres = await serverToken()
    if (tres && tres.result === 0) {
      setStore('token', tres.data.token)
      setStore('tokenexp', (new Date()).getTime() + parseInt(tres.data.expireIn) * 1000)
    }
  }

  // 是否正常的拿到了wechatid
  if (!wechatid) {
    if (!to.query.code) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1e1b61b463326dfa&redirect_uri=http://test1.cds.bakheet.cn&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect'
    } else {
      let wres = await wechatOpenId(to.query.code)
      if (wres && wres.result === 0) {
        setStore('wechatid', wres.data.openId)
      }
    }
  }
  if (!phonenumber) {
    let ures = await userInfo()
    if (ures && ures.result === 0 && ures.data.phoneNumber) {
      setStore('phonenumber', ures.data.phoneNumber)
      phonenumber = ures.data.phoneNumber
    }
  }

  if (to.name === 'Bound'){
    next()
  } else {
    if (!phonenumber) {
      next({name: 'Bound'})
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
