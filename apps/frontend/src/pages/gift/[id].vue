<script setup lang="ts">
import { onMounted, ref } from 'vue'

import GHeader from '../../components/GHeader.vue'
import GiftDetails from '../../components/GiftDetails.vue'
import { useStore } from '../../stores/index.store'

interface Props {
  id: string;
}

const props = defineProps<Props>()

const store = useStore()

const is404 = ref(false)

onMounted(async () => {
  if (!store.gifts.has(props.id)) {
    const { success } = await store.fetchGift(props.id)
    if (!success) is404.value = true
  }
})
</script>

<template>
  <div class="gift-layout">
    <GHeader />
    <div v-if="!is404" class="gift-details">
      <GiftDetails :="store.gifts.get(props.id)" />
    </div>
    <div v-else class="not-found">
      <p>Tento dárek neexistuje. Vrátit se <RouterLink to="/">zpět</RouterLink></p>
    </div>
  </div>
</template>


<style scoped>
.gift-details {
  padding: 3rem;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3rem;
}

a {
  color: var(--accent-100);

  transition: color 0.3s;
}

a:hover {
  color: var(--accent-60);
}
</style>
