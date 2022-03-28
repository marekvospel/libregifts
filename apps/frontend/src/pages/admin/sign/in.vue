<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '../../../stores/index.store'

import GHeader from '../../../components/GHeader.vue'
import GInput from '../../../components/GInput.vue'
import GButton from '../../../components/GButton.vue'
import axios from 'axios'

const store = useStore()
const router = useRouter()

const formData = reactive({
  email: '',
  password: '',
})
const error = ref(0)


async function signIn(): Promise<any> {
  try {
    const result = await axios.post('/api/sign/in', JSON.stringify({
      email: formData.email,
      password: formData.password,
    }), {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    })

    localStorage.setItem('token', result.data.token)
    store.setToken(result.data.token)

    await router.push('/admin')

  } catch {

  }
}
</script>

<template>
  <div>
    <GHeader />
    <div class="sign-in">
      <form @submit.prevent="signIn" class="sign-in-form">
        <GInput placeholder="Email" v-model:value="formData.email" :error="!!(error & (1 << 0))" @update:value="error -= !!(error & (1 << 0)) ? (1 << 0) : 0"/>
        <GInput placeholder="Password" type="password" v-model:value="formData.password" :error="!!(error & (1 << 1))" @update:value="error -= !!(error & (1 << 1)) ? (1 << 1) : 0"/>
        <div class="buttons">
          <GButton>Přihlásit se</GButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.sign-in {
  display: flex;
  flex-direction: column;

  padding: 10rem 3rem 3rem;
}

.sign-in-form {
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
