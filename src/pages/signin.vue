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
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form.mobile"></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.pass"></mt-field>
					<mt-button type="default" size="large" class="signin-button" @click.native="handleClick('signinForm')">登 录</mt-button>
				</form>
			</div>
			<div class="page-fd">
				<p class="text-center">
					<router-link to="/foo">忘记密码</router-link>|
    			<router-link to="/bar">短信验证登录</router-link>
				</p>
			</div>
		</div>
	</section>
</template>
<script>
import { requestLogin } from '../api'
import Md5 from '../assets/js/md5'
export default {
	data () {
		return {
			form: {
				mobile: '',
				pass: ''
		  },
			rules: {
				mobile: [
          { required: true, message: '请输入手机号' },
          { type: 'tel', message: '手机号码格式有误' }
        ],
        password: [
        	{ required: true, message: '请输入密码'},
        	{ min: 6, message: '密码长度在 6 到 20 位之间'}
        ]
			}
		}
	},
	methods: {
		showToast (msg) {
			this.$toast({
			  message: msg,
			  position: 'middle',
			  duration: 2000
			})
		},
		required (value) {
			return value.length > 0
		},
		tel(value) {
			return /^1[34578]\d{9}$/.test(value)
		},
		handleClick () {
			let mobile = this.form.mobile
			let password = this.form.pass
			if (!this.required(mobile)) {
				this.showToast(this.rules.mobile[0].message)
				return false
			} else if(!this.tel(mobile)) {
				this.showToast(this.rules.mobile[1].message)
				return false
			} else if (!this.required(password)) {
				this.showToast(this.rules.password[0].message)
				return false
			}
			let form = {
				mobile: mobile,
				pass: Md5.hex_md5(password)
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
		},
		validForm (rules) {
			let self = this
			for (let i in rules) {
				console.log(i, rules[i])

				for(let j = 0; j < rules[i].length; j++) {
					console.log(rules[i][j])
				}
			}
			this.$toast({
			  message: '密码长度在6到20位之间',
			  position: 'middle',
			  duration: 2000
			})
		}
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
		top: 10px;
		right: 10px;
		color: #fff;
	}
	.logo {
		padding: 20px;
	}
	.page-bd {
		padding: 15px;
		color: #fff;
	}
	.mint-cell {
		border-bottom: 1px solid #ddd;
		background: transparent;
	}
	.signin-button {
		margin-top: 30px;
	}
	.page-fd {
		position: absolute;
		bottom: 0;
		width: 100%;
		color: #fff;
	}
	.page-fd a {
		padding: 0 10px;
	}
</style>