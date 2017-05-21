<template>
	<section>
		<!-- <mt-header fixed :title="this.$route.name"></mt-header> -->
		<div class="page">
			<div class="field-group">
				<mt-field label="姓名" type="text" v-model="form.name" disabled></mt-field>
				<mt-field label="手机号码" type="tel" v-model="form.mobile" disabled></mt-field>
				<mt-field label="邮箱" placeholder="尚未设置"  v-model="form.email"></mt-field>
				<mt-field label="QQ" placeholder="尚未设置" type="number" v-model="form.qq"></mt-field>
				<div class="border" @click="sheetVisible = true">
					<mt-cell title="性别">
					  <span>{{gender}}</span>
					</mt-cell>
				</div>
				<mt-field label="籍贯" placeholder="尚未设置" v-model="form.origin"></mt-field>
				<div class="border">
					<mt-field label="生日" v-model="form.birthday" disabled></mt-field>
				</div>
				<mt-field label="注册时间" v-model="form.createTime" disabled></mt-field>
			</div>
			<div class="field-group" style="margin-top: 30px">
				<mt-button type="primary" size="large" class="signup-button" @click.prevent="onSubmit">保存</mt-button>
			</div>
		</div>
		<mt-actionsheet
		  :actions="actions"
		  v-model="sheetVisible">
		</mt-actionsheet>
	</section>
</template>
<script>
import { getCustomerUserInfo, updateCustomerUserInfo } from '../api'
import Validate from '../assets/js/WxValidate'
export default {
	data () {
		return {
			form: {},
			sheetVisible: false,
			pickerVisible: false,
			actions: [
				{
					name: '男',
					method: this.sheetAction
				},
				{
					name: '女',
					method: this.sheetAction
				}
			]
		}
	},
	methods: {
		showToast (msg) {
			this.$toast({
			  message: msg,
			  duration: 2000
			})
		},
		getUserInfo () {
			let data = {
				customerSessionId: sessionStorage.getItem('sessionId')
			}
			getCustomerUserInfo(data).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.form = res.data.result
					console.log(this.form)
				} else {
					this.$toast({
						message: res.data.message
					})
				}
			})
		},
	  initValidate() {
	  	let self = this
	    this.validate = new Validate({
	      mobile: {
	        required: true,
	        tel: true, 
	      },
	      name: {
	        required: true,
	      },
	      qq: {
	        number: true,
	        minlength: 5
	      },
	      email: {
	        email: true
	      },
	    }, {
	      name: {
	        required: '请输入姓名'
	      },
	      qq: {
	        number: 'qq号输入不合法',
	        minlength: 'qq号输入不合法'
	      },
	    })
    },
    sheetAction (e) {
    	console.log(e)
    	this.form.gender = e.name === '男' ? 1 : 0
    },
		onSubmit () {
			if (!this.validate.checkForm(this.form)) {
	      const error = this.validate.errorList[0]
	      this.showToast(error.msg)
	      return false
	    }
	    let data = {
	    	mobile: this.form.mobile,
	      name: this.form.name,
	      qq: this.form.qq,
	      gender: this.form.gender,
	      email: this.form.email,
	      origin: this.form.origin,
	      customerSessionId: sessionStorage.getItem('sessionId')
	    }
	    console.log(data)
			updateCustomerUserInfo(data).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.showToast('修改成功')
					let result = res.data.result
					// this.$router.push({ path: '/index' })
				} else {
					this.showToast(res.data.message)
				}
			}).catch(function (error) {
        console.log(error)
      })
		}
	},
	computed: {
		gender () {
			return this.form.gender === 1 ? '男' : '女'
		}
	},
	mounted () {
		this.initValidate()
		this.getUserInfo()
	}
}
</script>
<style scoped>
	.border {
		border-bottom: 1px solid #ccc
	}
</style>