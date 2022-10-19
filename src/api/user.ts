import axios from '.'
import type { UserInfo } from '~/types/user'

export const getUserInfo = async () => {
  return axios.get('/user/info')
}

export const getUsers = async (name: string, page: number, pageSize: number) => {
  return axios.get('/api/user/search', { params: { name, page, pageSize } })
}

export const addUser = async (user: UserInfo) => {
  return axios.post('/api/user/add', user)
}

export const updateUser = async (user: UserInfo) => {
  return axios.post('/api/user/update', user)
}

export const changPwUser = async (user: UserInfo) => {
  return axios.post('/api/user/changePassword', { id: user.id, password: user.password })
}

export const delUser = async (user: UserInfo) => {
  return axios.post('/api/user/del', { id: user.id })
}
