<script>
  import { base } from '$app/paths';

  import Border from '$lib/border.svelte';
  import Background from '$lib/background.svelte';
</script>

<svelte:head>
  <meta charset="utf-8" />
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
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="description"
    content="A personal portfolio site for UC San Diego computer science student Andrew Russell."
  />
  <title>Andrew Russell</title>
</svelte:head>

<Border />

<main>
  <h1>Hi, I'm Andrew Russell.</h1>
  <h2>I write software.</h2>
  <br />
  <div>
    <a href="/about">About</a>
    &nbsp;/&nbsp;
    <a href="/projects">Projects</a>
  </div>
  <br />
  <div>
    <a href="/resume.pdf">Resume</a>
    &nbsp;/&nbsp;
    <a href="https://github.com/Cubified">GitHub</a>
    &nbsp;/&nbsp;
    <a href="https://linkedin.com/in/andrewlrussell">LinkedIn</a>
  </div>
</main>

<Background />

<style>
  main {
    width: calc(100vw - 6rem);
    height: calc(100vh - 6rem);
    box-sizing: border-box;
    margin: 3rem;
    padding: 3rem;

    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    text-shadow: 0 2px 0 var(--color-dark);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    box-shadow: inset 0 -0.1em var(--color-light);
    padding: 0.2rem 0.25rem;
    line-height: 1.5;
    transition: box-shadow 0.2s, color 0.2s, text-shadow 0.2s;
  }
  a:hover {
    box-shadow: inset 0 -1.7rem var(--color-light);
    color: var(--color-dark);
    text-shadow: none;
  }
</style>
