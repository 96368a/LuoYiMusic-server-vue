import axios from '.'
import type { UserInfo } from '~/types/user'

export const getUserInfo = async () => {
  return axios.get('/user/info')
}
export const addUser = async (user: UserInfo) => {
  return axios.post('/api/user/add', user)
}
