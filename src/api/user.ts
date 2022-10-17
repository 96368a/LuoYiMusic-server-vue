import axios from '.'

export const getUserInfo = () => {
  return axios.get('/user/info')
}
