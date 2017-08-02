/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = ''
let routerMode = 'history'
let baseImgPath = 'http://localhost:8080/static/images'
let wechatAuthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect'
let agent = 'WeChat'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://cds-website.bakheet.cn/store_wx_api'
} else {
  baseUrl = 'http://cds-website.bakheet.cn/store_wx_api'
}

export {
  baseUrl,
  routerMode,
  baseImgPath,
  wechatAuthUrl,
  agent
}
