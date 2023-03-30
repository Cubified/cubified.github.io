<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import Dots from '$lib/dots.svelte';
  import Hero from '$lib/hero.svelte';
  import Bio from '$lib/bio.svelte';
  import Footer from '$lib/footer.svelte';

  let splitter,
    show = false;

  onMount(() => {
    setTimeout(() => {
      splitter.style.transition = 'transform 1s';
      splitter.offsetHeight; // Reflow
      show = true;
    }, 100);
  });
</script>

<svelte:head>
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="{base}/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="{base}/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="{base}/favicon-16x16.png"
  />
  <link rel="manifest" href="{base}/site.webmanifest" />
  <meta charset="utf-8" />
  <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="description"
    content="A personal portfolio site for UC San Diego computer science student Andrew Russell."
  />
  <title>Andrew Russell</title>
</svelte:head>

<div class="parent">
  <div bind:this={splitter} class="splitter" class:shown={show}>
    <Dots />
  </div>
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
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
</style>
