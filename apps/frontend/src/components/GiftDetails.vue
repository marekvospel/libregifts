<script setup lang="ts">
import GiftForm from './GiftForm.vue'
import { ref } from 'vue'
import { useStore } from '../stores/index.store'

const store = useStore()

interface Props {
  id?: string;
  name?: string;
  description?: string;
  taken?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  description: '',
  taken: false,
})

const forceTaken = ref(props.taken)

function giftGiven(): void {
  forceTaken.value = true
  store.fetchGift(props.id ?? '')
}
</script>

<template>
  <div class="list-gift">
    <h3 class="text-h3">{{ props.name}}</h3>
    <p>{{ props.description }}</p>
    <GiftForm class="gift-form" :id="props.id" :taken="props.taken || forceTaken" @give="giftGiven()"/>
    <p v-if="props.taken || forceTaken" class="text-h3 gift-form">Tento dárek je již zabraný</p>
  </div>
</template>

<style scoped>
.list-gift {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.5rem;

  border-radius: 0.75rem;
  background: var(--white-97);
}

h3, p.text-h3 {
  text-align: center;
}

p.text-h3 {
  font-weight: 500;
}

.gift-form {
  margin: 2rem 0 0;
}
</style>
