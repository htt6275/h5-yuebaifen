
import index from '@/pages/index'
import signin from '@/pages/signin'
import signup from '@/pages/signup'
import agreement from '@/pages/agreement'
import resetpass from '@/pages/resetpass'
import smsLogin from '@/pages/smsLogin'
import account from '@/pages/account'
import about from '@/pages/about'

const routes = [
	{
    path: '/',
    name: '登录',
    component: signin
  },
  {
    path: '/signup',
    name: '注册',
    component: signup
  },
  {
    path: '/agreement',
    name: '协议',
    component: agreement
  },
  {
    path: '/index',
    name: '悦百分',
    component: index
  },
  {
    path: '/resetpass',
    name: '重置密码',
    component: resetpass
  },
  {
    path: '/smslogin',
    name: '短信验证登录',
    component: smsLogin
  },
  {
    path: '/account',
    name: '我的账户',
    component: account
  },
  {
    path: '/about',
    name: '关于',
    component: about
  },
]

export default routes