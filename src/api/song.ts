import axios from '.'

export const getSongs = async (name: string, page: number, pageSize: number) => {
  return axios.get('/song/search', { params: { name, page, pageSize } })
}
