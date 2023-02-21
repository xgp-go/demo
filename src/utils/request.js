import axios from 'axios'
import { Notice } from 'iview'
import router from '@/router'

export function createAxios(config) {
  const instance = axios.create(...arguments)
  Object.keys(axios).forEach(key => {
    if (axios.hasOwnProperty(key) && !instance.hasOwnProperty(key)) {
      instance[key] = axios[key]
    }
  })
  return instance
}

const apiBaseAxios = createAxios({})

// 请求拦截
apiBaseAxios.interceptors.request.use(
  config => {
    config.params = {
      ...config.params
    }
    // config.headers['Content-Type'] = 'application/json;token:String'
    config.headers['uuid'] = 'intellect_video_net_front'
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = 'bearer ' + localStorage.getItem('token')
    }
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截
apiBaseAxios.interceptors.response.use((response) => {
  // Do something with response data
  if (`${response.data.code}` != '200') {
    if (!Object.prototype.hasOwnProperty.call(response.data, 'code')) {
      return Promise.resolve(response)
    }
    if (`${response.data.code}` === '401') {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      localStorage.removeItem('userPlatform')
      localStorage.removeItem('areaCnCode')
      localStorage.removeItem('areaId')
      localStorage.removeItem('roleId')
      Notice.error({
        title: ' 失败',
        desc: 'token过期，请重新登陆！'
      })
      router.replace({ path: '/' })
    } else {
      const errorMessage = response.data.message || response.data || '网络错误'
      Notice.error({ title: errorMessage })
    }
    return Promise.reject(response.data)
  }
  return Promise.resolve(response)
}, function (error) {
  // Do something with response error
  // alert(error);
  return Promise.reject(error)
})

export default apiBaseAxios
