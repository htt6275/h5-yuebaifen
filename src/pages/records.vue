<template>						
<div class="page">
	<ul class="record-list">
		<li v-for="record in recordList" class="record-item">
			<div class="record-item-date">
				<img src="../assets/img/dot.png"/><span>{{record.startTime}}</span>
			</div>
			<div class="record-item-borderLeft">
				<div class="record-item-order">
					<div class="record-item-order-header">
						<div>订单号：<span v-text="record.orderNo"></span></div>
						<div>
							<p v-if="record.status === 2">审核通过</p>
							<p v-else-if="record.status === 1">审核不通过</p>
							<p v-else-if="record.status === 0">审核中</p> 
						</div>
					</div>
					<div class="record-item-order-body">
						<div>
							<p>申请金额</p>
							<p>{{record.applyAmount}}</p>
						</div>
						<div>
							<p>产品期限</p>
							<p>{{record.parts}}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>	
</template>

<script>
import { getUserOrderApplyInfo } from '../api'
export default{
	data(){
		return {
			recordList: []
		}
	},
	methods: {
		getRecordList () {
			let data = {
				customerSessionId: sessionStorage.getItem('sessionId')
			}
			getUserOrderApplyInfo(data).then(res => {
				console.log(res)
				if(res.data.code === 0) {
					this.recordList = res.data.result
				} else {
					this.$toast({
						message: res.data.message
					})
				}
			})
		}
	},
	mounted () {
		this.getRecordList()
	}
}
</script>

<style scoped>
	.page {
		background: #f8f8f8;
	}
	.record-list {
		padding-right: 20px;
	}
	.record-item{
		display: flex;
		flex-direction: column;
	}
	.record-item-date{
		display: flex;
		align-items: center;
		padding: 5px 0px;
		margin-left: 3.5%;
		color:#999;
	}
	.record-item-date > img{
		margin-right: 3%;
	}
	.record-item-borderLeft{
		border-left: 1px solid #333;
		padding-left: 4%;
		padding-top: 2%;
		padding-bottom: 2%;
		margin-left: 4.5%;
	}
	.record-item-order{
		/*width: 96%;*/
		height:78px;
		border:1px solid #999;
	}
	.record-item-order-header{
		width:100%;
		height:36%;
		background:linear-gradient(to right, #00b3ea, #0095db);
		color:#fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 12px;
	}
	.record-item-order-body{
		width:100%;
		height:64%;
		display: flex;
		align-items: center;
		background: #fff
	}
	.record-item-order-body > div{
		width:50%;
		height:100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 5%;
	}
	.record-item-order-body > div > p:nth-child(1){
		color:#999;
	}
	p {
		margin: 0;
	}
</style>