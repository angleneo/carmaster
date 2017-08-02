/**
 * Created by wujerry on 2017/7/18.
 */
import fetch from '../utils/fetch'

/*
 * 获取微信OpenId
 */
export const wechatOpenId = (code) => fetch('/openId.get', {code: code}, 'GET')

/*
 * 获取token
 */
export const serverToken = () => fetch('/token.get', {}, 'GET', false, false, false)

/*
 * 手机验证码接口
 */
export const loginCaptcha = (phone) => fetch('/loginCaptcha.get', {phoneNumber: phone}, 'POST', false)

/*
 *  绑定用户手机
 */
export const checkLogin = (phone, captcha) => fetch('/login', {captcha: captcha, phoneNumber: phone}, 'POST')

/*
 *
 */
export const userLogout = (sessionKey) => fetch('/logout', {sessionKey: sessionKey}, 'POST')

/*
 * 个人信息查询
 */
export const userInfo = (userId, phoneNumber) => fetch('/userInfo.read', {
  userId: userId,
  phoneNumber: phoneNumber
}, 'POST')

/*
 * 个人信息编辑
 */
export const userEdit = (userId, phoneNumber, userName, userSex) => fetch('/userInfo.update', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    userName: userName,
    userSex: userSex
  }
}, 'POST')
