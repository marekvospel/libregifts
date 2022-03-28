<script setup lang="ts">
import GButton from './GButton.vue'

interface Props {
  title?: string;
  description?: string;
  ok?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Title',
  description: 'description',
  ok: true,
})

const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <div class="overlay" @click="emit('close')"/>
    <div class="popup">
      <h2 class="text-h2">{{ props.title }}</h2>
      <p>{{  props.description }}</p>
      <GButton type="button" @click="emit('close')" :class="{ error: !props.ok }">Ok</GButton>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  left: 50%;
  top: 50%;

  min-width: min(70vw, 400px);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.5rem 2rem;

  border-radius: 0.75rem;
  transform: translate(-50%, -50%);
  background: var(--white);
}

.text-h2 {
  text-align: center;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background: #000000aa;
  backdrop-filter: blur(2px);
}

.error {
  background: var(--red-100);
}

.error:hover {
  background: var(--red-60);
}
</style>
