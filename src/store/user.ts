import { defineStore } from 'pinia'
import api from '~/api'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {} as UserInfo,
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
  },
  actions: {
    async getUserInfo() {
      const data = await api.get('/user/info')
      console.log(data)
    },
  },
})
