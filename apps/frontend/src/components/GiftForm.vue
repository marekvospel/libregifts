<script setup lang="ts">
import { reactive, ref } from 'vue'

import GInput from './GInput.vue'
import GButton from './GButton.vue'

import { useStore } from '../stores/index.store'
import GPopup from './GPopup.vue'
import axios from 'axios'

const store = useStore()

interface Props {
  id?: string
  taken?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  taken: false,
})

const emit = defineEmits(['give'])

const formData = reactive({
  name: '',
  email: '',
  phone: '',
})

const error = ref(0)

const popup = reactive({
  title: '',
  description: '',
  ok: true,
  open: false,
})

async function giveGift() {
  try {
    await axios.post(`/api/gift/${ encodeURIComponent(props.id) }/give`, JSON.stringify(formData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })

    emit('give')
    showPopup('Úspěch', `Úspěšně jste se přihlásil k dodání Dárku ${ store.gifts.get(props.id)?.name }.\nBěhem chvíle vám přijde potvrzovací emaiBěhem chvíle vám přijde potvrzovací email.`)
  } catch (err) {

    const json = (err as any)?.response?.data ?? {}

    if (json['errors']?.some((error: { msg: string }) => error.msg === 'That gift is already given!')) {
      emit('give')
      showPopup('Chyba', 'Omlmouváme se, ale k tomuto dárku se někdo stihl přihlásit před vámi. Zkuste jiný dárek.', false)
      return
    }

    error.value = 0

    if (json['errors']?.some((error: { param: string }) => error.param === 'name')) error.value |= 1 << 0
    if (json['errors']?.some((error: { param: string }) => error.param === 'email')) error.value |= 1 << 1
    if (json['errors']?.some((error: { param: string }) => error.param === 'phone')) error.value |= 1 << 2

    if (error.value !== 0) return

    showPopup('Chyba', 'Omlmouváme se, ale při přihlašování k tomuto dárku došlo k chybě. Zkuste to znovu později.', false)
  }

}

function showPopup(title: string, message: string, positive = true) {
  popup.title = title
  popup.description = message
  popup.ok = positive
  popup.open = true
}
</script>

<template>
  <form v-if="!props.taken" @submit.prevent="giveGift">
    <g-input v-model:value="formData.name" placeholder="Jméno" :error="!!(error & (1 << 0))" @update:value="error -= !!(error & (1 << 0)) ? (1 << 0) : 0" />
    <g-input v-model:value="formData.email" placeholder="Email" :error="!!(error & (1 << 1))" @update:value="error -= !!(error & (1 << 1)) ? (1 << 1) : 0" />
    <g-input v-model:value="formData.phone" placeholder="Tel. číslo" :error="!!(error & (1 << 2))" @update:value="error -= !!(error & (1 << 2)) ? (1 << 2) : 0"/>
    <g-button>Darovat</g-button>
    <g-popup v-if="popup.open" :="popup" @close="popup.open = false"/>
  </form>
  <g-popup v-else-if="popup.open" :="popup" @close="popup.open = false"/>
</template>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>