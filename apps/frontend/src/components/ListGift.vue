<script setup lang="ts">
import GButton from './GButton.vue'

interface Props {
  title?: string,
  description?: string,
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Lorem ipsum dolor sit amet.',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda consectetur debitis dolorem ducimus expedita facilis id itaque modi molestias nemo non nulla odio odit officia perspiciatis quas quasi, repellat sapiente tempore tenetur vero voluptates voluptatibus. Dolorem earum maiores voluptatum?'
})

</script>

<template>
  <div class="list-gift">
    <h3>{{ props.title}}</h3>
    <p>{{ props.description }}</p>
    <g-button>Give</g-button>
  </div>
</template>

<style scoped>

.list-gift {

  padding: 1rem;

  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
}

</style>