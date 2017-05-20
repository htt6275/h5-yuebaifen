<template>
	<div class="page">
		<ul class="problem-list">
			<li v-for="(item,index) in items" v-on:click="answers(index)">
				<mt-cell :title="item.question" is-link></mt-cell>
				<transition name="show" mode="out-in">
					<div class="answer" v-show="item.flag">{{item.answer}}</div>
				</transition>
			</li>
		</ul>
	</div>
</template>

<script>
	// let html = document.documentElement;
	// window.rem = html.getBoundingClientRect().width / 25 ;
	// html.style.fontSize = window.rem + 'px';
	export default {
		data () {
			return {
				items:[
					{
						question:'cvn2码是什么？',
						answer:'cvn2码是一个安全验证码，用于网上支付等待特殊交易时进行身份验证，位于信用卡背面签名栏最后三位，请仔细填写，避免有误。',
						flag:false
					},{
						question:'什么是提货码？',
						answer:'提货码为您成功办理一笔分期业务后，系统发给您的一条包含12位数字的提货码。',
						flag:false
					},{
						question:'提货码输入有误怎么办？',
						answer:'如您已提交的提货码系统判定有误，需要您重新将正确的提货码再次输入该笔订单对应的申请记录中。',
						flag:false
					},{
						question:'注册时，手机或邮箱被占用了怎么办',
						answer:'一个邮箱、手机只能开通一个悦百分账户，如果注册或者信息补全页面提示被占用，建议更换新手机号码或者邮箱，或在找回之前注册的账户使用。',
						flag:false
					},{
						question:'如果忘记登录密码怎么办？',
						answer:'您可以在登录界面的最下方选择短信验证码登录或者点击忘记密码，通过短信验证码重置密码。',
						flag:false
					},{
						question:'如何查看申请的分期订单是否通过？',
						answer:'在我的账户申请记录里会有您的每一笔订单申请结果，申请成功的订单，在我的账户里会有该笔订单的详情。',
						flag:false
					}
				]
			}
		},
		methods:{
			answers: function(index){
				for(var i = 0, l = this.items.length; i<l; i++){
					if (i == index) {
						this.items[i].flag = !this.items[i].flag;
					} else {
						// this.items[i].flag = false;
					}
				}
			}
		}
	}
</script>
	
<style scoped>
	.page{
		background: #fff;
	}
	.answer{
		padding: 1rem;
		color: #999;
		border-bottom: 1px solid #f0f0f0
	}
	.show-enter-active,
	.show-leave-active {
		transition: all .2s
	}
	.show-enter{
		opacity: 0;
		transform: translateY(-10px);
	}
</style>