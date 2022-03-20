import { defineStore } from 'pinia'
import { Collection } from '@discordjs/collection'
import axios from 'axios'

export interface Giver {
  id: string,
  name: string
}

export interface Gift {
  id: string
  name: string
  taken: boolean
  giver?: Giver | null
}

export const useStore = defineStore('store', {
  state: () => ({
    gifts: new Collection<string, Gift>(),
  }),
  actions: {
    async fetchGifts(page = 0): Promise<{success: boolean, lastPage?: boolean}> {
      const result = await axios.get('/api/gifts?limit=25')

      if (result.status < 200 || result.status >= 300) return { success: false }

      const json = result.data

      if (!json['success']) return { success: false }

      if (!json['gifts'] || json['gifts'].length < 1) return { success: true, lastPage: true }

      json['gifts'].forEach((gift: Gift) => {
        if (!gift?.id) return
        this.gifts.set(gift.id, gift)
      })

      return { success: true, lastPage: false }
    },
    async fetchGift(id: string): Promise<{ success: boolean, gift?: Gift}> {

      const result = await axios.get(`/api/gift/${ encodeURIComponent(id) }`)

      if (result.status < 200 || result.status >= 300) return { success: false }

      const json = await result.data

      if (!json['success']) return { success: false }

      this.gifts.set(json?.['gift']?.['id'], json?.['gift'])


      return { success: true, gift: json?.['gift'] }
    },
  },
})
