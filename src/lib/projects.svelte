<script>
  export let ready = false;
  export let projects = [];

  let x = 0,
    fired = false,
    parent;
  const els = [];

  const scroll = (e) => {
    x = Math.ceil(e.target.scrollLeft);

    if (x + e.target.offsetWidth >= e.target.scrollWidth) {
      x = 1;
      e.target.scrollTo(x, 0);
    } else if (x <= 0) {
      x = e.target.scrollWidth - e.target.offsetWidth - 1;
      e.target.scrollTo(x, 0);
    }

    if (!parent || !els.length) return;
    els.forEach((el) => (el.style.transform = 'scale(1)'));
    els[0].offsetHeight; // Reflow
    els.forEach((el) => {
      const center =
        parent.scrollLeft - el.offsetWidth / 2 + parent.offsetWidth / 2;
      const val = Math.pow(
        Math.sin((Math.PI * el.getBoundingClientRect().left) / center),
        2
      );
      const clamp = Math.max(0.5, Math.min(1, val));
      el.style.transform = `scale(${clamp})`;
      el.style.opacity = clamp;
    });
  };

  $: if (ready && !fired) {
    setTimeout(() => {
      scroll({ target: parent.parentNode });
      window.addEventListener('resize', () =>
        scroll({ target: parent.parentNode })
      );
      fired = true;
    }, 700);
  }
</script>

<div on:scroll={scroll} class="container" style={`opacity: ${fired ? 1 : 0}`}>
  <div bind:this={parent} class="projects">
    {#each [...projects, ...projects] as { name, img, langs, desc, url }, i}
      <div bind:this={els[i]} class="project">
        <div class="image">
          <img src={img} alt={name} />
        </div>
        <a href={url}>{name}</a>
        <p>{langs.join(', ')}</p>
        <p>{desc}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    width: 100vw;
    overflow: auto;
    padding: 2rem 0;
    transition: opacity 0.3s;
  }
  .projects {
    width: 200vw;
    flex: 1;
    display: flex;
  }
  .project {
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
</style>
