<template>
	<section>
		<!-- <mt-header fixed :title="this.$route.name"></mt-header> -->
		<div class="page">
			<form name="signupForm" class="signup-form">
				<div class="field-group">
					<mt-field label="原密码" placeholder="输入原密码" type="password" v-model="form.oldPassword"></mt-field>
					<mt-field label="新密码" placeholder="6-20位数字和字母组合" type="password" v-model="form.newPassword"></mt-field>
					<mt-field label="确认密码" placeholder="确认密码" type="password" v-model="form.confirmPass"></mt-field>
				</div>
				<div class="field-group" style="margin-top: 20px" >
					<mt-button type="primary" size="large" @click.native="onSubmit">确定</mt-button>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { modifyPassword } from '../api'
import Validate from '../assets/js/WxValidate'
import Md5 from '../assets/js/md5'
export default {
	data () {
		return {
			form: {
				oldPassword: '',
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
	      oldPassword: {
	        required: true
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
	    	oldPassword: {
	    		required: '请输入原密码'
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
	    let sessionId = sessionStorage.getItem('sessionId')
	    let data = {
	    	oldPassword: Md5.hex_md5(this.form.oldPassword),
        newPassword: Md5.hex_md5(this.form.newPassword),
        customerSessionId: sessionId
	    }
	    console.log(data)
			modifyPassword(data).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.showToast('修改成功')
					// this.$router.back()
				} else {
					this.showToast(res.data.message)
				}
			}).catch(function (error) {
        console.log(error)
      })
		}
	},
	mounted () {
		this.initValidate()
	}
}
</script>
