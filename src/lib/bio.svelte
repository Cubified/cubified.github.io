<script>
  import { tick } from 'svelte';
  import { base } from '$app/paths';
  import Revealer from '$lib/revealer.svelte';
  import Observer from '$lib/observer.svelte';
  import Projects from '$lib/projects.svelte';

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
    }
  ];

  const run = async (i) => {
    await tick();
    setTimeout(() => {
      play[i] = true;
      content.children[i].children[0].style.width = '100%';
      setTimeout(() => {
        content.children[i].children[0].style.transition = 'none';
      }, 600);
    }, i * 100);
  };

  let content,
    ready = false,
    y = 0;

  let play = new Array(5).fill(false);
</script>

<svelte:window bind:scrollY={y} />

<div class="bio">
  <div class="bar first" />
  <div class="bar second" />
  <div class="bar third" />
  <div bind:this={content} class="content">
    <Observer callback={() => run(0)}>
      <div class="child first">
        <div class="box">
          <h2>
            <Revealer play={play[0]} string="About Me" delay={300} />
          </h2>
          <p>
            I am an undergraduate computer science student at UC San Diego,
            interested in <b
              >graphics, embedded systems, and full-stack web development</b
            >. I have 7 years of self-taught programming experience working with
            <b>C and JavaScript</b>, and am also comfortable working with
            <b>x86/ARM Assembly, Java, and GLSL</b>.
          </p>
        </div>
      </div>
    </Observer>

    <Observer callback={() => run(1)}>
      <div class="child second">
        <div class="box">
          <h2>
            <Revealer play={play[1]} string="Experience" delay={300} />
          </h2>
          <p>
            Currently I am a software engineer intern at <a
              href="http://trulioo.com">Trulioo</a
            >, where I work on implementing <b>proof-of-concept projects</b> and
            developing
            <b>full-stack WordPress themes</b>.

            <br />
            <br />

            I am also an <b>Engineering Manager</b> with
            <a href="https://tse.ucsd.edu">Triton Software Engineering</a> at
            UCSD, responsible for leading 8 developers in implementing a landing
            page for Los Angeles-based non-profit
            <a href="https://fixnation.org">FixNation</a>.
          </p>
        </div>
      </div>
    </Observer>

    <Observer
      callback={() => {
        run(2);
        ready = true;
      }}
    >
      <div class="child third">
        <div class="projects">
          <h2 class="box">
            <Revealer play={play[2]} string="Projects" delay={300} />
          </h2>
          <p class="scroller">
            <Projects {ready} {projects} />
          </p>
        </div>
      </div>
    </Observer>

    <Observer callback={() => run(3)}>
      <div class="child fourth">
        <div class="box">
          <h2>
            <Revealer play={play[3]} string="Resume & Contact" delay={300} />
          </h2>
          <p>
            <a class="contact" href="{base}/resume.pdf">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="-10 0 404 512"
                ><path
                  d="M64 0q-27 1 -45 19v0q-18 18 -19 45v384q1 27 19 45t45 19h256q27 -1 45 -19t19 -45v-288h-128q-14 0 -23 -9t-9 -23v-128h-160v0zM256 0v128h128l-128 -128v0zM256 256q-1 27 -19 45v0q-18 18 -45 19q-27 -1 -45 -19t-19 -45q1 -27 19 -45t45 -19q27 1 45 19t19 45v0z M80 432q1 -34 23 -57v0q23 -22 57 -23h64q34 1 57 23q22 23 23 57q-1 15 -16 16h-192q-15 -1 -16 -16v0z"
                /></svg
              >
              Resume
            </a>
            <br />
            <a class="contact" href="https://github.com/Cubified">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
                ><path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                /></svg
              >
              GitHub
            </a>
            <br />
            <a class="contact" href="https://linkedin.com/in/andrewlrussell">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                ><path
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                /></svg
              >
              LinkedIn
            </a>
            <br />
            <span class="contact">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                ><path
                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                /></svg
              >
              alrussell (at) ucsd.edu
            </span>
          </p>
        </div>
      </div>
    </Observer>
  </div>
</div>

<style>
  @keyframes slide {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  .bio {
    width: 100%;
    min-height: 100vh;
    background: var(--color-brown);
    border-top: 2rem solid var(--color-tan);
  }
  .bar {
    width: 100%;
    border-top: 2rem solid var(--color-orange);
  }
  .bar.second {
    border-top: 2rem solid var(--color-red);
  }
  .bar.third {
    border-top: 2rem solid var(--color-blue);
    box-sizing: border-box;
  }
  .bio h2 {
    margin: 0;
  }
  .bio p {
    animation: slide 1s;
  }
  .bio p .contact {
    display: flex;
    align-items: center;
  }
  .bio p .contact svg {
    width: 1.5rem;
    fill: var(--color-tan);
    margin-right: 0.5rem;
    filter: drop-shadow(1px 1px 0 var(--color-black));
  }

  .content .child {
    width: 0;
    transition: width 0.6s;
  }
  .projects {
    padding: 2rem 0 0 0;
  }
  .content .child .box {
    width: 35rem;
    max-width: 75vw;
    margin: 0 auto !important;
    padding: 2rem 0;
  }
  h2.box {
    padding: 0 !important;
  }

  .content .child .scroller {
    overflow: hidden;
  }

  .content .first {
    background: var(--color-orange);
  }
  .content .second {
    background: #344d67;
  }
  .content .third {
    background: var(--color-red);
  }
  .content .fourth {
    background: var(--color-brown);
  }
  /*
  .content .fifth {
    background: var(--color-orange);
  }
  */
</style>
