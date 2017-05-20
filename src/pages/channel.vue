<template>
<div class="page">
	<div class="banner"></div>
	<ul class="channel-list">
		<li class="channel-item" v-for="channel in channels">
		<!-- 	<mt-cell title="标题文字" label="分期金额" to="/" is-link>
			  <span>icon 是图片</span>
			  <img slot="icon" src="../assets/img/purse.png" width="24" height="24">
			</mt-cell> -->
			<div class="channel-item-icon"></div>
			<div class="channel-item-detail" @click="selectChannel(channel)">
				<p v-text="channel.channelName"></p>
				<span>分期金额：￥{{channel.minMoney}}-{{channel.maxMoney}}</span>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
	export default {
		data () {
			return {
				channels: [
					{
						channelName:'有卡分期通道一',
						minMoney:600,
						maxMoney:50000
					},
					{
						channelName:'有卡分期通道二',
						minMoney:1000,
						maxMoney:60000
					},
					{
						channelName:'有卡分期通道三',
						minMoney:5000,
						maxMoney:100000
					},
					{
						channelName:'有卡分期通道四',
						minMoney:10000,
						maxMoney:150000
					}
				]
			}
		},
		methods: {
			selectChannel (channel) {
				console.log(channel)
				this.$router.push('/apply')
			}
		}
	}
</script>

<style scoped>
p {
	margin: 0;
}
.banner{
	width:100%;
	height:149px;
	background-image: url(../assets/img/channel-bg.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size:cover;
	margin-bottom: 20px;
}
.channel-item {
	height:44px;
	border-top: 1px solid #e4e4e4;
	border-bottom: 1px solid #e4e4e4;
	display: flex;
	align-items: center;
	background: #fff;
	margin-bottom:10px;
}
.channel-item-icon {
	width:26px;
	height:26px;
	background-image: url(../assets/img/purse.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 100%;
	margin:0 4%;
}
.channel-item-detail {
	display: block;
	width: 100%;
}
.channel-item-detail > span{
	color:#d0d0d0;
	font-size: 12px;
}
</style>