<script>
  import { onMount } from 'svelte';
  export let callback = () => {};

  let el,
    visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (!visible) {
          visible = entries[0].isIntersecting;
          if (visible) callback();
        }
      },
      {
        root: null,
        rootMargin: '0px'
      }
    );
    obs.observe(el);
  });
</script>

<div bind:this={el} style={`opacity: ${visible ? 1 : 0}`}>
  <slot />
</div>

<style>
  div {
    transition: opacity 0.3s;
  }
</style>
