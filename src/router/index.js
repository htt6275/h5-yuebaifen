
import index from '@/pages/index'
import signin from '@/pages/signin'
import signup from '@/pages/signup'

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
    path: '/index',
    name: '悦百分',
    component: index
  }
]

export default routes