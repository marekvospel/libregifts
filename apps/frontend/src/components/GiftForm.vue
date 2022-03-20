<script setup lang="ts">
import { reactive, ref } from 'vue'

import GInput from './GInput.vue'
import GButton from './GButton.vue'

import { useStore } from '../stores/index.store'

const store = useStore()

interface Props {
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
})

const emit = defineEmits(['give'])

const formData = reactive({
  name: '',
  email: '',
  phone: '',
})

const error = ref(0)

async function giveGift() {
  const result = await fetch(`/api/gift/${ encodeURIComponent(props.id) }/give`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const json = await result.json()

  if (result.ok && json['success']) {
    emit('give')
    showPopup('Úspěch', `Úspěšně jste se přihlásil k dodání Dárku <strong>${ store.gifts.get(props.id)?.name }</strong></strong>.<br>Během chvíle vám přijde potvrzovací emaiBěhem chvíle vám přijde potvrzovací email.`)
  } else {
    if (json['errors'].some((error: { msg: string }) => error.msg === 'That gift is already given!')) {
      emit('give')
      showPopup('Chyba', 'Omlmouváme se, ale tento dárek někdo stihl zarezervovat před vámi. Zkuste jiný dárek.', false)
    }

    if (json['errors'].some((error: { param: string }) => error.param === 'name')) error.value |= 1 << 0
    if (json['errors'].some((error: { param: string }) => error.param === 'email')) error.value |= 1 << 1
    if (json['errors'].some((error: { param: string }) => error.param === 'phone')) error.value |= 1 << 2
  }

}

function showPopup(title: string, message: string, positive = true) {
  // TODO: create popup
  console.log(title, message, positive)
}
</script>

<template>
  <form @submit.prevent="giveGift">
    <g-input v-model:value="formData.name" placeholder="Jméno" :error="!!(error & (1 << 0))" @update:value="error -= !!(error & (1 << 0)) ? (1 << 0) : 0" />
    <g-input v-model:value="formData.email" placeholder="Email" :error="!!(error & (1 << 1))" @update:value="error -= !!(error & (1 << 1)) ? (1 << 1) : 0" />
    <g-input v-model:value="formData.phone" placeholder="Tel. číslo" :error="!!(error & (1 << 2))" @update:value="error -= !!(error & (1 << 2)) ? (1 << 2) : 0"/>
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