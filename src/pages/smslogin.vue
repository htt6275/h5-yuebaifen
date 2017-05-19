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
				<div class="field-group" style="margin-top: 20px" >
					<mt-button type="primary" size="large" @click.native="onSubmit">确定</mt-button>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { getRandomImage, getMobileSmsCode, loginBySmsCode } from '../api'
import Validate from '../assets/js/WxValidate'
export default {
	data () {
		return {
			form: {
				mobile: '',
	      inCode: '',
	      smsCode: '',
	      imgCodeUrl: '',
	      imgSessionId: ''
		  }
		}
	},
	methods: {
		showToast (msg) {
			this.$toast({
			  message: msg,
			  position: 'top',
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
	      }
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
	      }
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
	    }
	    console.log(form)
			loginBySmsCode(form).then(res => {
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
        smsType: 2,
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
</style>