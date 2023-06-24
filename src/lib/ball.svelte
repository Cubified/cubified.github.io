<script>
  import * as THREE from 'three';
  import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

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

  const gen_points = (samples = 10, scale = 1) => {
    let points = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);

      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      points.push([x * scale, y * scale, z * scale]);
    }

    return points;
  };

  let container, boxes = [], open = -1;
  onMount(() => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(-13.6, 6.4, 12);

    const scene = new THREE.Scene();

    let points = gen_points(boxes.length, 5);
    let last_n = 1;
    const dur = 100;
    const objs = [];
    for (let i = 0; i < boxes.length; i++) {
      const box = new CSS3DSprite(boxes[i]);
      box.element.addEventListener('pointerdown', () => {
        open = i;
      });
      box.userData = {
        accel: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        origin: new THREE.Vector3(...points[i]),
      };
      box.position.copy(box.userData.origin);
      scene.add(box);
      objs.push(box);
    }

    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.domElement.classList.add('render');

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    const clamp = (x, min, max) =>
      Math.max(min, Math.min(max, x));

    const ease = (x) =>
      (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const animation = (time) => {
      requestAnimationFrame(animation);

      for (let i = 0; i < objs.length; i++) {
        const d = objs[i].position.distanceTo(camera.position) - 19;
        const s = clamp(Math.exp(-d / 2), 0.5, 1);
        objs[i].scale.set(s, s, s);
        objs[i].element.style.opacity = s;
      }

      controls.update();
      renderer.render(scene, camera);
    }
    animation(performance.now());

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize, false);
  });
</script>

<div class="border" />
<div bind:this={container} class="container" />
{#if open > -1}
  <div class="description">
    { projects[open].desc }
    <br />
    <br />
    <a href={projects[open].url}>
      {projects[open].url}
    </a>
  </div>
{/if}

{#each projects as p, i}
  <div bind:this={boxes[i]} class="box">
    <div class="flex">
      { p.name }
    </div>
  </div>
{/each}

<style>
  .container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  @media only screen and (max-width: 500px) {
    :global(.render) {
      position: relative;
      top: -6rem;
    }
  }

  .border {
    width: calc(100vw - 6rem);
    height: calc(100vh - 6rem);
    box-sizing: border-box;
    border: 1rem solid var(--color-light);
    margin: 3rem;
    padding: 3rem;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    mix-blend-mode: difference;
  }
  .box {
    font-size: 0.5px;
    text-align: center;
    width: 3px;
    height: 3px;
    padding: 0.1px;
    box-sizing: border-box;
    background: var(--color-light);
    cursor: pointer;
    opacity: 0;
    transition: background 0.15s, opacity 0.2s;
  }
  .box:hover {
    background: var(--color-dark);
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5px;
    color: var(--color-dark);
  }
  .box:hover .flex {
    color: var(--color-light);
  }

  .description {
    width: 23rem;
    max-width: calc(100vw - 10rem);
    line-break: anywhere;
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 5rem;
    transform: translateX(-50%);
    z-index: 999;
  }
  @media only screen and (min-width: 500px) {
    .description {
      width: 40rem;
      hyphens: auto;
      line-break: unset;
    }
  }
</style>
