<template>
			<div :class="['stars', 'star' + star]">
        <input type='hidden' name='star' :value='star'>
				<i class='fa fa-star star s1'></i><i class='fa fa-star star s2'></i><i class='fa fa-star star s3'></i><i class='fa fa-star star s4'></i><i class='fa fa-star star s5'></i>
			</div>
</template>
<script>
export default {
  name: 'DlStar',
  data () {
    return {
      star: this.value
    }
  },
  mounted () {

  },
  props: ['value'],
  watch: {
    star (v) {
      this.$emit('input', v)
    }
  },
  methods: {
    async onclick (id) {
      this.star = id
    }
  }
}
</script>
<style>
.stars {
  display: block;
  position: relative;
  height: 25px;
  line-height: 25px;
  margin-top:6px;
}
.stars .fa{
  float: left;
	font-size:17px;
	color: #F28D01;
	padding: 0px 5px 0px 0px;
}

.star1 .s2:before,
.star1 .s3:before,
.star1 .s4:before,
.star1 .s5:before,
.star2 .s3:before,
.star2 .s4:before,
.star2 .s5:before,
.star3 .s4:before,
.star3 .s5:before,
.star4 .s5:before{
	content: "\f006"
}
</style>
