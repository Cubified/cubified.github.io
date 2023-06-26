<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { base } from '$app/paths';

  import CirclePacker from 'circlepacker';

  const projects = [
    {
      name: 'tuibox',
      img: 'https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif',
      url: 'https://github.com/Cubified/tuibox',
      langs: ['C'],
      desc: 'A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line.'
    },
    {
      name: 'mode7',
      img: `${base}/mode7.gif`,
      url: 'https://github.com/Cubified/mode7',
      langs: ['JavaScript'],
      desc: 'A pure-Javascript perspective transform (a la SNES Mode 7).'
    },
    {
      name: 'Trulioo.com',
      img: `${base}/trulioo.png`,
      url: 'https://www.trulioo.com',
      langs: ['JavaScript', 'PHP'],
      desc: 'Designed and implemented a custom 3D globe component from scratch using WebGL.  Also created all animations on site homepage with CSS and JS.'
    },
    {
      name: 'ntwm',
      img: 'https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png',
      url: 'https://github.com/Cubified/ntwm',
      langs: ['C'],
      desc: 'A tiny, frameless, keyboard-driven tiling window manager with multimonitor support.'
    },
    {
      name: 'lush',
      img: 'https://github.com/Cubified/lush/raw/main/demo.gif',
      url: 'https://github.com/Cubified/lush',
      langs: ['x86 Assembly', 'C'],
      desc: 'A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly.'
    },
    {
      name: 'Make-A-Wish Volunteer Hub',
      img: `${base}/maw.png`,
      url: 'https://github.com/TritonSE/MAW-Volunteer-Hub',
      langs: ['React.js', 'MongoDB'],
      desc: 'A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering.'
    },
    {
      name: 'Y-Stem and Chess',
      img: `${base}/ysc.png`,
      url: 'https://github.com/TritonSE/YSC-Mobile-Application',
      langs: ['TypeScript', 'React Native'],
      desc: 'A real-time chess mobile application, built as part of Triton Software Engineering.'
    },
    // { name: 'FixNation Landing Page', img: '', url: 'https://github.com/TritonSE/FIX-Landing-Page', desc: 'placeholder' },
    {
      name: 'bdfedit',
      img: 'https://github.com/Cubified/bdfedit/raw/main/demo.gif',
      url: 'https://github.com/Cubified/bdfedit',
      langs: ['C'],
      desc: 'A terminal-based, mouse-driven BDF (bitmap) font editor.'
    },
    {
      name: 'term',
      img: 'https://github.com/Cubified/term/raw/main/demo.gif',
      url: 'https://github.com/Cubified/term',
      langs: ['C'],
      desc: 'A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support.'
    },
    {
      name: 'React Simple Scheduler',
      img: 'https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png',
      url: 'https://github.com/Cubified/react-simple-scheduler',
      langs: ['TypeScript', 'React', 'SASS'],
      desc: 'Simple, extensible scheduler and calendar components for React, modeled after Google Calendar.'
    },
    {
      name: 'Softbody',
      img: 'https://github.com/Cubified/softbody/raw/main/demo.png',
      url: 'https://github.com/Cubified/softbody',
      langs: ['JavaScript'],
      desc: 'A simple soft body physics simulation for n-sided polygons.'
    },
    {
      name: 'FixNation Landing Page',
      img: `${base}/fix.png`,
      url: 'https://landing.fixnation.org',
      langs: ['JavaScript', 'Svelte'],
      desc: 'A landing page for Los Angeles-based spay and neuter clinic FixNation.'
    }
  ];

  const random = (min, max) => Math.random() * (max - min) + min;

  let container,
    packer,
    circles,
    img,
    ready = false,
    loaded = false,
    src = null,
    alt = '';
  onMount(() => {
    let bounds = {
      width: container.offsetWidth,
      height: container.offsetHeight
    };
    circles = projects.map(() => ({
      id: Math.random().toString(),
      radius: 50,
      position: {
        x: random(-10, 10) + bounds.width / 2,
        y: random(-10, 10) + bounds.height / 2
      }
    }));

    const render = (c) => {
      requestAnimationFrame(() => {
        if (!container) return;

        let i = 0;
        for (let id in c) {
          const circle = c[id];
          const x = circle.position.x - circle.radius;
          const y = circle.position.y - circle.radius;

          const el = container.children[i++];
          el.style.width = circle.radius * 2 + 'px';
          el.style.height = circle.radius * 2 + 'px';
          el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
      });
    };

    packer = new CirclePacker({
      bounds,
      target: { x: bounds.width / 2, y: bounds.height / 2 },
      circles,
      onMove: render,
      collisionPasses: 3,
      centeringPasses: 2
    });

    window.addEventListener('resize', () => {
      if (!container) return;

      bounds = { width: container.offsetWidth, height: container.offsetHeight };
      packer.setBounds(bounds);
      if (active.ind === -1) {
        packer.setTarget({ x: bounds.width / 2, y: bounds.height / 2 });
      } else {
        packer.setTarget({ x: bounds.width / 2, y: 0 });
      }
    });

    img.addEventListener('load', () => { loaded = true; });

    ready = true;
  });

  let active = { el: null, ind: -1 }, prev = -1;
</script>

<div bind:this={container} class="container" class:ready>
  {#each projects as p, i}
    <div
      class="item"
      class:active={active.ind === i}
      class:faded={prev > -1 && i !== prev}
      on:click={(e) => {
        if (active.ind === i) {
          e.target.classList.remove('active');
          packer.setCircleRadius(circles[i], 50);
          active = { el: null, ind: -1 };

          loaded = false;
          setTimeout(() => {
            src = null;
            alt = '';
            prev = -1;
          }, 250);

          let bounds = { width: container.offsetWidth, height: container.offsetHeight };
          packer.setTarget({ x: bounds.width / 2, y: bounds.height / 2 });
        } else {
          if (active.ind > -1) {
            active.el.classList.remove('active');
            packer.setCircleRadius(circles[active.ind], 50);
          }

          e.target.classList.add('active');
          packer.setCircleRadius(circles[i], 150);
          packer.dragStart(circles[i].id);
          packer.drag(circles[i].id, { x: container.offsetWidth / 2, y: 0 });
          packer.dragEnd(circles[i].id);
          active = { el: e.target, ind: i };

          loaded = false;
          setTimeout(() => {
            src = null;
            alt = '';
            setTimeout(() => {
              src = p.img;
              alt = p.name;
            }, 250);
            prev = i;
          }, 250);

          packer.setTarget({ x: container.offsetWidth / 2, y: 0 });
        }
      }}
      on:keydown={(e) => {
        if (e.key === 'Enter') e.target.click();
      }}
    >
      {#if active.ind !== i}
        <span
          in:fade={{delay: 300, duration: 200}}
          out:fade={{duration: 100}}
        >
          {p.name}
        </span>
      {:else}
        <span
          in:fade={{delay: 300, duration: 200}}
          out:fade={{duration: 100}}
        >
          {p.name}
          <br />
          <br />
          <small>
            {p.desc}
            <br />
            <br />
            Built with: {p.langs.join(', ')}
            <br />
            <br />
            <a href={p.url}>{p.url}</a>
          </small>
        </span>
      {/if}
    </div>
  {/each}
  <img
    bind:this={img}
    class="img"
    style="opacity: {0 + loaded}"
    {src}
    {alt}
  />
</div>

<style>
  .container {
    width: 100vw;
    height: 100vh;
    height: -webkit-fill-available;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    user-select: none;
    overflow: hidden;
    opacity: 0;
    background-size: 20rem;
    background-repeat: no-repeat;
    background-position: center bottom;
  }
  .container.ready {
    opacity: 1;
  }

  .item {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: #444;
    position: absolute;
    transition: border-radius 0.6s, background 0.2s, color 0.2s, width 0.4s,
      height 0.4s, transform 0.2s, opacity 0.2s;
    cursor: pointer;
    box-sizing: border-box;
    padding: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
    transform: translate(50vw, 50vh);
  }
  .item.faded {
    opacity: 0.1;
  }
  .item:hover,
  :global(.item.active) {
    background: var(--color-light) !important;
    color: var(--color-dark) !important;
    opacity: 1;
  }
  .item:hover span,
  .item:hover span small,
  :global(.item.active span),
  :global(.item.active span small) {
    color: var(--color-dark);
  }
  :global(.item.active) {
    z-index: 999;
  }

  .img {
    height: 30vh;
    max-height: 30rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: opacity 0.2s;
  }

  a {
    color: var(--color-dark);
  }
</style>
