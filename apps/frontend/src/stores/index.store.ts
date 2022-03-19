import { defineStore } from 'pinia'
import { Collection } from '@discordjs/collection'

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
    async fetchGifts() {
      const result = await fetch('/api/gifts?limit=25', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!result.ok) return false

      const json = await result.json()

      if (!json['success']) return false

      json['gifts'].forEach((gift: Gift) => {
        if (!gift?.id) return
        this.gifts.set(gift.id, gift)
      })
    },
  },
})
