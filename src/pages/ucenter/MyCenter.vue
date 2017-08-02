<template>
    <div class="main">
      <div class="container-fluid">
        <div class="ures-bg text-center p-r">
          <div class="p-a cen-head">
             <h3>个人中心</h3>
             <span ><img src="../../assets/images/top-portrait.png"></span>
             <p class="color-g-h03">{{userinfo.phoneNumber}}</p>
          </div>

        </div>
        <div class="edit-list ">
          <ul class="list-group">
            <li class="list-group-item b-l" v-goto="'OrderManagement'"><a>我的订单<img class="right img-m01 " src="../../assets/images/icon-right-arrow.png"></a></li>
            <li class="list-group-item b-l" v-goto="'VehicleManagement'"><a>我的车辆<img class="right img-m01 " src="../../assets/images/icon-right-arrow.png"></a></li>
            <li class="list-group-item b-l" v-goto="'EditMyInfo'"><a>个人信息<img class="right img-m01 " src="../../assets/images/icon-right-arrow.png"></a></li>
          </ul>
        </div>
      </div>
      <dl-menu dl-index=4></dl-menu>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['userinfo'])
  }
}
</script>
