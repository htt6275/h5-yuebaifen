<template>
	<section>
		<!-- <mt-header fixed :title="this.$route.name"></mt-header> -->
		<div class="page">
			<form name="signupForm" class="signup-form">
				<div class="field-group">
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form.mobile"></mt-field>
					<mt-field label="图片验证码" placeholder="图片验证码" type="number" v-model="form.inCode">
						<img :src="form.imgCodeUrl" alt="图片验证码" class="img-code" @click="changeImgCode">
					</mt-field>
					<mt-field label="短信验证码" placeholder="短信验证码" type="number" v-model="form.smsCode">
						<mt-button type="primary" size="small" @click="getSmsCode">获取验证码</mt-button>
					</mt-field>
				</div>
				<div class="field-group">
					<mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="form.name"></mt-field>
					<mt-field label="身份证号" placeholder="填写有误将影响分期申请" type="text" v-model="form.cardNo"></mt-field>
					<mt-field label="QQ" placeholder="（选填）" type="number" v-model="form.qq"></mt-field>
					<mt-field label="邮箱" placeholder="（选填）" type="text" v-model="form.email"></mt-field>
					<mt-field label="设置密码" placeholder="6-20位数字和字母组合" type="password" v-model="form.pass"></mt-field>
					<mt-field label="确认密码" placeholder="确认密码" type="password" v-model="form.pass2"></mt-field>
				</div>
				<div class="field-group">
					<div class="clearfix">
						<mt-checklist
						  v-model="form.agree"
						  :options="['同意']">
						</mt-checklist>
						<router-link to="/agreement" class="server-link">《服务与隐私协议》</router-link>
					</div>
					<mt-button type="primary" size="large" class="signup-button" @click.prevent="onSubmit">立即注册</mt-button>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { getRandomImage, getMobileSmsCode, requestRegister } from '../api'
import Validate from '../assets/js/WxValidate'
import Md5 from '../assets/js/md5'
export default {
	data () {
		return {
			form: {
				mobile: '',
	      inCode: '',
	      smsCode: '',
	      imgCodeUrl: '',
	      imgSessionId: '',
	      name: '',
	      cardNo: '',
	      qq: '',
	      email: '',
	      pass: '',
	      pass2: '',
	      agree: []
		  }
		}
	},
	methods: {
		showToast (msg) {
			this.$toast({
			  message: msg,
			  duration: 2000
			})
		},
	  initValidate() {
	  	let self = this
	    this.validate = new Validate({
	      mobile: {
	        required: true,
	        tel: true, 
	      },
	      inCode: {
	        required: true,
	      },
	      smsCode: {
	        required: true,
	      },
	      name: {
	        required: true,
	      },
	      cardNo: {
	        required: true,
	        idcard: true
	      },
	      qq: {
	        number: true,
	        minlength: 5
	      },
	      email: {
	        email: true
	      },
	      pass: {
	        required: true,
	        password: true
	      },
	      pass2: {
	        required: true,
	        equalTo: 'pass'
	      },
	      agree: {
	        required: true
	      },
	    }, {
	      mobile: {
	        required: '请输入手机号',
	        tel: '请输入正确手机号'
	      },
	      inCode: {
	        required: '请输入图形验证码'
	      },
	      smsCode: {
	        required: '请输入短信验证码'
	      },
	      name: {
	        required: '请输入姓名'
	      },
	      cardNo: {
	        required: '请输入身份证号'
	      },
	      qq: {
	        number: 'qq号输入不合法',
	        minlength: 'qq号输入不合法'
	      },
	      pass: {
	        required: '请设置密码',
	        password: '密码在 6 到 20 位之间，只能是字母和数字的组合'
	      },
	      pass2: {
	        required: '请再次输入密码',
	        equalTo: '两次密码输入不一致'
	      },
	      agree: {
	        required: '请同意服务与隐私协议'
	      },
	    })
	    this.validate.addMethod('password', (value, param) => {
	      return this.validate.optional(value) || (value.match(/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/))
	    })
    },
		onSubmit () {
			if (!this.validate.checkForm(this.form)) {
	      const error = this.validate.errorList[0]
	      this.showToast(error.msg)
	      return false
	    }
	    let form = {
	    	mobile: this.form.mobile,
	      inCode: this.form.inCode,
	      smsCode: this.form.smsCode,
	      imgSessionId: this.form.imgSessionId,
	      name: this.form.name,
	      cardNo: this.form.cardNo,
	      qq: this.form.qq,
	      email: this.form.email,
	      pass: Md5.hex_md5(this.form.pass),
	    }
	    console.log(form)
			requestRegister(form).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.showToast('注册成功')
					let result = res.data.result
					console.log(result.customerSessionId)
					console.log(result.customerUser)
					sessionStorage.setItem('sessionId', result.customerSessionId)
					sessionStorage.setItem('user', result.customerUser)
					this.$router.push({ path: '/index' })
				} else {
					this.showToast(res.data.message)
				}
			}).catch(function (error) {
        console.log(error)
      })
		},
		changeImgCode () {
			let self = this
			getRandomImage().then(res => {
				// console.log(res)
				if(res.data.code === 0) {
					let result = res.data.result
					self.form.imgCodeUrl = 'data:image/png;base64,'+result.imgBase64
					self.form.imgSessionId = result.imgSessionId
				}
			})
		},
	  checkEmpty(value) {
	    return value.replace(/(^\s*)|(\s*$)/g, '')
	  },
	  checkTel(value) {
	    return /^1[34578]\d{9}$/.test(value)
	  },
		getSmsCode () {
			let self = this
			let mobile = this.form.mobile
			let inCode = this.form.inCode
			let imgSessionId = this.form.imgSessionId
			if (!this.checkEmpty(mobile)) {
				this.showToast('请输入手机号')
				return false
			} else if (!this.checkTel(mobile)) {
				this.showToast('请输入正确手机号')
				return false
			} else if (!this.checkEmpty(inCode)) {
				this.showToast('请输入图形验证码')
				return false
			}
			let data = {
        mobile: mobile,
        inCode: inCode,
        smsType: 1,
        imgSessionId: imgSessionId
      }
			getMobileSmsCode(data).then(res => {
				// console.log(res)
				if(res.data.code === 0) {
					self.showToast('短信验证码已发送，注意查收')
				} else {
					self.showToast(res.data.message)
					self.changeImgCode()
				}
			})
		}
	},
	mounted () {
		this.initValidate()
		this.changeImgCode()
	}
}
</script>
<style scoped>
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #f2f3f4;
	}
	.mint-checklist, .server-link {
		float: left;
	}
	.server-link {
		color: #34c1ea;
	}
	.server-link,
	.signup-button {
		margin-top: 10px;
	}
</style>