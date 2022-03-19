<script setup lang="ts">
import ListGift from '../components/ListGift.vue'
import GHeader from '../components/GHeader.vue'
</script>

<template>
  <div class="home-layout">
    <g-header />
    <div class="gifts">
      <list-gift />
      <list-gift />
    </div>
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