<template>
	<div class="main">
		<form class="form-horizontal">
			<div class="ures-bg text-center p-r">
				<div class="p-a cen-head">
					 <h3>个人中心</h3>
					 <span ><img src="../../assets/images/top-portrait.png"></span>
					 <p class="color-g-h03">{{userinfo.phoneNumber}}</p>
				</div>
			</div>

			<div class="edit-list">
				<ul class="list-group">
				  <li class="list-group-item b-l">账号:<input type="text" class="form-control  " :placeholder="userinfo.phoneNumber"></li>
				  <li class="list-group-item b-l">姓名:<input type="text" class="form-control  " :placeholder="userinfo.userName" v-model="userinfo.userName"></li>
				  <li class="list-group-item b-l" style="    vertical-align: middle;">性别:
            <span style="width:30%;vertical-align:middle;">
              <label class="radio-inline"  style="width: 1%; vertical-align:-1px;">
                  <input type="radio" id="inlineCheckbox2" v-model="userinfo.userSex" value="0" name="userinfo.userSex" style="  margin-top:2 .5rem;"> 男
                </label>
              <label class="radio-inline" style="width: 15%; vertical-align:-1px;">
                <input type="radio" id="inlineCheckbox1" v-model="userinfo.userSex" value="1" name="userinfo.userSex" style="width: 35%; margin-top:.6rem;"> 女
              </label>
            </span>


				  </li>
				</ul>
			</div>

	    <div class="p-d text-center btn-m"><button type="button" class="btn btn-primary btn-color " @click='saveModify'>保存修改</button></div>
	  </form>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import {userEdit} from '@/service/user'
export default {
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.userinfo)
  },
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    async saveModify () {
    // userId, phoneNumber, userName, userSex
      let res = await userEdit(this.userinfo.userId, this.userinfo.phoneNumber, this.userinfo.userName, this.userinfo.userSex)
      if (res && res.result === 0) {
        this.$toast.center('修改成功!')
        this.$router.push({name: 'MyCenter'})
      } else {
        this.$toast.center('修改失败!')
      }
    }
  }
}
</script>
<style>
</style>
