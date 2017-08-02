<template>

</template>
<script>
  import wx from 'weixin-js-sdk'
  import {mapState} from 'vuex'
  import {wxAuth, payOrder} from '@/service/order'
  import {getStore} from '@/utils/mUtils'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState(['userinfo'])
    },
    mounted () {
      this.initWx()
      this.payOrderParams()
    },
    methods: {
      async initWx () {
        let appId = getStore('wechatid')
        let timestamp = null
        let nonceStr = null
        let signature = null
        let wxRes = await wxAuth(window.location.href)
        if (wxRes && wxRes.result === 0) {
          appId = wxRes.data.appid
          timestamp = wxRes.data.timestamp
          nonceStr = wxRes.data.nonceStr
          signature = wxRes.data.signature
        }
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见附录1
          jsApiList: ['chooseWXPay']
        })
        wx.checkJsApi({
          jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        })
        wx.ready(function () {
          console.log('验证成功')
        })
        wx.error(function (res) {
          console.log(res)
        })
      },
      async payOrderParams () {
        let ores = await payOrder(null, null, 8116, null)
        if (ores && ores.result === 0) {
          alert(ores.desc)
        } else {
        }
      },
      async actPayOrder () {

      }
    }
  }
</script>
