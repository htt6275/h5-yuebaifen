import axios from 'axios'
import Qs from 'qs'
axios.defaults.baseURL = '/baseUrl'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [(data) => { return Qs.stringify(data) }]
axios.defaults.timeout = 5000

var instance = axios.create({
  baseURL: '/decodeUrl',
  timeout: 5000,
  headers: {'Content-Type': 'multipart/form-data'},
  proxy: {
    host: '127.0.0.1',
    port: 3000,
  },
});
export const requestLogin = data => { return axios.post('/user/loginByMobileAndPassword.json', data) }

export const getRandomImage = () => { return axios.get('/user/getRandomImage.json') }

export const getMobileSmsCode = data => { return axios.post('/sms/getMobileSmsCode.json', data) }

export const requestRegister = data => { return axios.post('/user/registe.json', data) }

export const resetPassword = data => { return axios.post('/user/resetPasswordById.json', data) }

export const loginBySmsCode = data => { return axios.post('/user/loginByMobileAndSmsCode.json', data) }

export const modifyPassword = data => { return axios.post('/user/modifyPassword.json', data) }

export const qcodeDecoder = data => { return instance.post('/user/qcodeDecoder', data) }