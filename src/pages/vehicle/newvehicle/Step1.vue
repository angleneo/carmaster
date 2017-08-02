<template>
    <div class="edit-list">
      <dl-steps :dl-index=1 style="margin-top:70px;"></dl-steps>
      <ul class="list-group">
        <li class="list-group-item b-l">车牌号码:<input style="width: 60%;" type="text" class="form-control" v-model="carPlate"><dl-pickplate v-model="province"></dl-pickplate>
        </li>
        <div class="clear"> </div>
        <li class="list-group-item b-l font12">车主姓名:<input style="width: 79%; " type="text" class="form-control  " placeholder="请输入你的名字" v-model="ownerName"> </li>
        <div class="clear"> </div>
        <li class="list-group-item b-l font12">行车公里:<input style="width: 79%; " type="text" class="form-control  " placeholder="请输入已行驶公里数" v-model="milage"></li>
        <div class="clear"> </div>
      </ul>
       <div class="p-d text-center btn-m"><button type="button" @click="new_car" class="btn btn-primary btn-color ">下一步</button></div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
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
    ...mapState(['newcar'])
  },
  mounted () {
    if (this.newcar) {
      this.province = this.newcar.province
      this.carPlate = this.newcar.carPlate
      this.ownerName = this.newcar.ownerName
      this.milage = this.newcar.milage
    }
  },
  methods: {
    ...mapMutations(['NEW_CAR']),
    async new_car () {
      let car = {}

      car = {
        ownerName: this.ownerName,
        carPlate: this.carPlate,
        milage: this.milage,
        province: this.province
      }
      this.NEW_CAR(car)
      this.$router.push({name: 'Step2'})
    }
  }
}
</script>
