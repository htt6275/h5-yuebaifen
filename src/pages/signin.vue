<template>
	<section>
		<!-- <mt-header fixed :title="this.$route.name"></mt-header> -->
		<div class="page">
			<div class="page-hd">
				<router-link to="/signup" class="signup-link">注册</router-link>
				<p class="logo"><img src="../assets/img/yue_logo.png"></p>
			</div>
			<div class="page-bd">
				<form name="signinForm">
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" class="icon_phone" v-model="form.mobile"></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" class="icon_pass" v-model="form.pass"></mt-field>
					<mt-button type="default" size="large" class="signin-button" @click.native="onSubmit">登 录</mt-button>
				</form>
			</div>
			<div class="page-ft">
				<p class="text-center">
					<router-link to="/resetpass">忘记密码</router-link>|
    			<router-link to="/smsLogin">短信验证登录</router-link>
				</p>
			</div>
		</div>
	</section>
</template>
<script>
import { requestLogin } from '../api'
import Validate from '../assets/js/WxValidate'
import Md5 from '../assets/js/md5'
export default {
	data () {
		return {
			form: {
				mobile: '',
				pass: ''
		  }
		}
	},
	methods: {
		showToast (error) {
			this.$toast({
			  message: error.msg,
			  // position: 'middle',
			  duration: 1000
			})
		},
		initValidate() {
	    this.validate = new Validate({
	      mobile: {
	        required: true,
	        tel: true, 
	      },
	      pass: {
	        required: true,
	        minlength: 6 
	      }
	    }, {
	      mobile: {
	        required: '请输入手机号',
	        tel: '请输入正确手机号'
	      },
	      pass: {
	        required: '请输入密码',
	        minlength: '密码不少于6位'
	      },
	    })
    },
		onSubmit () {
			if (!this.validate.checkForm(this.form)) {
	      const error = this.validate.errorList[0]
	      this.showToast(error)
	      return false
	    }
	    let form = {
	    	mobile: this.form.mobile,
	    	pass: this.form.pass
	    }
			requestLogin(form).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.showToast('登录成功')
					let result = res.data.result
					console.log(result.customerSessionId)
					console.log(result.customerUser)
					sessionStorage.setItem('sessionId', result.customerSessionId)
					sessionStorage.setItem('user', result.customerUser)
					this.$router.push({ path: '/index' })
				} else {
					this.showToast(res.data.message)
				}
			})
			.catch(function (error) {
        console.log(error)
      })
		}
	},
	mounted () {
		this.initValidate()
	}
}
</script>
<style scoped>
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/img/sign_bg.png) no-repeat;
		background-size: cover;
	}
	.signup-link {
		position: absolute;
		top: 5px;
		right: 5px;
		padding: 10px;
		color: #fff;
	}
	.logo {
		padding: 20px;
		text-align: center
	}
	.page-bd {
		padding: 15px;
		color: #fff;
	}
	.signin-button {
		margin-top: 30px;
		color: #00b4e7;
		background: #fff
	}
	.signin-button:focus {
		background: #fff
	}
	.page-ft {
		position: absolute;
		bottom: 0;
		width: 100%;
		color: #ddd;
		font-size: 14px
	}
	.page-ft a {
		padding: 0 10px;
	}
</style>