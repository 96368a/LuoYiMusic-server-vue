import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_API

axios.interceptors.request.use((config) => {
  // 检查是否存在token
  const token = localStorage.getItem('Ltoken')
  if (token)
    config.headers!.Authorization = `Bearer ${token}`

  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
export * from './user'
