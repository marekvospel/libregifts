<script setup lang="ts">
import GButton from './GButton.vue'

interface Props {
  id?: string;
  name?: string;
  description?: string;
  taken?: boolean;
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
    <div class="gift-buttons">
      <RouterLink v-if="!props.taken" :to="`/gift/${props.id}`">
        <GButton>Darovat</GButton>
      </RouterLink>
      <GButton v-else class="red-button">Zabráno</GButton>
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
