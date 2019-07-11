import axios from 'axios'
import { Notify, Dialog } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Notify({
        message: res.message || 'error',
        background: '#ff4444',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        Dialog.alert({
          message: '您已退出，请重新登录'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    Notify({
      message: error.message,
      background: '#ff4444',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
