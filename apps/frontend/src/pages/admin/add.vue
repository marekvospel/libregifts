<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '../../stores/index.store'

import GHeader from '../../components/GHeader.vue'
import GInput from '../../components/GInput.vue'
import GButton from '../../components/GButton.vue'
import axios from 'axios'

const store = useStore()
const router = useRouter()

const formData = reactive({
  name: '',
  description: '',
})
const error = ref(0)


async function signIn() {
  try {
    const result = await axios.post('/gift', JSON.stringify({
      name: formData.name,
      description: formData.description,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': store.token,
      },
    })

    await router.push('/admin')

  } catch {

  }
}
</script>

<template>
  <div>
    <g-header />
    <div class="add-gift">
      <form @submit.prevent="signIn" class="add-gift-form">
        <g-input placeholder="Jméno" v-model:value="formData.name" :error="!!(error & (1 << 0))" @update:value="error -= !!(error & (1 << 0)) ? (1 << 0) : 0"/>
        <g-input placeholder="Popis" v-model:value="formData.description" :error="!!(error & (1 << 1))" @update:value="error -= !!(error & (1 << 1)) ? (1 << 1) : 0"/>
        <div class="buttons">
          <g-button>Přidat</g-button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.add-gift {
  display: flex;
  flex-direction: column;

  padding: 10rem 3rem 3rem;
}

.add-gift-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem 1.5rem;

  border-radius: 0.75rem;
  background: var(--white-97);
}

.buttons {
  display: flex;
  flex-direction: column;

  padding-top: 2.5rem;
}

</style>
