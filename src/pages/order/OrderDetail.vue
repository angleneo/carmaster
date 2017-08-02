<template>
    <div class="main" >
      <div class="details-text p-d">
        <ul class=" b-l">
          <li>订单号：{{order.orderNumber}}<span class="right"> </span></li>
          <li>下单时间：{{order.orderTime}}</li>
        </ul>
        <ul class=" b-l font14">
          <li class="font14">车牌号：{{order.carNumber}}</li>
          <li class="font14">车主姓名：{{order.ownerName}}</li>
          <li class="list-o font14"><nobr>车牌信息：{{order.carModel}}</nobr></li>
          <li class="font14">行使公里：{{order.milage}}公里</li>
          <li class="list-o font14"><nobr>门店信息：{{order.factoryName}}</nobr></li>
        </ul>
        <div class="table b-l"  >
          <table>
           <thead>
           <tr>
            <th>服务项目</th>
            <th>数量</th>
            <th>配件费用</th>
            <th>工时费用</th>
           </tr>
           </thead>
           <tbody>
            <tr v-for="item in order.items">
              <td>{{item.itemName}}</td>
              <td>{{item.itemCount}}</td>
              <td>{{item.itemFee}}</td>
              <td></td>
            </tr>
           </tbody>
          </table>
        </div>
        <div class="order-box">
          <ul>
              <li>优惠金额 <span class="color-red right">{{order.discount | money}}</span></li>
            </ul>
        </div>
      </div>
      <div class="foot-fixe">
        <span class="left">合计费用：{{order.totalAmount | money}}元</span>
        <div class="right bg-c-completed text-center order-none" @click="actPayOrder()"> 支付 </div>
      </div>
    </div>
</template>
<style>
  .order-star-box {
    width: 9rem;
    right: 10%;
    top: 2%;
    height: 20px;
  }
  .order-box li {
    width: 100%;
    border: none;
    /* border-right: 2px solid #1aaae6; */
    text-align: left;
    padding-right: 7.5%;
    padding-left: 4%;
  }
  .order-none {
    border-radius: 0px;
    border: none;
    font-size: 2.0rem;
  }
</style>

<script>
// import {readCar} from '@/service/vehicle'
import wx from 'weixin-js-sdk'
import {userInfo} from '@/service/user'
import {userCars, getActiveCar} from '@/service/vehicle'
import {wxAuth, payOrder, orderDetailRead} from '@/service/order'
import {getStore} from '@/utils/mUtils'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      count: 10,
      page: 1,
      order: {}
    }
  },
  computed: {
    ...mapState(['userinfo', 'carinfo'])
  },
  mounted () {
//    this.userinfosync()
//    this.carinfosync()
    this.getOrderdetail()
    this.initWx()
  },
  methods: {
    ...mapMutations(['USER_LOGIN', 'USER_CARS', 'CAR_INFO']),
    async initWx () {
      let appId = getStore('wechatid')
      let timestamp = null
      let nonceStr = null
      let signature = null
      let wxRes = await wxAuth(window.location.href)
      if (wxRes && wxRes.result === 0) {
        appId = wxRes.data.appId
        timestamp = wxRes.data.timeStamp
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
        wx.chooseWXPay({
          timestamp: ores.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: ores.data.nonceStr, // 支付签名随机串，不长于 32 位
          package: 'prepay_id=' + ores.data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: ores.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: ores.data.paySign, // 支付签名
          success: function (res) {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.errMsg === 'chooseWXPay:ok') {
              //  支付成功跳转到订单页面
              this.$router.push({name: 'PayResult'})
            } else {
              // 支付失败跳转到订单页面继续支付
              this.$toast.center(res.errMsg)
              // orderState=0&
            }
          }
        })
      } else {
        this.$toast.center(ores.desc)
      }
    },
    async actPayOrder () {
      this.payOrderParams()
    },
    async userinfosync () {
      // 获取用户详情
      let ures = await userInfo()
      if (ures && ures.result === 0) {
        this.USER_LOGIN(ures.data)
      } else if (ures) {
        this.$toast.center(ures.desc)
      } else {
        this.$toast.center('无法链接网络...')
      }
    },
    async carinfosync () {
      // 获取用户车辆列表
      let cres = await userCars()
      if (cres && cres.result === 0) {
        if (cres.data && cres.data.length > 0) {
          this.USER_CARS(cres.data)
        }
      }

      let ares = await getActiveCar()
      if (ares && ares.result === 0) {
        this.CAR_INFO(ares.data)
      }
    },
    async getOrderdetail () {
      // 查询订单详情
      // userId, phoneNumber, orderId, orderNumber, greedyMode
      let orderId = this.$route.params.orderid || this.$route.query.orderid
      console.log(orderId)
      if (!orderId) {
        this.$toast.center('参数错误，请重新选择订单...')
//        this.$router.push({name: 'OrderManagement'})
      } else {
        let res = await orderDetailRead('', '', orderId, '', '')
        if (res && res.result === 0) {
          this.order = res.data
        }
      }
    }
  }
}
</script>
