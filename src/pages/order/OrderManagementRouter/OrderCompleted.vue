<template>
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="home">
      <div role="tabpanel" class="tab-pane" id="profile" h>
        <div class="card-box p-d" v-for="oneorder in orders">
          <h4 class="left color-g-b"><b>沪A 123456</b></h4>
          <!-- <span class="right order-star ">
                    <img src="../../../assets/images/icon-star-o.png">
                    <img src="../../../assets/images/icon-star-o.png">
                    <img src="../../../assets/images/icon-star-o.png">
                    <img src="../../../assets/images/icon-star-o.png">
                    <img src="../../../assets/images/icon-star-o.png">
                  </span> -->
          <dl-star style="float:right" value="4"></dl-star>
          <div class="clear"></div>
          <div class="card-list">
            <ul>
              <li>
                <span class="list-o"><nobr>{{files.factoryName}} </nobr></span>
                <span class="order-evaluate right">已评价</span>
              </li>
              <li class="color-g-h">订单号：{{oneorder.orderNumber}}</li>
              <li class="color-g-h">下单时间:{{oneorder.orderTime}}</li>
            </ul>
            <div class="order-cost">
              <span class="color-g-b left">合计费用：{{oneorder.orderAmount | money}}元</span>
              <span class="right color-blue">已完成</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {orderList} from '@/service/order'
  import {readRepairHistory} from '@/service/vehicle'
  import {mapState, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        orders: [],
        files: ''
      }
    },
    computed: {
      ...mapState(['carinfo'])
    },
    mounted () {
      this.getUserOrders()
    },
    methods: {
      ...mapMutations(['USER_LOGIN', 'USER_CARS', 'CAR_INFO']),
      // userId, phoneNumber, carId, orderStatus, page, count
      async getUserOrders () {
        let oRes = await orderList('', this.phoneNumber, '', '4', 1, 10)
        if (oRes && oRes.result === 0) {
          this.orders = oRes.data.orders
        }
        let res = await readRepairHistory(null, null, this.carId, 1, 10)
        if (res && res.result === 0) {
          this.files = res.data.orders
        }
      }
    }
  }
</script>
