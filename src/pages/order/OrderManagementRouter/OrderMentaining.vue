<template>
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="home">
      <div class="card-box p-d" v-for="oneorder in orders">
        <h4 class="left color-g-b"><b>{{oneorder.carNumber}}</b></h4> <span
        class="right color-green">{{oneorder.orderStatus | status}}</span>
        <div class="clear"></div>
        <div class="card-list" v-goto="'OrderDetail'" data-key="orderid" :data-value="oneorder.orderId">
          <ul>
            <li>{{files.factoryName}}</li>
            <li class="color-g-h">订单号：{{oneorder.orderNumber}}</li>
            <li class="color-g-h">下单时间:{{oneorder.orderTime}}</li>
          </ul>
          <div class="order-cost">
            <span class="color-g-b left">合计费用：{{oneorder.orderAmount | money}}元</span>
            <button type="button" class="right btn btn-primary  btn-block bg-confirm" @click.stop="confirm(oneorder)" v-if="oneorder.orderStatus === 1">确认订单</button>
            <button type="button" class="right btn btn-primary  btn-block bg-c-payment" v-goto="'OrderDetail'" data-key="orderid" :data-value="oneorder.orderId" v-if="oneorder.orderStatus === 2">去支付</button>
          </div>
        </div>
      </div>

      <dl-modal v-show="confirmOrder" :dl-type="cType" :dl-options="options"></dl-modal>
    </div>
  </div>
</template>
<script>
  import {orderList, orderConfirm} from '@/service/order'
  import {mapState, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        orders: [],
        files: '',
        confirmOrder: false,
        cType: 'confirm-order',
        options: null
      }
    },
    computed: {
      ...mapState(['carinfo'])
    },
    mounted () {
      this.getUserOrders()
    },
    methods: {
      ...mapMutations(['USER_CARS', 'CAR_INFO']),
      // userId, phoneNumber, carId, orderStatus, page, count
      async getUserOrders () {
        let oRes = await orderList('', '', '', '0|1|2|3', 1, 10)
        if (oRes && oRes.result === 0) {
          this.orders = oRes.data.orders
        } else if (oRes) {
          this.$toast.center(oRes.desc)
        } else {
          this.$toast.center('无法链接互联网...')
        }
      },
      async confirm (order) {
        this.cType = 'confirm-order'
        this.confirmOrder = true
        let o = order
        let v = this
        this.options = {
          yes: async function () {
            v.confirmOrder = false
            let res = await orderConfirm(null, null, o.orderId, o.orderNumber)
            if (res.result === 0) {
              v.$toast.center(res.desc)
              v.getUserOrders()
            }
          },
          no: function () {
            v.confirmOrder = false
          }
        }
      }
    }
  }
</script>
<style>
  .order-box01 {
    margin-bottom: 4.5rem;
  }
</style>
