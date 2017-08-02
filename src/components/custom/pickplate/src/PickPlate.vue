<template>
<div class="dropdown plate" :value="value">
  <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" @click="onpick">
    {{currentValue}}
    <span class="caret"></span>
    <input type="hidden" v-model="currentValue">
  </button>
    <div class="plate province" v-show="showProvince">
        <div class="row">
            <div v-for="pro in provinces" :class="['col-xs-1', {'province-icon-atcive': pro === currentValue}]" @click="pickProvince(pro)"><a>{{pro}}</a></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'DlPickplate',
  data () {
    return {
      showProvince: false,
      currentValue: this.value,
      provinces: ['沪', '苏', '浙', '京', '津', '冀', '晋', '青', '蒙', '辽', '吉', '黑', '皖', '闽', '赣', '宁', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '甘', '渝', '川', '贵', '云', '藏', '陕', '新', '台']
    }
  },
  props: ['dlName', 'dlProvince', 'value'],
  mounted () {
    if (this.dlProvince) {
      this.currentValue = this.dlProvince
    }
  },
  watch: {
    currentValue (v) {
      this.$emit('input', v)
    }
  },
  methods: {
    async onpick () {
      this.showProvince = !this.showProvince
    },
    async pickProvince (pro) {
      this.currentValue = pro
      this.showProvince = !this.showProvince
    }
  }
}
</script>
<style>
.plate {
  width: 60px;
  float: right;
}

.plate .province {
  width: 100%;
  background: #edebec;
  border-bottom: 5px solid #eac97c;
  position: fixed;
  left: 0;
  bottom: 0;
  font-family: "Adobe \9ED1\4F53 Std R";
}
.plate .province div {
  background: url(./images/province-icon.png)no-repeat;
  text-align: center;
  line-height: 44px;
  display: block;
  background-size: contain;
  margin: 2% 1%;
  color: #fff;
  padding: 0px 10px;
}
</style>
