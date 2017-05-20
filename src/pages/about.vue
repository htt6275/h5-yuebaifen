<template>
	<div class="page">
		<div class="page-hd">
			<img src="../assets/img/logo_blue.png" class="logo">
			<p class="version">V 1.1.0 版</p>
		</div>
		<div class="page-bd">
			<p>客服电话：010-56143517</p>
		</div>
		<div class="page-ft">
			<p style="font-size: 12px">悦享分期 分你所想</p>
			<p>悦 百 分  版 权 所 有</p>
		</div>
	</div>
</template>

<style scoped>
	.page > div {
		padding: 30px;
		text-align: center
	}
	.page > .page-hd {
		padding-top: 20%;
	}
	.version {
		color: #01adea;
		font-weight: bold
	}
	.logo {
		width: 72px;
		height: 72px;
	}
	.page > .page-bd {
		padding-top: 20%;
	}
	.page-bd p {
		width: 80%;
		margin: auto;
		padding: 10px;
		border: 1px solid #5bc6fe;
		border-radius: 20px;
		color: #0096da;
	}
	.page-ft {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.page-ft p {
		text-align: center
	}
</style>