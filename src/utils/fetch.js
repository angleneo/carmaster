import { baseUrl, agent } from '@/config/env'
import Vue from 'vue'
import VueResource from 'vue-resource'
import {getStore} from './mUtils'

Vue.use(VueResource)

export default async(url = '', data = {}, type = 'GET', hasId = true, hasToken = true, hasAgent = true) => {
  type = type.toUpperCase()
  url = baseUrl + url

  // let dataStr = '' // 数据拼接字符串
  // Object.keys(data).forEach(key => {
  //   dataStr += key + '=' + data[key] + '&'
  // })
  // dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
  if (hasAgent) {
    data['userAgent'] = agent
  }
  if (hasToken) {
    data['token'] = getStore('token')
  }
  if (hasId) {
    data['openId'] = getStore('wechatid')
  }
  console.log(JSON.stringify(data))

  if (type === 'GET') {
    // url = url + '?' + dataStr
    // let headers = {}
    let res = null
    try {
      res = await Vue.http.get(url, {params: data}, {headers: {}, emulateJSON: true})
      res = res.body
    } catch (e) {
    }
    return res
  } else {
    Vue.http.options.headers = {
      'Content-Type': 'application/json'
    }
    Vue.http.options.body = JSON.stringify(data)
    Vue.http.options.emulateJSON = true
    Vue.http.options.method = 'POST'
    let res = null
    try {
      res = await Vue.http.post(url, JSON.stringify(data))
      res = res.body
    } catch (e) {
    }
    return res
  }
  //     url = url + '?' + dataStr
  //   }
  // }
  // if (window.fetch && method === 'fetch') {
  //   let requestConfig = {
  //     method: type,
  //     headers: {
  //       'Origin': 'http://getman.cn',
  //       'Referer': 'http://getman.cn/'
  //     },
  //     mode: 'cors'
  //   }
  //
  //   if (type === 'POST') {
  //     Object.defineProperty(requestConfig, 'body', {
  //       value: JSON.stringify(data)
  //     })
  //   }
  //   try {
  //     const response = await fetch(url, requestConfig)
  //     return response.json()
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // } else {
  //   return new Promise((resolve, reject) => {
  //     let requestObj = new XMLHttpRequest()
  //
  //     let sendData = ''
  //     if (type === 'POST') {
  //       sendData = JSON.stringify(data)
  //     }
  //
  //     requestObj.open(type, url, true)
  //     requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  //     requestObj.send(sendData)
  //     requestObj.onreadystatechange = () => {
  //       if (requestObj.readyState === 4) {
  //         if (requestObj.status === 200) {
  //           let obj = requestObj.response
  //           if (typeof obj !== 'object') {
  //             obj = JSON.parse(obj)
  //           }
  //           console.log(obj)
  //           resolve(obj)
  //         } else {
  //           reject(requestObj)
  //         }
  //       }
  //     }
  //   })
  // }
}
