<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style>
@import './assets/styles/reset.css';

:root {
  --white: #ffffff;
  --white-97: #f7f7f7;

  --primary-140: #999999;
  --primary-120: #bfbfbf;
  --primary-100: #cccccc;
  --primary-80: #d9d9d9;
  --primary-60: #e6e6e6;

  --accent-100: #00d1ff;
  --accent-80: #33daff;
  --accent-60: #66e3ff;

  --red-100: #ff3333;
  --red-80: #ff4c4d;
  --red-60: #f76e6e;
}

body {
  background: var(--primary-80);
}

.text-h3 {
  font-weight: 600;
  font-size: 1.15rem;
  font-family: 'Work Sans', sans-serif;
}

a {
  text-decoration: none;
  color: #000000;

  transition: color 0.3s;
}

a:hover {
  color: #3db2cc;
}
</style>
