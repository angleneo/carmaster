<template>
    <div class="main">
      <div class="order-box p-d">
          <div class="card-box p-d">
            <h4 class="left color-g-b" ><b>车牌号:{{carinfo.carNumber}}</b></h4>
            <div class="clear"></div>
            <div class="card-list">
              <ul>
                <li>车主姓名：{{carinfo.ownerName}}</li>
                <li class="list-o"><nobr >品牌型号:{{carinfo.carModel}}</nobr></li>
                <li>车辆里程数:{{carinfo.milage}}公里</li>
                <li>车辆保养记录：{{carinfo.maintainCount}}次</li>
              </ul>
            </div>
          </div>
          <!---------------------------->
          <div class="card-box p-d p-r" v-for="file in files">
            <h4 class="left color-g-b" ><b>维修时间:{{file.carsorderTime}}</b></h4>
            <h4 class="left color-g-b" ><b>门店：{{file.factoryName}}</b></h4>
            <div class="clear"></div>
            <div class="details-text b-top">
              <div class="table b-l">
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
                  <tr>
                    <td>{{file.items.itemName}}</td>
                    <td>{{file.items.itemCount}}</td>
                    <td>{{file.items.itemFee}}</td>
                    <td>10.00</td>
                  </tr>
                 
                  <tr>
                    <td style="line-height: 2.2rem;">百希特润滑油103_TG838_SN_5W-40(4L)</td>
                    <td>1</td>
                    <td>90.00</td>
                    <td>10.00</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="clearflx"></div>
                <ul>
                  <li>优惠金额 <span class="color-red right"> {{files.discount | money}}</span></li>
                  <li>合计金额 <span class="color-red right"> {{files.totalAmount | money}}</span></li>
                  <!--<li >车主姓名：{{file.ownerName}}</li>
                      <li class="list-o"><nobr >品牌型号:{{file.carModel}}</nobr></li>
                      <li >车辆里程数:{{file.milage}}公里</li>
                      <li>车辆保养记录：{{file.maintainCount}}次</li>-->
                </ul>
            <div class="card-box-arr p-a"></div>
            <div class="card-box-arr01 p-a"></div>
          </div>
      </div>
    </div>
  </div>
</template>
<style>
  .order-box li {
    width: 100%;
    border: none;
    /* border-right: 2px solid #1aaae6; */
    text-align: left;
    padding-right: 7.5%;
    padding-left:4%;
  }
  .card-box-arr {
    border: 10px solid #fff;
    border-left-color: #d4e7f5;
    width: 0;
    height: 0;
    top: 15%;
    left: 0;
    z-index: -1;
  }
  .card-box-arr01 {
    border: 10px solid #fff;
    border-right-color: #d4e7f5;
    width: 0;
    height: 0;
    top: 15%;
    right: 0;
    z-index: -1;
  }
  .card-list li{
    padding-left:0 !important;
  }
  .card-box h4 {
    font-weight: bold;
    line-height: 3.0rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.5rem;
  }
  .v-del{

    text-align: right;
    line-height: 3.2rem;
    width: 100%;
  }
  .v-del li{
    width: 22%;
    text-align: right;
    float: right;
    line-height: 2.2rem;
  }
  .card-box h4{
    width:100%;
    display:block;
    font-weight: bold;
    line-height: 3.0rem  ;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<script>
import {readRepairHistory} from '@/service/vehicle'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      count: 10,
      page: 1,
      files: []
    }
  },
  computed: {
    ...mapState(['carinfo'])
  },
  mounted () {
    this.getUserwx()
  },
  methods: {
    ...mapMutations(['USER_LOGIN', 'USER_CARS', 'CAR_INFO']),

    async getUserwx () {
      // 查询维修档案
      // userId, phoneNumber, carId, page, count
      let res = await readRepairHistory(null, null, this.carinfo.carId, 1, 10)
      if (res && res.result === 0) {
        this.files = res.data.orders
        console.log(this.files)
      }
    }
  }
}
</script>
