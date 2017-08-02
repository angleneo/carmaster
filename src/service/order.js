/**
 * Created by wujerry on 2017/7/18.
 */
import fetch from '../utils/fetch'

/*
 * 一键服务
 */
export const oneStepService = (userId, phoneNumber, carId) => fetch('/oneStepBooking', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    carId: carId
  }
}, 'POST')
/*
 * 取消订单
 */
export const orderCancel = (userId, phoneNumber, orderId) => fetch('/order.cancel', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    orderId: orderId
  }
}, 'POST')
/*
 * 确认订单
 */
export const orderConfirm = (userId, phoneNumber, orderId, orderNumber) => fetch('/order.confirm', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    orderId: orderId,
    orderNumber: orderNumber
  }
}, 'POST')
/*
 * 订单详情
 */
export const orderDetailRead = (userId, phoneNumber, orderId, orderNumber, greedyMode) => fetch('/orderDetail.read', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    greedyMode: greedyMode,
    orderId: orderId,
    orderNumber: orderNumber
  }
}, 'POST')

/*
 * 我的订单
 */
export const orderList = (userId, phoneNumber, carId, orderStatus, page, count) => fetch('/orderList.read', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    carId: carId,
    orderStatus: orderStatus,
    page: page,
    count: count
  }
}, 'POST')

/*
 * 微信授权
 */
export const wxAuth = (url) => fetch('/wxAuthJs.get', {
  url: url
}, 'GET')

/*
 *
 */
export const payOrder = (userId, phoneNumber, orderId, orderNumber) => fetch('/order.pay', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    orderId: orderId,
    orderNumber: orderNumber
  }
}, 'POST')

/*
 *
 */
export const orderJudge = (userId, phoneNumber, orderId, orderNumber, rank) => fetch('/order.judge', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    orderId: orderId,
    orderNumber: orderNumber,
    rank: rank
  }
}, 'POST')
