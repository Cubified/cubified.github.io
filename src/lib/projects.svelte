<script>
  import { fade } from 'svelte/transition';

  export let ready = false;
  export let projects = [];

  let x = 0,
    fired = false,
    parent, viewing = -1, last = 0;
  const els = [];

  const scroll = (e) => {
    x = Math.ceil(e.target.scrollLeft);

    /*
    if (x + e.target.offsetWidth >= e.target.scrollWidth) {
      x = 1;
      e.target.scrollTo(x, 0);
    } else if (x <= 0) {
      x = e.target.scrollWidth - e.target.offsetWidth - 1;
      e.target.scrollTo(x, 0);
    }
    */

    if (!parent || !els.length) return;
    els.forEach((el) => {
      el.style.transform = 'scale(1)';
      el.offsetHeight; // Reflow

      const rect = el.getBoundingClientRect();
      const center = window.innerWidth / 2;
      const val = Math.pow(
        Math.sin(((Math.PI / 2) * (rect.left + rect.width / 2)) / center),
        window.innerWidth <= 500 ? 1 : 2
      );
      const clamp = Math.max(0.5, Math.min(1, val));
      el.style.transform = `scale(${clamp})`;
      el.style.opacity = clamp;
    });
  };

  $: if (ready && !fired) {
    setTimeout(() => {
      parent.parentNode.scrollTo(window.innerWidth * 0.3, 0);
      scroll({ target: parent.parentNode });
      window.addEventListener('resize', () => {
        if (!parent?.parentNode) return;
        scroll({ target: parent.parentNode });
      });
      fired = true;
    }, 700);

    if (parent) {
      const ua = navigator.userAgent;
      if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
        parent.classList.add('mobile');
      } else {
        parent.classList.remove('mobile');
      }
    }
  }
</script>

<div on:scroll={scroll} class="container" style={`opacity: ${fired ? 1 : 0}`}>
  <div bind:this={parent} class="projects mobile">
    {#each projects as { name, img, langs, desc, url }, i}
      <div bind:this={els[i]} class="project">
        <div class="image">
          <img src={img} alt={name} />
        </div>
        <a href={url}>{name}</a>
        <p>{langs.join(', ')}</p>
        <p>{desc}</p>
        <button
          class:open={viewing === i}
          on:click={() => {
            if (viewing === i) viewing = -1;
            else {
              viewing = i;
              last = viewing;
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
        </button>
      </div>
    {/each}
  </div>
</div>

<div class="info" class:open={viewing > -1}>
  <div class="content">
    {#key last}
      <div transition:fade={{duration: 200}}>
        <h3>Challenges:</h3>
        <ul>
          {#each projects[last].chall as ch}
            <li>{ ch }</li>
          {/each}
        </ul>
        <h3>Lessons:</h3>
        <ul>
          {#each projects[last].less as le}
            <li>{ le }</li>
          {/each}
        </ul>
      </div>
    {/key}
  </div>
</div>

<style>
  .info {
    background: var(--color-brown);
    height: 0;
    overflow: hidden;
    transition: height 0.2s;

    --info-size: 300px;
  }
  .info.open {
    height: var(--info-size);
  }

  .info .content {
    width: var(--info-size);
    height: var(--info-size);
    background: var(--color-red);
    border-radius: 100vw;
    position: relative;
    overflow: hidden;
    top: -50vw;
    margin: 0 auto;
    transition: border-radius 0.3s ease 0.1s, top 0.3s, width 0.2s ease 0.15s;
  }
  .info.open .content {
    width: 100vw;
    border-radius: 0;
    top: 0;
  }
  .info .content div {
    width: 90vw;
    max-width: 20rem;
    padding-top: 1rem;
    position: absolute;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .info .content h3 {
    margin: 0;
  }
  .info .content ul {
    margin-top: 0.5rem;
  }

  .container {
    width: 100%;
    overflow: auto;
    padding: 2rem 0;
    transition: opacity 0.3s;
  }
  .projects {
    width: 140rem;
    flex: 1;
    display: flex;
    padding: 0 40vw;
  }
  .projects.mobile .project:not(:last-child) {
    transition: transform 0.1s;
  }
  .project {
    width: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    min-height: min-content;
  }
  .project .image {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .project img {
    flex: 1;
    width: 100%;
    max-width: 800px;
    margin-bottom: 1rem;
    box-shadow: 2px 2px 0 var(--color-black);
    border-radius: 6px;
  }

  button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--color-tan);
    border-radius: 18px;
    cursor: pointer;
    position: absolute;
    bottom: -1.5rem;
    transition: transform 0.2s;
  }
  button:hover {
    background: var(--color-tan);
  }
  button svg {
    fill: var(--color-tan);
  }
  button:hover svg {
    fill: var(--color-red);
  }
  button.open {
    transform: rotate(180deg);
  }
</style>
