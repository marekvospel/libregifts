<script lang="ts">
  import Header from '../Header.svelte'
</script>


<div class='w-full max-w-screen overflow-hidden min-h-screen flex flex-col justify-center'>
  <div class='container self-center px-5 sm:px-8 lg:px-32'>
    <Header />
    <div class='absolute left-0 w-screen z-10 h-96 dolnibrezany-img'></div>
    <div class='h-96 w-max'></div>
    <div class='relative -my-12 z-20'>
      <slot />
    </div>
  </div>
</div>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .dolnibrezany-img {
      background: url("/dolnibrezany.png") center center;
    }
</style>
