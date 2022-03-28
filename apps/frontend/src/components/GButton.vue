<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit';
}

const props = withDefaults(defineProps<Props>(), { type: 'submit' })

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="props.type" @click="emit('click')">
    <slot />
  </button>
</template>

<style scoped>
button {
  background: var(--accent-100);
  border: none;

  padding: 0.75rem 2rem;
  border-radius: 0.875rem;
  cursor: pointer;

  color: var(--white);
  font-weight: 600;
  font-size: 0.875rem;

  transition: background 0.3s;
}

button:hover {
  background: var(--accent-60);
}
</style>
