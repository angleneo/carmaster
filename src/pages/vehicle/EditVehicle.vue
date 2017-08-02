<template>
    <div class="main">
        <div class="edit-list p-d">
            <ul>
              <li class="b-l">车牌号码:<input type="text" class="form-control  " :placeholder="carNumber" v-model="carNumber" ></li>
              <li class="b-l">车主姓名:<input type="text" class="form-control  " :placeholder="ownerName" v-model="ownerName"></li>
              <li class="b-l">行车里程:<a href="#" class="right img-m"><img src="../../assets/images/icon-right-arrow.png"></a><input style="width:68%;" type="text" class="form-control  " placeholder="" v-model="milage"> </li>
            </ul>
          </div>
          <div class="p-d text-center btn-m"><button type="button" @click="updateMilage" class="btn btn-primary btn-color ">完成</button></div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {readCar, updateCarMilage} from '@/service/vehicle'
export default {
  data () {
    return {
      carId: -1,
      ownerName: null,
      carNumber: null,
      milage: null
    }
  },
  computed: {
    ...mapState(['sessionkey'])
  },
  mounted () {
    this.carId = this.$route.params.carId
    this.getCarInfo()
  },
  methods: {
    async getCarInfo () {
      let carRes = await readCar(null, null, this.carId)
      if (carRes) {
        if (carRes.result === 0) {
          this.carId = carRes.data.carId
          this.ownerName = carRes.data.ownerName
          this.carNumber = carRes.data.carNumber
          this.milage = carRes.data.milage
        }
      } else {
        this.$toast.center('无法链接网络...')
      }
    },
    async updateMilage () {
      let uRes = await updateCarMilage(null, null, this.carId, this.milage)
      if (uRes && uRes.result === 0) {
        this.$router.push({name: 'VehicleManagement'})
      } else {
        this.$toast.center(uRes.desc)
      }
    }
  }
}
</script>
<style>
  .edit-list li input {
    width: 75%;
    float: right;
    border: none;
    margin-top: .49rem;
    box-shadow: none;
  }
  .img-m{
    margin-top: 5%;
  }
</style>
