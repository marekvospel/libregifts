<script setup lang="ts">

import { computed } from 'vue'

interface Props {
  placeholder?: string
  value?: string
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Email',
  value: '',
  error: true,
})

const emit = defineEmits(['update:value'])

const value = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value),
})

</script>

<template>
  <input type="text" v-model="value" :placeholder="props.placeholder" :class="{ error: props.error }">
</template>

<style scoped>

input {

  padding: 0.75rem;

  border-radius: 0.875rem;
  border: none;
  outline: solid 1px var(--primary-100);
  background: var(--white);

  transition: outline-color 0.3s;
}

input:focus-within {
  outline-color: var(--accent-60);
}

input.error {
  outline-color: var(--red-80);
}

</style>