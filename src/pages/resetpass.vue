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
					<mt-field label="新密码" placeholder="6-20位数字和字母组合" type="password" v-model="form.newPassword"></mt-field>
					<mt-field label="确认密码" placeholder="确认密码" type="password" v-model="form.confirmPass"></mt-field>
				</div>
				<div class="field-group" style="margin-top: 20px" >
					<mt-button type="primary" size="large" @click.prevent="onSubmit">确定</mt-button>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { getRandomImage, getMobileSmsCode, resetPassword } from '../api'
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
	      newPassword: '',
	      confirmPass: ''
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
	      },
	      newPassword: {
	        required: true,
	        password: true
	      },
	      confirmPass: {
	        required: true,
	        equalTo: 'newPassword'
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
	      newPassword: {
	        required: '请设置密码',
	        password: '密码在 6 到 20 位之间，只能是字母和数字的组合'
	      },
	      confirmPass: {
	        required: '请再次输入密码',
	        equalTo: '两次密码输入不一致'
	      }
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
	      newPassword: Md5.hex_md5(this.form.newPassword),
	    }
	    console.log(form)
			resetPassword(form).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.showToast('修改成功')
					this.$router.push({ path: '/signin' })
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
        smsType: 3,
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