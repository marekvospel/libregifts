<script setup lang="ts">
import { onMounted, ref } from 'vue'

import GHeader from '../../components/GHeader.vue'
import { useStore } from '../../stores/index.store'

interface Props {
  id: string
}

const props = defineProps<Props>()

const store = useStore()

const is404 = ref(false)

onMounted(async () => {
  if (store.gifts.has(props.id)) return

  const { success } = await store.fetchGift(props.id)
  if (!success) is404.value = true
})
</script>

<template>
  <div class="gift-layout">
    <g-header />
    <div v-if="!is404" class="exists">
      {{ store.gifts.get(props.id)?.name }}
    </div>
    <div v-else class="404">

    </div>
  </div>
</template>


<style scoped>

</style>