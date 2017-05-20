<template>
<div class="page">
	<div class="stag">申请分期</div>
	<mt-cell title="商品金额">
	  <span><input type="text" maxlength="6" style="text-align:right;padding-right:10px;" v-model="money" :placeholder="moneyRange"></span>
	  <img slot="icon" src="../assets/img/ware.png" width="20" height="20">
	</mt-cell>
  <!-- <mt-field label="email" state="warning" v-model="email"></mt-field> -->
	<mt-cell title="分期期数">
	  <span v-on:click="choose">
	  	<span>{{chooseNum}}期</span>
	  	<img src="../assets/img/angle-right-lg.png" width="10">
	  </span>
	  <img slot="icon" src="../assets/img/fen.png" width="20" height="20">
	</mt-cell>
	<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	<div class="stag">费用详情</div>
	<div class="details">
		<ul class="details-btn">
			<li><button>每期金额(元)</button></li>
			<li><button>分期手续费(元)</button></li>
			<li><button>第一期扣款(元)</button></li>
		</ul>
		<ul class="details-money">
			<li>{{eachAmount}}</li>
			<li>0.00</li>
			<li>{{eachAmount}}</li>
		</ul>
	</div>

	<!-- 往后每期扣款、产品分期总额 -->
	<div class="product">
		<div class="product-left">
			<div>
				<img width="20" height="20" src="../assets/img/debit.png">
			</div>
			<ul>
				<li>往后每期扣款(元)</li>
				<li>{{eachAmount}}</li>
			</ul>
		</div>
		<div class="product-right">
			<div>
				<img width="20" height="20" src="../assets/img/money.png">
			</div>
			<ul>
				<li>产品分期总额(元)</li>
				<li>{{totalAmount}}</li>
			</ul>
		</div>
	</div>
	<!-- next -->
	<div class="next">
		<button @click="next(money,chooseNum)">下一步</button>
	</div>
</div>
</template>

<script>
	export default {
		data () {
			return {
				chooseNum:'选择分期期数',
				minMoney:600,
				maxMoney:12999,
		    money:'',
		    eachAmount:'',
		    totalAmount:'',
				actions:[
					{
						name:'6期',
						method:this.handleClick
					},
					{
						name:'12期',
						method:this.handleClick
					}
				],
				sheetVisible: false
			}
		},
		methods:{
			choose:function(){
				if(this.money==''){
					this.$toast({
						message:'请输入金额'
					});
				}else if(this.money>=this.minMoney && this.money<=this.maxMoney){
					this.sheetVisible = !this.sheetVisible;
				}else{
					this.$toast({
						message:'金额不合法'
					});
				}
				
			},
			handleClick:function(e){
				this.chooseNum = parseInt(e.name);
				this.eachAmount = (Math.floor(this.money / this.chooseNum * 100)) / 100;
				this.totalAmount = this.money;
			},
			next:function(money, chooseNum){
				if(this.totalAmount === this.money){
					console.log('done');
					console.log(money,chooseNum);
				}else{
					this.$toast({
						message:'请选择期数'
					});
					this.sheetVisible = true;
				}
			}
		},
		computed: {
			moneyRange () {
				return '可分期金额￥' + this.minMoney + '-' + this.maxMoney
			}
		}
	}
</script>

<style scoped>
.stag{
	height:42px;
	line-height: 42px;
	padding-left:16px;
}
input{
	outline: none;
	border: 0;
}
.mint-cell-value > span > span{
	color:#2c3e50;
}
.details{
	height:74px;
	background: #fff;
}
.details-btn{
	display: flex;
	justify-content: space-around;
	padding: 10px 10px 14px;
}
.details-btn > li{
	width:31%;
}
.details-btn > li > button{
	width:100%;
	height:24px;
	border-radius: 5px;
	border:1px solid #666;
}
.details-money{
	display: flex;
	justify-content: space-around;
	padding: 0px 20px;
}
.details-money > li{
	width:33%;
	text-align: center;
}
.product{
	display: flex;
	justify-content: space-around;
	color: #fff;
	margin-top: 20px;
	padding: 0px 10px;
}
.product > div{
	display: flex;
	align-items: center;
	font-size: 12px;
	padding-left: 10px;
	width:48%;
	height:50px;

}
.product-left{
	background:#00b5eb; 
}
.product > div > ul{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 10px;
}
.product > div > ul > li{
}
.product > div > ul > li:nth-child(2){
	text-align: center;
	margin-top: 8px;
}
.product-right{
	background: #0095db;
}
.next{
	padding: 0 10px;
	text-align: center;
	margin-top: 24px;
}
.next > button {
	width:100%;
	height:45px;
	background: #3297dd;
	border-radius: 5px;
	color:#fff;
}
</style>