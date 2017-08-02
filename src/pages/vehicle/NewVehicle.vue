<template>
  <div class="main">
    <div class="container-fluid">
<!----------------------------进度条------------------------------>
      <router-view></router-view>

      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {createCar} from '@/service/vehicle'
export default {
  data () {
    return {
      province: '京',
      carPlate: null,
      ownerName: null,
      milage: null
    }
  },
  computed: {
    ...mapState(['newcar', 'newcarstep'])
  },
  methods: {
    ...mapMutations(['NEW_CAR_1']),
    async new_car () {
      let car = {}

      if (this.newcarstep === 1) {
        car = {
          ownerName: this.ownerName,
          carPlate: this.carPlate,
          milage: this.milage,
          province: this.province
        }

        this.NEW_CAR_1(car)
        this.$router.push({name: 'Step2'})
      } else if (this.newcarstep === 2) {
        car = {
          ownerName: this.ownerName,
          carPlate: this.carPlate,
          milage: this.milage,
          province: this.province
        }

        this.NEW_CAR_2(car)
        this.btn = '完成'
        this.$router.push({name: 'Step3'})
      } else if (this.newcarstep === 3) {
        let res = await createCar(null, null, this.newcar.ownerName, this.newcar.brandId, this.newcar.brandName, this.newcar.carNumber, this.newcar.lineId, this.newcar.lineName, this.newcar.milage, this.newcar.modelId, this.newcar.modelName)
        if (res) {
          if (res.result === 0) {
            this.$toast(res.desc)
            this.$router.push({name: 'Home'})
          }
        } else {
          this.$toast('无法链接网络...')
        }
      }
    }
  }
}
</script>
