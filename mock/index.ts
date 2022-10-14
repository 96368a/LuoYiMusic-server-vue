// import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// import api from './user'

// export function setupProdMockServer() {
//   createProdMockServer(api)
// }

export default [
  {
    url: '/api/getList',
    method: 'post',
    response: () => {
      return [] // logList自定义数据
    },
  },
  {
    url: '/api/getStatusList',
    method: 'get',
    response: () => {
      return [] // logList自定义数据
    },
  },
]
