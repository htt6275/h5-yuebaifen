
import Hello from '@/components/Hello'
import index from '@/pages/index'
import signin from '@/pages/signin'

const routes = [
	{
    path: '/',
    name: '登录',
    component: signin
  },
  {
    path: '/index',
    name: '悦百分',
    component: index
  }
]

export default routes