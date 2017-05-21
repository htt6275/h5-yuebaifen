<template>
	<section>
		<!-- <mt-header fixed :title="this.$route.name"></mt-header> -->
		<div class="page">
			<form name="signupForm" class="signup-form">
				<div class="field-group">
					<mt-cell title="申请金额">
					  <span>{{form.amount}}</span>
					</mt-cell>
					<mt-cell title="分期期数">
					  <span>{{form.parts}}</span>
					</mt-cell>
				</div>
				<div class="field-group">
					<mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="form.name"></mt-field>
					<mt-field label="身份证号" placeholder="填写有误将影响分期申请" type="number" v-model="form.cardNo"></mt-field>
					<mt-field label="信用卡" placeholder="请与身份证保持一致" type="number" v-model="form.accNo"></mt-field>
					<mt-field label="卡片有效期" placeholder="月/年" type="number" v-model="form.validDate"></mt-field>
					<mt-field label="cvn2码" placeholder="请输入卡片背面最后三位数字" type="number" v-model="form.cvn"></mt-field>
					<mt-field label="预留手机号" placeholder="请输入手机号" type="tel" v-model="form.reserveMobile"></mt-field>
				</div>
				<div class="field-group">
					<div class="clearfix">
						<mt-checklist
						  v-model="form.agree"
						  :options="['同意']">
						</mt-checklist>
						<router-link to="/contract" class="server-link">《个人消费分期支付合同》</router-link>
					</div>
					<mt-button type="primary" size="large" class="signup-button" @click.prevent="onSubmit">确认分期</mt-button>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { createOrder } from '../api'
import Validate from '../assets/js/WxValidate'
export default {
	data () {
		return {
			form: {
				amount: '',
	      parts: '',
				name: '',
				cardNo: '',
				accNo: '',
				validDate: '',
				cvn: '',
				reserveMobile: '',
	      amount: '',
	      parts: '',
	      sessionId: '',
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
	    	name: {
	        required: true,
	      },
	      cardNo: {
	        required: true,
	        idcard: true
	      },
	      accNo: {
	      	required: true
	      },
	      validDate: {
	      	required: true
	      },
				cvn: {
					required: true
				},
	      reserveMobile: {
	        required: true,
	        tel: true, 
	      },
	      agree: {
	        required: true
	      },
	    }, {
	      name: {
	        required: '请输入姓名'
	      },
	      cardNo: {
	        required: '请输入身份证号'
	      },
	      accNo: {
	      	required: '请输入信用卡号'
	      },
	      validDate: {
	      	required: '请输入卡片有效期'
	      },
				cvn: {
					required: '请输入cvn2码'
				},
	      reserveMobile: {
	        required: '请输入手机号',
	        tel: '请输入正确手机号'
	      },
	      agree: {
	        required: '请同意服务与隐私协议'
	      },
	    })
    },
		onSubmit () {
			if (!this.validate.checkForm(this.form)) {
	      const error = this.validate.errorList[0]
	      this.showToast(error.msg)
	      return false
	    }
	    let shopMechanism = JSON.parse(sessionStorage.getItem('shopMechanism'))
	    let data = {
	    	amount: this.form.amount,
	      parts: this.form.parts,
				name: this.form.name,
				cardNo: this.form.cardNo,
				accNo: this.form.accNo,
				validDate: this.form.validDate,
				cvn: this.form.cvn,
				reserveMobile: this.form.reserveMobile,
	      customerSessionId: sessionStorage.getItem('sessionId'),
    		shopId: shopMechanism.shopId,
    		mechanismId: shopMechanism.mechanismId
	    }
	    console.log(data)
			createOrder(data).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.showToast('提交成功')
					// this.$router.push({ path: '/index' })
				} else {
					this.showToast(res.data.message)
				}
			}).catch(function (error) {
        console.log(error)
      })
		},
	},
	mounted () {
		this.initValidate()
		this.form.amount = sessionStorage.getItem('amount')
		this.form.parts = sessionStorage.getItem('parts')
	}
}
</script>
<style scoped>
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