<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  import CirclePacker from 'circlepacker';

  const projects = [
    {
      name: 'tuibox',
      img: 'https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif',
      url: 'https://github.com/Cubified/tuibox',
      langs: ['C'],
      desc: 'A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line.',
    },
    {
      name: 'mode7',
      img: `${base}/mode7.gif`,
      url: 'https://github.com/Cubified/mode7',
      langs: ['JavaScript'],
      desc: 'A pure-Javascript perspective transform (a la SNES Mode 7).',
    },
    {
      name: 'Trulioo.com',
      img: `${base}/trulioo.png`,
      url: 'https://www.trulioo.com',
      langs: ['JavaScript', 'PHP'],
      desc: 'Designed and implemented a custom 3D globe component from scratch using WebGL.  Also created all animations on site homepage with CSS and JS.',
    },
    {
      name: 'ntwm',
      img: 'https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png',
      url: 'https://github.com/Cubified/ntwm',
      langs: ['C'],
      desc: 'A tiny, frameless, keyboard-driven tiling window manager with multimonitor support.',
    },
    {
      name: 'lush',
      img: 'https://github.com/Cubified/lush/raw/main/demo.gif',
      url: 'https://github.com/Cubified/lush',
      langs: ['x86 Assembly', 'C'],
      desc: 'A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly.',
    },
    {
      name: 'Make-A-Wish Volunteer Hub',
      img: `${base}/maw.png`,
      url: 'https://github.com/TritonSE/MAW-Volunteer-Hub',
      langs: ['React.js', 'MongoDB'],
      desc: 'A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering.',
    },
    {
      name: 'Y-Stem and Chess',
      img: `${base}/ysc.png`,
      url: 'https://github.com/TritonSE/YSC-Mobile-Application',
      langs: ['TypeScript', 'React Native'],
      desc: 'A real-time chess mobile application, built as part of Triton Software Engineering.',
    },
    // { name: 'FixNation Landing Page', img: '', url: 'https://github.com/TritonSE/FIX-Landing-Page', desc: 'placeholder' },
    {
      name: 'bdfedit',
      img: 'https://github.com/Cubified/bdfedit/raw/main/demo.gif',
      url: 'https://github.com/Cubified/bdfedit',
      langs: ['C'],
      desc: 'A terminal-based, mouse-driven BDF (bitmap) font editor.',
    },
    {
      name: 'term',
      img: 'https://github.com/Cubified/term/raw/main/demo.gif',
      url: 'https://github.com/Cubified/term',
      langs: ['C'],
      desc: 'A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support.',
    },
    {
      name: 'React Simple Scheduler',
      img: 'https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png',
      url: 'https://github.com/Cubified/react-simple-scheduler',
      langs: ['TypeScript', 'React', 'SASS'],
      desc: 'Simple, extensible scheduler and calendar components for React, modeled after Google Calendar.',
    },
    {
      name: 'Softbody',
      img: 'https://github.com/Cubified/softbody/raw/main/demo.png',
      url: 'https://github.com/Cubified/softbody',
      langs: ['JavaScript'],
      desc: 'A simple soft body physics simulation for n-sided polygons.',
    }
  ];

  const random = (min, max) => Math.random() * (max - min) + min;

  let container, packer, circles;
  onMount(() => {
    let bounds = { width: container.offsetWidth, height: container.offsetHeight };
    circles = projects.map(() => ({
      id: Math.random().toString(),
      radius: 50,
      position: {
        x: random(-10, 10) + bounds.width / 2,
        y: random(-10, 10) + bounds.height / 2,
      },
    }));

    const render = (c) => {
      requestAnimationFrame((time) => {
        let i = 0;
        for (let id in c) {
          const circle = c[id];
          const x = circle.position.x - circle.radius;
          const y = circle.position.y - circle.radius;

          const el = container.children[i++];
          el.style.width = (circle.radius * 2) + 'px';
          el.style.height = (circle.radius * 2) + 'px';
          el.style.transform = `translateX(${ x }px) translateY(${ y }px)`;
        }
      });
    };

    packer = new CirclePacker({
      bounds,
      target: { x: bounds.width / 2, y: bounds.height / 2 },
      circles,
      onMove: render,
      collisionPasses: 3,
      centeringPasses: 2,
    });

    window.addEventListener('resize', () => {
      if (!container) return;

      bounds = { width: container.offsetWidth, height: container.offsetHeight };
      packer.setBounds(bounds);
      packer.setTarget({ x: bounds.width / 2, y: bounds.height / 2 });
    });
  });

  let active = new Array(projects.length).fill(false);
</script>

<div bind:this={container} class="container">
  {#each projects as p, i}
    <div
      class="item"
      class:active={active[i]}
      on:click={(e) => {
        if (active[i]) {
          e.target.classList.remove('active');
          packer.setCircleRadius(circles[i], 50);
          active[i] = false;
        } else {
          e.target.classList.add('active');
          packer.setCircleRadius(circles[i], 150);
          active[i] = true;
        }
      }}
    >
      {p.name}
      {#if active[i]}
        <br />
        <br />
        <small>
          {p.desc}
          <br />
          <br />
          <a href={p.url}>{p.url}</a>
        </small>
      {/if}
    </div>
  {/each}
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
  }

  .item {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: #444;
    position: absolute;
    transition:
      border-radius 0.6s, background 0.2s,
      color 0.2s, width 0.4s,
      height 0.4s, transform 0.2s;
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
  .item:hover, :global(.item.active) {
    background: var(--color-light) !important;
    color: var(--color-dark) !important;
  }
  .item:hover small, :global(.item.active small) {
    color: var(--color-dark);
  }
  :global(.item.active) {
    z-index: 999;
  }

  a {
    color: var(--color-dark);
  }
</style>
