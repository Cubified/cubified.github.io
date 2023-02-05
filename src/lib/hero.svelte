<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import Revealer from '$lib/revealer.svelte';

  const colors = ['blue', 'red', 'orange', 'tan'];
  const color_els = [];
  let circles;

  onMount(() => {
    setTimeout(() => {
      color_els.forEach((el, i) => {
        setTimeout(() => {
          el.style.transform = 'scaleX(1)';
        }, i * 150);
      });
      circles.style.clipPath = 'circle(50% at 50% 50%)';
    }, 100);
  });
</script>

<div class="intro">
  <div class="bars">
    {#each colors as color, i}
      <div bind:this={color_els[i]} class={`bar ${color}`} />
    {/each}
  </div>

  <div class="hero">
    <div>
      <h1>
        <Revealer string="Hi, I'm Andrew Russell." />
      </h1>
      <h3>
        <Revealer
          string="I'm a computer science student studying at UC San Diego."
          delay={200}
          interval={50}
        />
      </h3>
    </div>
  </div>

  <div bind:this={circles} class="circles">
    <div class="circ first">
      <div class="circ second">
        <div class="circ third">
          <div class="circ fourth">
            <img src="{base}/me.png" alt="Andrew Russell" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .intro {
    height: 100vh;
    min-height: 43rem;
  }

  .bars {
    width: 100vw;
    margin-top: 2rem;
    transform: rotate(-30deg) translate(-10vw, -20vw);
    overflow: hidden;
  }
  @media only screen and (max-width: 450px) {
    .bars {
      width: 110vw;
      transform: rotate(-30deg) translate(-10vw, -30vw);
    }
  }
  .bar {
    width: 100%;
    height: 2rem;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 1.2s;
  }
  @media only screen and (max-width: 500px) {
    .bar {
      transition: transform 0.8s;
    }
  }
  .bar.red {
    background: var(--color-red);
  }
  .bar.blue {
    background: var(--color-blue);
  }
  .bar.orange {
    background: var(--color-orange);
  }
  .bar.tan {
    background: var(--color-tan);
  }

  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .circles {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 3s ease-out;
  }
  @media only screen and (max-width: 800px) {
    .circles {
      transition: clip-path 1s ease-out;
    }
  }
  @media only screen and (max-width: 500px) {
    .circles {
      margin-right: 0;
    }
  }
  .circ {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circ.first {
    width: 20rem;
    height: 20rem;
    border-radius: 10rem;
    background: var(--color-blue);
  }
  .circ.second {
    width: 18rem;
    height: 18rem;
    border-radius: 9rem;
    background: var(--color-red);
  }
  .circ.third {
    width: 16rem;
    height: 16rem;
    border-radius: 8rem;
    background: var(--color-orange);
  }
  .circ.fourth {
    width: 14rem;
    height: 14rem;
    border-radius: 7rem;
    background: var(--color-tan);
  }
  .circ img {
    width: 12rem;
    border-radius: 6rem;
  }
</style>
