<template>
<div class="list-box">
  <dl-steps :dl-index=2 style="margin-top:70px;"></dl-steps>
  <div class="clear"></div>
  <div class="sort_box_pp">
    <ul v-for="cls in carLines">
      <li class="sort_group">{{cls.producer}}</li>
      <li v-for="line in cls.lines" @click="chooseline(line.lineId, line.lineName)"><a href="#"> <span class="num_name" :id="line.lineId">{{line.lineName}}</span></a> </li>
    </ul>
  </div>
</div>
</template>
<script>
import {readCarLineList} from '@/service/vehicle'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      brandId: -1,
      carLines: []
    }
  },
  mounted () {
    this.brandId = this.$route.params.brandId
    this.getCarLines()
  },
  methods: {
    ...mapMutations(['NEW_CAR']),
    async getCarLines () {
      let clRes = await readCarLineList(this.brandId)
      if (clRes && clRes.result === 0) {
        this.carLines = clRes.data.lineGroups
      }
    },
    async chooseline (lineId, lineName) {
      let car = {}

      car = {
        lineId: lineId,
        lineName: lineName
      }

      this.NEW_CAR(car)

      this.$router.push({
        name: 'Step22',
        params: {lineId: lineId, brandId: this.brandId}
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
