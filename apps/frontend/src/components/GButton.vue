<script setup lang="ts">

</script>

<template>
  <button>
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