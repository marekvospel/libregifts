<script setup lang="ts">
import ListGift from '../components/ListGift.vue'
import GHeader from '../components/GHeader.vue'
import { useStore } from '../stores/index.store'
import { onMounted } from 'vue'

const store = useStore()

onMounted(async () => {
  await store.fetchGifts()
})
</script>

<template>
  <div class="home-layout">
    <GHeader />
    <div class="gifts">
      <ListGift v-for="gift in store.gifts.values()" :key="gift.id" :="gift" />
    </div>
  </div>
</template>

<style scoped>
.gifts {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 3rem;
}
</style>
