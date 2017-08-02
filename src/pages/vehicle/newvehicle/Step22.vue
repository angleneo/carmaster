<template>
<div class="list-box">
  <dl-steps :dl-index=2 style="margin-top:70px;"></dl-steps>
  <div class="clear"></div>
  <div class="sort_box_pp">
    <ul v-for="cms in carModels">
      <li class="sort_group">{{cms.yearName}}</li>
      <li v-for="m in cms.models" @click="choosemodel(m.modelId, m.modelName)"><a href="#"> <span class="num_name" :id="m.modelId">{{m.modelName}}</span></a> </li>
    </ul>
  </div>
</div>
</template>
<script>
import {readCarModelList} from '@/service/vehicle'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      brandId: -1,
      lineId: -1,
      carModels: []
    }
  },
  mounted () {
    this.brandId = this.$route.params.brandId
    this.lineId = this.$route.params.lineId
    this.getCarModels()
  },
  methods: {
    ...mapMutations(['NEW_CAR']),
    async getCarModels () {
      let clRes = await readCarModelList(this.brandId, this.lineId)
      if (clRes && clRes.result === 0) {
        this.carModels = clRes.data.modelGroups
      }
    },
    async choosemodel (modelId, modelName) {
      let car = {}

      car = {
        modelId: modelId,
        modelName: modelName
      }

      this.NEW_CAR(car)

      this.$router.push({
        name: 'Step3'
      })
    }
  }
}
</script>
<style>
  .hot-pro {
    width: 100%;
    padding: 3px;
   }
  .hot-m {
    display: inline-block;
    padding-bottom:1rem;
    border-top:1px solid #dbdbdb;
  }
  .hot-m ul {
    padding: 5px;
    list-style: none;
    padding:0; /* 将默认的内边距去掉 */
  }
  .hot-m li {
    display: inline;
    width: 25%;
    float: left;
    margin-top: 1rem;
    text-align: center;
  }
  .hot-pro h4{
    line-height: 2.5rem;
  }
  .hot-m li a {
    height:  70%;
    display: block;
    margin: 0 auto;
  }
 .hot-m li img{width: 70%; display: block; margin: 0 auto;}
 .hot-m li span {
   display: block;
   margin: 0 auto;
   line-height: 15px;
  font-family: Arial,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,Sans-serif;
 }
 .sort_box_pp {
  border-top: 1px solid #dbdbdb;
 }
  .sort_box_pp .sort_group {
    padding: 0.1rem 2rem;
    color: #787878;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    background: #F5F5F5;
  }
  .sort_box_pp li{
    padding:0.5rem 1.9rem;
    position: relative;
    border-bottom: 1px solid #ddd;
    text-align: left;
    font-size: 1.6rem;
    line-height: 1.5rem;
  }
  .sort_box_pp li span{ line-height:3.6rem;}
  .sort_box_pp li img{ width:35%; float:left}
</style>
