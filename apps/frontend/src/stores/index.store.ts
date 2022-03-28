import { defineStore } from 'pinia'
import { Collection } from '@discordjs/collection'
import axios from 'axios'

export interface Giver {
  id: string;
  name: string;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  taken: boolean;
  giver?: Giver | null;
}

export const useStore = defineStore('store', {
  state: () => {

    return {
      token: localStorage.getItem('token') ?? '',
      gifts: new Collection<string, Gift>(),
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async fetchGifts(page = 0): Promise<{ success: boolean; lastPage?: boolean }> {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const result = await axios.get('/api/gifts?limit=25', { headers: { Authorization: this.token } })

        const json = result.data

        if (!json['success']) return { success: false }

        if (!json['gifts'] || json['gifts'].length < 1) return { success: true, lastPage: true }

        json['gifts'].forEach((gift: Gift) => {
          if (!gift?.id) return
          this.gifts.set(gift.id, gift)
        })

        return { success: true, lastPage: false }
      } catch {
        return { success: false }
      }
    },
    async fetchGift(id: string): Promise<{ success: boolean; gift?: Gift }> {
      try {
        const result = await axios.get(`/api/gift/${ encodeURIComponent(id) }`, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: this.token,
          },
        })

        const json = await result.data

        if (!json['success']) return { success: false }

        this.gifts.set(json?.['gift']?.['id'], json?.['gift'])


        return { success: true, gift: json?.['gift'] }
      } catch {
        return { success: false }
      }
    },
    removeGift(id: string | undefined) {
      if (!id) return
      this.gifts.delete(id)
    },
    setToken(token: string) {
      this.token = token
    },
  },
})
