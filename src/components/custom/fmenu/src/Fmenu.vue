<template>
  <div class="footer">
      <ul class="clearfix">
          <li>
              <a @click="goto('Home')" :class="{'active': this.dlIndex == 1}">
                  <span v-if="this.dlIndex == 1"><img src="./images/icon-home-selected.png"></span>
                  <span v-else><img src="./images/icon-home.png"></span>
                  <span>首页</span>
              </a>
          </li>
          <li>
              <a @click="goto('VehicleManagement')" :class="{'active': this.dlIndex == 2}">
                  <span v-if="this.dlIndex == 2"><img src="./images/icon-order-m-selected.png"></span>
                  <span v-else><img src="./images/icon-order-m.png"></span>
                  <span>车辆管理</span>
              </a>
          </li>
          <li>
              <a @click="goto('OrderMentaining')" :class="{'active': this.dlIndex == 3}">
                  <span v-if="this.dlIndex == 3"><img src="./images/icon-order-selected.png"></span>
                  <span v-else><img src="./images/icon-order.png"></span>
                  <span>订单</span>
              </a>
          </li>
            <li>
              <a @click="goto('MyCenter')"  :class="{'active': this.dlIndex == 4}">
                  <span v-if="this.dlIndex == 4"><img src="./images/icon-my-selected.png"></span>
                  <span v-else><img src="./images/icon-my.png"></span>
                  <span>我的</span>
              </a>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'dlMenu',
  props: ['dlIndex'],
  methods: {
    async goto (name) {
      this.$router.push({name: name})
    }
  }
}
</script>
