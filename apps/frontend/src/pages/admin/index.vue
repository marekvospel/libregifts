<script setup lang="ts">
import GHeader from '../../components/GHeader.vue'
import AdminListGift from '../../components/AdminListGift.vue'
import { useStore } from '../../stores/index.store'
import { onMounted } from 'vue'

const store = useStore()

onMounted(async () => {
  await store.fetchGifts()
})
</script>

<route lang="json">
{
  "meta": {
    "auth": true
  }
}
</route>

<template>
  <div class="home-layout">
    <GHeader />
    <div class="gifts">
      <RouterLink to="/admin/add" class="add-button">
        <p>Přidat</p>
      </RouterLink>
      <AdminListGift v-for="gift in store.gifts.values()" :key="gift.id" :="gift" />
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

.add-button {
  text-align: center;
}
</style>
