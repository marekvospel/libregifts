<script setup lang="ts">
import { Giver, useStore } from '../stores/index.store'

import GButton from './GButton.vue'
import axios from 'axios'

const store = useStore()

interface Props {
  id?: string
  name?: string,
  description?: string,
  taken?: boolean,
  giver?: Giver,
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Lorem ipsum dolor sit amet.',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda consectetur debitis dolorem ducimus expedita facilis id itaque modi molestias nemo non nulla odio odit officia perspiciatis quas quasi, repellat sapiente tempore tenetur vero voluptates voluptatibus. Dolorem earum maiores voluptatum?',
  taken: false,
})

async function deleteGift() {
  try {
    const result = await axios.delete(`/gift/${ encodeURIComponent(props.id ?? '') }`, {
      headers: {
        'Authorization': store.token,
      },
    })

    store.removeGift(props.id)
  } catch {

  }
}

</script>

<template>
  <div class="list-gift">
    <h3 class="text-h3">{{ props.name}}</h3>
    <p>{{ props.description }}</p>
    <div v-if="props.giver">
      <p>{{ props.giver.name }}</p>
      <p>{{ props.giver.email }}</p>
      <p>{{ props.giver.phone }}</p>
    </div>
    <div class="gift-buttons">
      <g-button @click="deleteGift" class="red-button">Smazat</g-button>
    </div>
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

h3 {
  text-align: center;
}

.gift-buttons {
  margin: 2rem 0 0;
}

.gift-buttons a, .gift-buttons {
  display: flex;
  flex-direction: column;
}

.red-button {
  background: var(--red-100);
}

.red-button:hover {
  background: var(--red-60);
}

</style>