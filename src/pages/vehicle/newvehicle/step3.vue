<template>
    <div class="edit-list">
      <dl-steps :dl-index=3 style="margin-top:80px;"></dl-steps>
        <ul class="list-group">
          <li class="list-group-item b-l">{{this.carNumber}}
            </li>
          <li class="list-group-item b-l">车主姓名: {{this.newcar.ownerName}} </li>
          <li class="list-group-item b-l">车辆品牌: {{this.newcar.brandName}} </li>
          <li class="list-group-item b-l">车辆车系: {{this.newcar.lineName}} </li>
          <li class="list-group-item b-l">车辆车型: {{this.newcar.modelName}}</li>
          <li class="list-group-item b-l">行驶公里: {{this.newcar.milage}}公里</li>
        </ul>
         <div class="p-d text-center btn-m"><button type="button" @click="newCar" class="btn btn-primary btn-color ">完 成</button></div>
    <!-- <div class="text-center"><a href="#">联系客服</a></div>-->
    </div>
</template>

<script>
import {createCar} from '@/service/vehicle'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      brandId: -1,
      lineId: -1,
      carModels: []
    }
  },
  computed: {
    ...mapState(['newcar']),
    carNumber: function () { return this.newcar.province + this.newcar.carPlate }
  },
  methods: {
    async newCar () {
      let clRes = await createCar(
        null,
        null,
        this.newcar.ownerName,
        this.newcar.brandId,
        this.newcar.brandName,
        this.carNumber,
        this.newcar.lineId,
        this.newcar.lineName,
        this.newcar.milage,
        this.newcar.modelId,
        this.newcar.modelName
      )
      this.$toast.center(clRes.desc)
      if (clRes && clRes.result === 0) {
        this.$router.push({name: 'VehicleManagement'})
      } else {
        this.$router.push({name: 'Step1'})
      }
    }
  }
}
</script>
