<template>
	<div class="page">
		<div class="page-hd">
			<div class="account clearfix">
				<div class="account-avatar pull-left">
					<img src="../assets/img/avatar-square.png">
				</div>
				<div class="account-info pull-left">
					<p class="name">嗯</p>
					<p class="phone">15210647536</p>
				</div>
			</div>
		</div>
		<div class="page-bd">
			<div class="cell-group">
				<mt-cell title="申请记录" to="/records" is-link>
				  <img slot="icon" src="../assets/img/record.png">
				</mt-cell>
			</div>
			<div class="cell-group">
				<mt-cell title="个人信息" to="/accountinfo" is-link>
				  <img slot="icon" src="../assets/img/user-square.png">
				</mt-cell>
				<mt-cell title="修改密码" to="/modifypass" is-link>
				  <img slot="icon" src="../assets/img/bill.png">
				</mt-cell>
				<mt-cell title="常见问题" to="/problem" is-link>
				  <img slot="icon" src="../assets/img/problem-square.png">
				</mt-cell>
				<mt-cell title="关于悦百分金融" to="/about" is-link>
					<img slot="icon" src="../assets/img/about.png">
					<span>当前版本V1.1.0</span>
				</mt-cell>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			msg: '我的账户'
		}
	},
	methods: {
		handleClose: function(){

		}
	}
}
</script>
	
<style scoped>
	.page{
		position: absolute;
		width:100%;
		height:100%;
		overflow: hidden;
		background: #f9f9f9;
	}
	.page-hd{
		padding: 15px;
		background: #349bdf;
	}
	.account-info {
		margin-left: 15px;
		color: #fff;
		font-weight: bold
	}
	.account-info .name {
		margin-top: 30px;
	}
	.cell-group {
		margin: 15px 0;
		border-top: 1px solid #d9d9d9;
		border-bottom: 1px solid #d9d9d9;
		background: #fff
	}
</style>