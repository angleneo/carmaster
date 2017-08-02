<template>
    <div class="main" v-title data-title="绑定手机号码">
      <div class="wrapper">
        <div class="login_box">
            <img src="../assets/images/login-car.png" class="home-img" >
          <form  class="form-inline">
            <div class="login-sign">
              <ul>
                <li><img src="../assets/images/login.png" ><input type="text" class="form-control " v-model="phone" placeholder="请输入手机号" aria-describedby="sizing-addon1"></li>
                <li><img src="../assets/images/code.png">
                  <input type="text" class="form-control" placeholder="请输入验证码" v-model="captcha" aria-describedby="sizing-addon1" style="width:69%">
                  <button  style="width:29%; overflow: hidden" type="button" @click='getCaptcha(this)' :disabled="enableCaptcha" class="btn btn-default ">{{captchaName}}</button>
                </li>
                  <li class="text-left color-tisp" v-show="error">{{error}}</li>
              </ul>
              <div class="pr-m"  > <button type="button" @click="checkCaptcha" style="width:100%;" class="btn btn-primary btn-lg btn-block btn-color">绑定手机</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
<script>
import {loginCaptcha, checkLogin, userInfo} from '@/service/user'
import {getStore, setStore} from '@/utils/mUtils'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      phone: '',
      captcha: '',
      error: '',
      captchaName: '获取验证码',
      enableCaptcha: false,
      t: 5,
      timeout: null
    }
  },
  beforeCreate () {
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['USER_LOGIN', 'USER_CARS', 'CAR_INFO']),
    async checkLoginStatus () {
      // 判断是否已被是绑定过的
      if (!getStore('phonenumber')) {
        let ures = await userInfo()
        if (ures && ures.result === 0 && ures.data.phoneNumber) {
          setStore('phonenumber', ures.data.phoneNumber)
          this.$router.push({name: 'Home'})
        }
      }
    },
    async getCaptcha (btn) {
      let res = await loginCaptcha(this.phone)
      if (res && res.result === 0) {
        this.$toast(res.desc)
      } else {
        this.error = res.desc
      }
      this.enableCaptcha = true
      this.t = 60
      this.captchaName = '60(s)后重试'
      this.timeout = setInterval(this.timefunc, 1000)
    },
    async timefunc () {
      this.t--
      if (this.t > 0) {
        this.captchaName = this.t + '(s)后重试'
      } else {
        this.captchaName = '获取验证码'
        this.enableCaptcha = false
        clearInterval(this.timeout)
      }
    },
    async checkCaptcha () {
      let res = await checkLogin(this.phone, this.captcha)
      if (res && res.result === 0) {
        this.$router.push({name: 'Home'})
      } else if (res.result !== 0) {
        this.error = res.desc
      } else {
        this.$toast.center('无法联接到服务器...')
      }
    }
  }
}
</script>
<style scope>
 .login-sign input{
    border:0;
    -webkit-appearance:none;
  }
  .color-tisp{
    color: #a90014;
  }
  .login-sign input {
    height: 3.275rem;
    width: 100%;
    float: left;
    padding-left: 16%;
    color: #19aae4;
    border: 1px solid #dbeaf4;
  }
 .login-sign button{
   height: 3.275rem;
   line-height: 0rem;
 }
</style>
