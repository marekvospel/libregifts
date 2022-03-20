<script setup lang="ts">
import GInput from './GInput.vue'
import GButton from './GButton.vue'
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  phone: '',
})

function giveGift() {
  // TODO: post /api/gift/:id/give
}
</script>

<template>
  <form @submit.prevent="giveGift">
    <g-input v-model:value="formData.name" placeholder="Jméno" />
    <g-input v-model:value="formData.email" placeholder="Email" />
    <g-input v-model:value="formData.phone" placeholder="Tel. číslo" />
    <g-button>Darovat</g-button>
  </form>
</template>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>