<template>
    <div class="main">
       <div class="text-center order-y" v-if="bookResult">
        <img src="../assets/images/bg-appointment.png">
         <h2>您已经申请成功</h2>
         <h5>稍后会受到服务顾问的电话，请保持您的手机通畅。</h5>
         <button type="button" v-goto="'Home'" class="btn btn-default btn-color ">返回首页</button>
         <div class="color-g-b btn-m"><span class="color-red">{{t}}</span> 秒后返回</div>
       </div>
       <div class="text-center order-y" v-else>
      <img src="../assets/images/bg-appointment.png">
         <h2>您已经有一项订单正在申请中</h2>
         <h5>稍后会受到服务顾问的电话，请保持您的手机通畅。</h5>
         <button type="button" v-goto="'Home'" class="btn btn-default btn-color ">返回首页</button>
         <div class="color-g-b btn-m"><span class="color-red">{{t}}</span> 秒后返回</div>
       </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {oneStepService} from '@/service/order'
export default {
  data () {
    return {
      bookResult: true,
      t: 6
    }
  },
  computed: {
    ...mapState(['carinfo'])
  },
  mounted () {
    this.booking()
  },
  methods: {
    async countDown () {
      this.t--
      if (this.t <= 0) {
        window.location = '/ordermanagement'
      }
    },
    async booking () {
      if (this.carinfo) {
        let bres = await oneStepService(null, null, this.carinfo.carId)
        if (bres && bres.result === 0) {
          this.bookResult = true
        } else {
          this.bookResult = false
        }
      } else {
        this.$router.push({name: 'Home'})
      }
      setInterval(this.countDown, 1000)
    }
  }
}
</script>
<style>
  .order-y{
     padding:0 4%;
  }
</style>
