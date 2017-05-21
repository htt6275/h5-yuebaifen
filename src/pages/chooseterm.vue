<template>
<div class="page">
	<section>
		<p class="title">申请分期</p>
		<mt-cell title="商品金额">
		  <input type="text" class="amount" v-model="amount" :placeholder="amountRange">
		  <img slot="icon" src="../assets/img/ware.png" width="20" height="20">
		</mt-cell>
		<div @click="chooseTerm">
			<mt-cell title="分期期数" is-link>
			  <span>{{chooseNum}}</span>
			  <img slot="icon" src="../assets/img/fen.png" width="20" height="20">
			</mt-cell>
		</div>
	</section>
	<section>
		<p class="title">费用详情</p>
		<div class="detail">
			<ul class="detail-item">
				<li>
					<p>每期金额(元)</p>
					<span>{{eachAmount}}</span>
				</li>
				<li>
					<p>分期手续费(元)</p>
					<span>0.00</span>
				</li>
				<li>
					<p>第一期扣款(元)</p>
					<span>{{eachAmount}}</span>
				</li>
			</ul>
		</div>
		<div class="explain">
			<div class="explain-item">
				<div>
					<img width="20" height="20" src="../assets/img/debit.png">
				</div>
				<div class="explain-text">
					<p>往后每期扣款(元)</p>
					<span>{{eachAmount}}</span>
				</div>
			</div>
			<div class="explain-item">
				<div>
					<img width="20" height="20" src="../assets/img/money.png">
				</div>
				<div class="explain-text">
					<p>产品分期总额(元)</p>
					<span>{{totalAmount}}</span>
				</div>
			</div>
		</div>
	</section>
	<section class="submit">
		<mt-button type="primary" size="large" @click="onSubmit">下一步</mt-button>
	</section>
	<mt-actionsheet :actions="termList" v-model="sheetVisible"></mt-actionsheet>
</div>
</template>

<script>
import { getPartList } from '../api'
export default {
	data () {
		return {
	    amount: '',
			lowestAmount: '',
			largestAmount: '',
			chooseNum: '选择分期期数',
	    eachAmount: '',
	    totalAmount: '',
	    shopMechanism: {},
			termList: [],
			sheetVisible: false
		}
	},
	methods: {
		chooseTerm () {
			let largestAmount = this.shopMechanism.amount
			let lowestAmount = this.shopMechanism.lowestAmount
			if (this.amount.length === 0) {
				this.$toast({
					message: '请输入金额'
				})
			} else if (!(/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(this.amount))) {
				this.$toast({
					message: '输入不合法'
				})
			} else if (this.amount < lowestAmount || this.amount > largestAmount) {
				this.$toast({
					message: '输入金额超出范围'
				})
			} else {
				this.getTermList()
			}
		},
		getTermList () {
			let data = {
	        amount: this.amount,
	        shopId: this.shopMechanism.shopId,
	        mechanismId: this.shopMechanism.mechanismId,
	        customerSessionId: sessionStorage.getItem('sessionId')
      }
      this.$indicator.open();
			getPartList(data).then(res => {
				let self = this
				this.termList = []
				if (res.data.code === 0) {
					let partList = res.data.result
					partList.forEach(function(item, index){
						var item = {
							name: item.name,
							method: self.sheetClickHandle
						}
						self.termList.push(item)
					})
					this.sheetVisible = true;
				} else {
					this.$toast({
						message: res.data.message
					})
				}
			}).then(() => {
				this.$indicator.close();
			})
		},
		sheetClickHandle (e) {
			console.log(e)
			this.chooseNum = e.name;
			this.eachAmount = ((Math.floor(this.amount / parseInt(e.name) * 100)) / 100).toFixed(2);
			this.totalAmount = (this.amount * 1).toFixed(2);
		},
		onSubmit () {
			if (parseInt(this.totalAmount) == parseInt(this.amount)) {
				sessionStorage.setItem('amount', this.totalAmount)
				sessionStorage.setItem('parts', this.chooseNum)
				this.$router.push('/applysubmit')
			} else {
				this.$toast({
					message:'请重新选择期数'
				})
				// this.sheetVisible = true;
			}
		}
	},
	computed: {
		amountRange () {
			return '可分期金额￥' + this.shopMechanism.lowestAmount + '-' + this.shopMechanism.amount
		}
	},
	mounted () {
		this.shopMechanism = JSON.parse(sessionStorage.getItem('shopMechanism'))
	}
}
</script>

<style scoped>
.title {
	height:15px;
	line-height: 15px;
	padding-left: 15px;
}
.amount {
	text-align:right;
	padding-right:10px;
}
.mint-cell,
.mint-cell:last-child {
	background: #fff
}
.mint-cell:last-child {
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
}
input{
	outline: none;
	border: 0;
}
.detail{
	margin-bottom: 10px;
	padding: 5px 0;
	background: #fff;
}
.detail-item {
	display: flex;
	justify-content: center;
	margin: 5px 0;
}
.detail-item li {
	margin: 0 5px;
	text-align: center
}
.detail-item li p {
	margin: 5px 0;
	padding: 5px 8px;
	border: 1px solid #bbb;
	border-radius: 5px;
	background: #f0f0f0;
	font-size: 12px
}
.explain {
	display: flex;
	justify-content: space-between;
	padding: 0 15px
}
.explain-item {
	display: flex;
	align-items: center;
	padding: 5px;
	background: #00b4ea; 
}
.explain-item:last-child {
	background: #0095db;
}
.explain-text {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-left: 8px;
	color: #fff;
}
.explain-text p {
	margin: 5px 0;
	font-size: 12px
}
.submit {
	margin-top: 30px;
	padding: 0 15px;
}
</style>