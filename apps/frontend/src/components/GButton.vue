<script setup lang="ts">

</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>

button {
  background: #c4c4c4;
  border: none;

  padding: 0.5rem 1.75rem;
  border-radius: 0.875rem;
  cursor: pointer;

  transition: background 0.3s;
}

button:hover {
  background: #dadada;
}

</style>