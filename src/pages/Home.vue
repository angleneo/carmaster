<template>
    <div class="main" v-title data-title="百希特车大师-车主服务">
      <div class="container-fluid">
         <div class="home-banner p-d" v-if="carinfo">
           <div class="tab text-right " @click="switchcar">
             切换 <img src="../assets/images/icon-tab.png">
           </div>
           <div class="row home-car" v-goto="'OrderArchive'">
            <div class="logo">
              <h4>{{carinfo.carNumber}}</h4>
               <span><img src="../assets/images/home-logo.png"></span>
             </div>
            <div class="info">
            <p style="margin-top:10%;" class="font14">{{carinfo.brandName}} {{carinfo.lineName}} </p>
            <p class="list-o" style="width:190px; font-size: 12px; color: #cecece">{{carinfo.modelName}} </p>
            <div class="profile">
              <ul>
                <li class="text-center">历史维修档案 <br/><ins>2次</ins></li>
                <li class="text-center">行程公里<br/>{{carinfo.milage}}</li>
              </ul>
            </div>
          </div>
        </div>

         <div class="text-center home-org btn-m">
           <img src="../assets/images/icon-slogan.png">
         </div>
         <div class="text-center btn-m m-b"><button type="button" @click="booking" class="btn btn-primary btn-lg bg-c-payment">一键预约</button></div>
       </div>
        <div class="home-banner p-d" v-else>
            <!-- <div class="home-no text-center" style="line-height:4rem; margin:4rem 0 ;color: #fff;"> <img src="images/icon-add.png"> &nbsp;<span class="font18">请添加您的车辆</span></div> -->
           <div class="v-add home-no text-center color-w btn-m" v-goto="'Step1'"><img src="../assets/images/icon-add.png">添加车辆</div>
            <div class="text-center home-org btn-m">
              <img src="../assets/images/icon-slogan.png">
            </div>
            <div class="text-center btn-m m-b"><button style="width: 50%;" type="button" @click="booking" class="btn btn-primary btn-lg bg-c-payment">一键预约</button></div>
       </div>
       <!--------------以上banner-------------------->
       <div class="home-cen clearfix">
         <div class="home-title b-l p-d"> 最近订单 <a v-goto="'OrderManagement'" class="color-blue  right" href="#">查看更多>></a></div>
         <div class="home-o-list p-d" v-goto="'OrderDetail'" data-key="orderid" :data-value="order.orderId" v-if="order">
           <ul>
             <li><h3  class="color-g-b">{{order.carNumber}}</h3> <span class="right color-o-t">{{order.orderStatus | status}}</span></li>
             <li class="color-g-h04">下单时间：{{order.orderTime}}</li>
             <li class="color-g-h01" style="margin-top:1.5rem;">{{order.factoryName}}</li>
             <li>
               <h3 class="color-g-b left">¥{{order.orderAmount | money}} </h3>
               <button type="button" @click.stop="confirm(order)"  class="right btn btn-primary  bg-c-payment" v-if="parseInt(order.orderStatus) === 1">确认</button>
               <button type="button" @click.stop="payOrder(order)"  class="right btn btn-primary  bg-c-payment" v-if="parseInt(order.orderStatus) === 2">确认</button>
               <button type="button" @click.stop="confirm(order)"  class="right btn btn-primary  bg-c-payment"  v-if="parseInt(order.orderStatus) === 4">评价</button>
             </li>
           </ul>
         </div>
         <div class=" text-center" style="line-height:14rem;" v-else>您还没有订单哦！</div>
       </div>
      </div>
      <dl-menu dl-index=1></dl-menu>
      <dl-modal v-show="confirmOrder" :dl-type="cType" :dl-options="options"></dl-modal>
    </div>
</template>
<script>
import {userInfo} from '@/service/user'
import {switchCar, userCars, getActiveCar} from '@/service/vehicle'
import {orderList, orderConfirm} from '@/service/order'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      order: null,
      confirmOrder: false,
      cType: 'confirm-order',
      options: null
    }
  },
  computed: {
    ...mapState(['userinfo', 'carinfo'])
  },
  mounted () {
    this.userinfosync()

    this.carinfosync()
    this.orderinfosync()
    console.log(this)
  },
  methods: {
    ...mapMutations(['USER_LOGIN', 'USER_CARS', 'CAR_INFO']),
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
    async orderinfosync () {
      let ores = await orderList(null, null, null, null, 1, 1)
      if (ores && ores.result === 0) {
        if (ores.data && ores.data.totalCount > 0) {
          this.order = ores.data.orders[0]
        }
      } else if (ores) {
        this.$toast.center(ores.desc)
      } else {
        this.$toast.center('无法链接网络...')
      }
    },
    async booking () {
      if (this.carinfo) {
        this.$router.push({name: 'Booking'})
      } else {
        this.$toast.center('亲，请先增加车辆信息...')
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
            v.orderinfosync()
          }
        },
        no: function () {
          v.confirmOrder = false
        }
      }
    },
    async switchcar () {
      let scRes = await switchCar(null, this.carinfo.carId)
      if (scRes && scRes.result === 0) {
        this.CAR_INFO(scRes.data)
      }
    }
  }
}
</script>


<style>
  .home-car { width:100%;  color: #fff; height: 5rem;}
  .home-car .logo { float: left; }
  .home-car .logo h4{ font-size:1.8rem; white-space:nowrap; margin-left: 15px; text-overflow:ellipsis;}
  .home-car .logo img{
    width:5rem;
    height:5rem;
    border-radius: 50%;
    margin-left: 30px;
    margin-top: 15px;
  }
  .home-car .info {
    margin-left: 40%;
  }
  .home-car .info p {
    width: 100%;
    margin-left: 8px;
    line-height: 25px;
  }
  .home-car .info .profile {
    width: 100%;
    margin-left:-1px;
    color: #bce8f1;
  }
  .home-car .info .profile ul li {
    float: left;
    width: 50%;
  }
  .home-cen{
    width: 100%;
    height: 19.875rem;
    -webkit-box-shadow: 0 0 6px rgba(218, 234, 244, .9);
    -moz-box-shadow: 0 0 6px rgba(218, 234, 244, .9);
    box-shadow: 0 0 6px rgba(218, 224, 244, .9);
    margin: 2.1875rem 0;
  }
  .home-title{ line-height:4.5rem; }
  .home-o-list{ line-height: 2.5rem; }

  .home-compay dd{
    float: left;
    font-size: 1.0rem;
    width: 60%;
    line-height: 2.4rem;
  }
  .home-title{
    line-height:2.5rem;
    font-size:1.7rem;
    font-weight:bold;
    width: 96%;
    margin: auto;
  }
  .home-title a{
    font-size:1.4rem !important;
  }
  .home-o-list{
    line-height: 2.5rem;
  }
  .car-lsit {
    width: 100%;
    margin-left: -9px;
  }
  .car-lsit li{
    width:45%;
    float: left;
  }
  .home-o-list h3{
    font-size: 1.87rem;
    font-weight:bold;
    font-family:'Source Han Sans CN Thin';
  }
  .home-org img{
    width:49%;
    margin-top:3.2rem;
  }

  .tab{
    color: #bcbbbb;
    padding: 5% 3% 0 3%;
    line-height: 2rem;}
  .tab img { width:1.8rem; height:1.8rem; }
  .home-o-list ul{
    padding:0 2%;
  }
  .home-font{
    font-weight: bold;
    font-size: 14px;
  }
</style>
