<template>
	<div class="about">
		<div class="content">
			<div>
				<img src="../assets/img/logo_blue.png" alt="">
				<p>v1.1.0版</p>
			</div>
			<div>
				客服电话：010-56143517
			</div>
			<div>
				<p>悦享分期 分你所想</p>
				<p>悦百分 版权所有</p>
			</div>
		</div>
	</div>
</template>

<script>
	let html = document.documentElement;
	window.rem = html.getBoundingClientRect().width / 25 ;
	html.style.fontSize = window.rem + 'px';
</script>

<style scoped>
	.about{
		width:100%;
		height:100%;
		/*overflow: hidden;*/
		position: absolute;
	}
	.content{
		/*height:45rem;
		min-height: 600px;*/
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.content > div:nth-child(1){
		margin-top:4rem;
		margin-bottom:8.6rem;
	}
	.content > div:nth-child(1) > img{
		width:4.8rem;
	}
	.content > div:nth-child(1) > p{
		text-align: center;
		margin-top: 1rem;
		color:#0196dc;
		font-weight: bold;
	}
	.content > div:nth-child(2){
		width:14.2rem;
		height:2.8rem;
		color:#0196dc;
		border: 1px solid #0196dc;
		border-radius: 2.8rem;
		text-align: center;
		line-height: 2.8rem;
		margin-bottom: 12rem;
	}
	.content > div:nth-child(3) > p{
		text-align: center;
		margin-bottom: 1rem;
	}
</style>