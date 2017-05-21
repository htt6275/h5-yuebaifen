
import index from '@/pages/index'
import signin from '@/pages/signin'
import signup from '@/pages/signup'
import agreement from '@/pages/agreement'
import resetpass from '@/pages/resetpass'
import modifypass from '@/pages/modifypass'
import smsLogin from '@/pages/smsLogin'
import account from '@/pages/account'
import about from '@/pages/about'
import problem from '@/pages/problem'
import records from '@/pages/records'
import channel from '@/pages/channel'
import chooseterm from '@/pages/chooseterm'
import accountinfo from '@/pages/accountinfo'
import applysubmit from '@/pages/applysubmit'
import contract from '@/pages/contract'

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
    path: '/channel',
    name: '分期渠道',
    component: channel
  },
  {
    path: '/chooseterm',
    name: '渠道详情',
    component: chooseterm
  },
  {
    path: '/applysubmit',
    name: '申请分期',
    component: applysubmit
  },
  {
    path: '/contract',
    name: '分期合同',
    component: contract
  },
  {
    path: '/myaccount',
    name: '我的账户',
    component: account
  },
  {
    path: '/accountinfo',
    name: '账户信息',
    component: accountinfo
  },
  {
    path: '/records',
    name: '申请记录',
    component: records
  },
  {
    path: '/modifypass',
    name: '修改密码',
    component: modifypass
  },
  {
    path: '/problem',
    name: '常见问题',
    component: problem
  },
  {
    path: '/about',
    name: '关于',
    component: about
  },
]

export default routes