<script>
  import { onMount } from 'svelte';
  import Hero from '$lib/hero.svelte';
  import Bio from '$lib/bio.svelte';
  import Footer from '$lib/footer.svelte';

  let splitter,
    show = false;

  onMount(() => {
    splitter.offsetHeight; // Reflow
    show = true;
  });
</script>

<div class="parent">
  <div bind:this={splitter} class="splitter" class:shown={show} />
</div>

<div class="above">
  <Hero />
  <Bio />
  <Footer />
</div>

<style>
  .parent {
    width: 100vw;
    height: 200vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;
  }
  .splitter {
    width: 200%;
    height: 200%;
    position: absolute;
    z-index: 0;
    top: 20rem;
    left: 15rem;
    background: var(--color-blue);
    transform: rotate(-30deg) translate(100vw, 100vh);
    opacity: 0;
    transition: transform 1s;
  }
  .splitter.shown {
    opacity: 1;
    transform: rotate(-30deg) translate(0);
  }
  @media only screen and (max-width: 700px) {
    .splitter.shown {
      transform: rotate(-30deg) translate(40vh, 25vh);
    }
  }

  .above {
    position: relative;
    z-index: 1;
  }
</style>
