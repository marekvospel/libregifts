<script lang="ts">
  import Header from '../Header.svelte'
</script>


<div class='container px-2 sm:px-8 lg:px-32'>
  <Header />
  <div class='w-screen h-96 dolnibrezany-img mb-4 -m-2
  sm:sm:-mx-8
  lg:mb-8 lg:-mx-32'></div>
  <slot />
</div>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .dolnibrezany-img {
      background: url("/dolnibrezany.png") center center;
    }
</style>
