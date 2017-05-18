<template>
	<section>
		<div class="page-main transition" v-bind:class="{'open': isSideOpen}">
			<div class="page-hd clearfix">
				<img src="../assets/img/avatar.png" class="avatar" @click="toggle">
			</div>
			<div class="page-bd">
				<img src="../assets/img/logo.png" class="logo">
				<p class="desc"><span>{{text}}</span>|<span>零手续费</span>|<span>审批更快</span></p>
			</div>
			<div class="page-ft">
				<img src="../assets/img/scan.png" class="icon-scan">
				<span>扫码申请分期</span>
			</div>
		</div>
		<aside class="sidebar transition" v-bind:class="{'open': isSideOpen}">
			<div class="sidebar-top text-center">
				<img src="../assets/img/avatar_big.png" class="sidebar-avatar">
				<p class="account">15210647536</p>
			</div>
			<ul class="sidebar-menu">
				<li><router-link to="/user" class="user">我的账户</router-link></li>
				<li><router-link to="/problem" class="problem">常见问题</router-link></li>
				<li><router-link to="/exit" class="exit">退出登录</router-link></li>
			</ul>
		</aside>
	</section>
</template>
<script>
	export default {
		data () {
			return {
				text: '额度更高',
				isSideOpen: true
			}
		},
		methods: {
			toggle (e) {
				console.log(e)
				this.isSideOpen = !this.isSideOpen
			}
		}
	}
</script>
<style scoped>
	section {
		overflow: hidden
	}
	.page-main {
		position: fixed;
		left: 70%;
		width: 100%;
		height: 100%;
		background: url(../assets/img/yue_bg.png) no-repeat;
		background-size: 100% 100%;
	}
	.page-main.open {
		left: 0;
	}
	.page-hd {
		width: 100%;
		height: 100px;
		overflow: hidden
	}
  .avatar {
  	position: absolute;
  	top: 10px;
  	left: 10px;
  	width: 20px;
  	height: 20px;
  }
  .page-bd {
		padding: 20px;
  }
  .logo {
  	width: 200px;
  	padding: 0 0 20px;
  }
  .desc {
  	font-size: 14px;
  	color: #fff;
  }
  .desc span {
  	padding: 0 10px;
  }
  .page-ft {
  	position: absolute;
  	bottom: 0;
  	width: 100%;
  	height: 40px;
  	line-height: 40px;
  	font-size: 16px;
  	color: #fff;
  	text-align: center;
  	background: #00b4ea;
  }
  .icon-scan {
  	width: 20px;
  	height: 19px;
  	vertical-align: middle
  }
  .sidebar {
  	position: fixed;
  	left: 0;
  	width: 70%;
  	height: 100%;
  	padding: 20px;
  	background: #fff
  }
  .sidebar.open {
		left: -70%;
	}
  .sidebar-top {
  	padding: 20px;
  	border-bottom: 1px solid #ccc;
  }
  .sidebar-avatar {
  	margin-bottom: 15px;
  }
  .sidebar-menu {
  	text-align: left;
  	font-size: 16px
  }
  .sidebar-menu li a {
  	display: block;
  	padding: 15px;
  	color: #666;
  }
  .sidebar-menu li a::before {
  	content: '';
  	display: inline-block;
  	width: 20px;
  	height: 20px;
  	margin-right: 10px;
  	vertical-align: bottom;
  	background-size: cover;
  }
  .sidebar-menu li a.user::before {
		background: url(../assets/img/user.png) no-repeat;
  }
  .sidebar-menu li a.problem::before {
		background: url(../assets/img/problem.png) no-repeat;
  }
  .sidebar-menu li a.exit::before {
		background: url(../assets/img/exit.png) no-repeat;
  }
</style>