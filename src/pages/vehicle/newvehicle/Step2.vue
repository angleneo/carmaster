<template>
      <div class="list-box">
        <dl-steps :dl-index=2 style="margin-top:70px;"></dl-steps>
        <div class="ppxx-choic">
          <!---------品牌选择页面---->
          <div class="tc-carpp" style="padding-top: 0px;">
            <!--热门品牌-->
            <div class="hot-pro">
              <h4>热门品牌</h4>
              <div class="hot-m">
                <div class="clear"></div>
                <ul>
                  <li v-for="bran in hotBrands"><a class="num_names"> <img :src="bran.imgUrl" > <span :id="bran.brandId">{{bran.brandName}}</span></a></li>
                </ul>
              </div>
            </div>
            <div class="clear"></div>
          <div class="sort_box_pp">
            <ul v-for="bg in brands">
              <li class="sort_group" :id="bg.groupChar">{{bg.groupChar}}</li>
              <li v-for="brand in bg.brands" @click="choosebrand(brand.brandId, brand.brandName)"><a href="#"><img :src="brand.imgUrl" > <span class="num_name" :id="brand.brandId">{{brand.brandName}}</span></a> </li>
            </ul>
        </div>
          <!--以上品牌列表-->
        <dl-charsearch></dl-charsearch>
      </div>
    </div>
</div>
</template>
<script>
import {getHotBrands, readCarBrandList} from '@/service/vehicle'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      hotBrands: [],
      brands: []
    }
  },
  mounted () {
    this.getHotBrands()
    this.getCarBrandList()
  },
  methods: {
    ...mapMutations(['NEW_CAR']),
    async getHotBrands () {
      let hbRes = await getHotBrands()
      if (hbRes && hbRes.result === 0) {
        this.hotBrands = hbRes.data.brands
      }
    },
    async getCarBrandList () {
      let cbRes = await readCarBrandList()
      if (cbRes && cbRes.result === 0) {
        this.brands = cbRes.data.brandGroups
      }
    },
    async choosebrand (brandId, brandName) {
      let car = {}

      car = {
        brandId: brandId,
        brandName: brandName
      }

      this.NEW_CAR(car)

      this.$router.push({
        name: 'Step21',
        params: {brandId: brandId}
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
 .hot-m li img{width: 35%; display: block; margin: 0 auto;}
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
    color: #333333;
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
  .sort_box_pp li span{ line-height:3.6rem; margin-left:5px;}
  .sort_box_pp li a {display: block;}
  .sort_box_pp li a:visited {color:#333333}
  .sort_box_pp li img{margin: auto 0;  width: 30px; float:left; line-height: 43px;}
</style>
