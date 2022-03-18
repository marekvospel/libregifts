<script setup lang="ts">
import ListGift from '../components/ListGift.vue'
</script>

<template>
  <div class="gifts">
    <list-gift />
    <list-gift />
  </div>
</template>

<style scoped>

.gifts {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1.5rem;
}

</style>