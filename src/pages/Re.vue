<template>

</template>
<script>
  import {userInfo} from '@/service/user'
  import {userCars, getActiveCar} from '@/service/vehicle'
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
      let rn = this.$route.params.name
      if (rn && rn.toLowerCase() === 'order') {
        this.$router.push({name: 'OrderDetail', params: {orderid: this.$route.params.id}})
      } else if (rn && rn.toLowerCase() === 'test') {
        this.$router.push({name: 'Test'})
      } else {
        this.$router.push({name: 'Home'})
      }
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
      }
    }
  }
</script>
