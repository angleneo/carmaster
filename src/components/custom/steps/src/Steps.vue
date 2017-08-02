<template>
        <div class="processbar">
          <div class="car" :style="carStyle"></div>
          <div class="bar"></div>
          <div class="state" :style="stateStyle"></div>
          <div class="steps" >
            <ul>
              <li :class="['col-xs-4', {'active': this.dlIndex === 1}]">基本信息</li>
              <li :class="['col-xs-4', {'active': this.dlIndex === 2}]">选择品牌</li>
              <li :class="['col-xs-4', {'active': this.dlIndex === 3}]">完成</li>
            </ul>
          </div>
        </div>
</template>
<script>
export default {
  name: 'DlSteps',
  data () {
    return {
    }
  },
  props: ['dlIndex'],
  computed: {
    carStyle: function () {
      if (this.dlIndex === 0) {
        return 'left: 20%; transform: translate(-100%, 0%);'
      } else if (this.dlIndex === 1) {
        return 'left: 60%; transform: translate(-100%, 0%);'
      } else if (this.dlIndex === 2) {
        return 'left: 90%; transform: translate(-100%, 0%);'
      } else if (this.dlIndex === 3) {
        return 'left: 100%; transform: translate(-100%, 0%);'
      }
    },
    stateStyle: function () {
      if (this.dlIndex === 0) {
        return 'width: 20%;'
      } else if (this.dlIndex === 1) {
        return 'width: 60%;'
      } else if (this.dlIndex === 2) {
        return 'width: 90%;'
      } else if (this.dlIndex === 3) {
        return 'width: 100%;'
      }
    }
  },
  methods: {
    async cstyle () {
    },
    async sstyle () {
    }
  }
}
</script>
<style>
.processbar {
  position: relative;
  width: 90%;
  margin: 0 auto;
}
.processbar .bar {
  position: absolute;
  bottom: 25px;
  height: 10px;
  width: 100%;
  display: block;
  z-index: 100;
  background: #eeecec;
  border-radius: 8px;
}
.processbar .state {
  position: absolute;
  bottom: 25px;
  height: 10px;
  width: 20px;
  display: block;
  z-index: 101;
  border-radius: 8px;
  background: #F9C847;
}
.processbar .car {
  position: absolute;
  bottom: 35px;
  left: 0px;
  height: 22px;
  width: 65px;
  display: block;
  z-index: 102;
  background: url(./images/car-icon.png) no-repeat;
  background-size: auto 22px;
}
.processbar .steps {
  position: absolute;
  bottom: 5px;
  width: 90%;
  line-height: 15px;
}
 .steps ul li {
  font-size: 10px;
  color: #606060;
  text-align: center;
}
 .edit-list .steps li {
   width: 33.3333333333333333%;
   line-height: 1.5rem;
   position: relative;
   border-left: none;
   border-right: none;
   padding: 0 0;
   text-align: center;
   color:#999;
 }
.processbar .steps .active {
  color: #F9C847;
}
</style>
