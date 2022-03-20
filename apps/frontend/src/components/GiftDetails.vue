<script setup lang="ts">
import GiftForm from './GiftForm.vue'
import { reactive } from 'vue'

interface Props {
  id?: string
  name?: string,
  description?: string,
  taken?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Lorem ipsum dolor sit amet.',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda consectetur debitis dolorem ducimus expedita facilis id itaque modi molestias nemo non nulla odio odit officia perspiciatis quas quasi, repellat sapiente tempore tenetur vero voluptates voluptatibus. Dolorem earum maiores voluptatum?',
  taken: false,
})

</script>

<template>
  <div class="list-gift">
    <h3 class="text-h3">{{ props.name}}</h3>
    <p>{{ props.description }}</p>
    <gift-form v-if="!props.taken" class="gift-form" :id="props.id"/>
    <p v-else class="text-h3 gift-form">Tento dárek je již zabraný</p>
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