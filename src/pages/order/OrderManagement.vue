<template>
    <div class="main">
      <div class="btn-color p-d order-search p-r" style="width:100%;">
        <img src="../../assets/images/icon-search.png" class="p-s p-a">
        <input type="text" class="form-control p-r" placeholder="请输入车牌号" aria-describedby="sizing-addon1">
      </div>
      <div class="order-box01 p-d">

        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="{'active': ot === 'm'}"><a aria-controls="home" @click="showorder('m')" role="tab" data-toggle="tab">待处理</a></li>
          <li role="presentation" :class="{'active': ot === 'c'}" style="border-right: none;"><a  @click="showorder('c')" aria-controls="profile" role="tab" data-toggle="tab" >已完成</a></li>
        </ul>
          <router-view></router-view>
      </div>
      <dl-menu dl-index=3></dl-menu>
    </div>
</template>
<script>
export default {
  data () {
    return {
      ot: 'm'
    }
  },
  mounted () {
    this.$router.push({name: 'OrderMentaining'})
  },
  methods: {
    async showorder (t) {
      if (t === 'm') {
        this.$router.push({name: 'OrderMentaining'})
        this.ot = 'm'
      } else {
        this.ot = 'c'
        this.$router.push({name: 'OrderCompleted'})
      }
    }
  }
}
</script>
