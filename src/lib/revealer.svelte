<script>
  import { onMount } from 'svelte';

  export let string = '';
  export let delay = 0;
  export let interval = 100;
  export let play = undefined;

  const words = string.split(' ');
  const els = [];

  const run = () => {
    setTimeout(() => {
      els.forEach((el, i) => {
        setTimeout(() => {
          el.style.transform = 'translateY(0)';
          el.style.clipPath = 'inset(0)';
        }, i * interval);
      });
    }, delay);
  };

  onMount(() => {
    if (play === undefined) run();
  });

  $: if (play) run();
</script>

{#each words as word, i}
  <span bind:this={els[i]}>{word}&nbsp;</span>
{/each}

<style>
  span {
    display: inline-block;
    transform: translateY(100%);
    clip-path: inset(0 0 100% 0);
    transition: transform 0.4s, clip-path 0.4s;
  }
</style>
