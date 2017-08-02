<template>
    <div class="main" v-title data-title="我的车辆">
      <div class="order-box p-d">
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" >
                <div class="card-box p-d p-r" v-for="car in cars">
                  <h4 class="left color-g-b"><b>{{car.carNumber}}</b></h4>
                  <span class="right img-m01">
                    <img src="../../assets/images/icon-right-arrow.png">
                  </span>
                  <div class="clear"></div>
                  <div class="card-list">
                    <ul>
                      <li>车主姓名：{{car.ownerName}}</li>
                      <li >车牌型号:{{car.modelName}}</li>
                      <li >车辆里程数:{{car.milage}}公里</li>
                      <li ><ins>车辆保养记录：{{car.maintainCount}}次</ins></li>
                    </ul>
                  </div>
                  <div class="v-del">
                    <ul>
                      <li><a href="#" class="color-g-h04"><img src="../../assets/images/icon-del.png">删除</a>  </li>
                      <li><a v-goto="'EditVehicle'" data-key="carId" :data-value="car.carId" class="color-orange"><img src="../../assets/images/icon-edit.png">编辑</a></li>
                    </ul>
                  </div>
                </div>
            </div>
            <div class="v-add color-orange" v-goto="'Step1'"><img src="../../assets/images/icon-v-add.png">添加车辆</div>
        </div>
      </div>
      <dl-menu dl-index=2></dl-menu>
    </div>
</template>
<script>
import {userCars} from '../../service/vehicle'
export default {
  data () {
    return {
      cars: [],
      carCount: 0
    }
  },
  computed: {
  },
  mounted () {
    this.getUserCars()
  },
  methods: {
    async getUserCars () {
      let carRes = await userCars()
      if (carRes) {
        if (carRes.result === 0) {
          this.carCount = carRes.data.count
          this.cars = carRes.data.cars
        } else {
          this.$toast.center(carRes.desc)
        }
      } else {
        this.$toast.center('无法链接网络...')
      }
    }
  }
}
</script>
<style>
  .order-box {
    width: 100%;
    margin-bottom: 5rem;
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

  .img-m01{
    position: absolute;
    right: 7%;
    top:8%;
    width: 14px;
    height: 14px;
  }
</style>
