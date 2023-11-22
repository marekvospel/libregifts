<script lang="ts">
  import Header from '../components/Header.svelte'
  import imagePath from '$/assets/img/dolnibrezany.jpg'
  import imageBlurredPath from '$/assets/img/dolnibrezany-blurred.jpg'
</script>


<div class='relative w-full max-w-screen overflow-hidden min-h-screen flex flex-col items-center'>
  <div class='container self-center px-5 sm:px-8 lg:px-32'>
    <Header />
    <div class='absolute left-0 w-screen z-10 h-96 dolnibrezany-img' style={`background-image: url("${imagePath}"), url("${imageBlurredPath}")`}></div>
    <div class='h-96 w-max'></div>
    <div class='relative -mt-12 z-20'>
      <slot />
    </div>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .dolnibrezany-img {
      width: calc(100vw - 12px);
      /*background-image: url("$/assets/img/dolnibrezany.jpg"), url("$/assets/img/dolnibrezany-blurred.jpg");*/
      background-repeat: no-repeat, repeat;
      background-position: center, center;
      background-size: 100%, auto;
  }
</style>
