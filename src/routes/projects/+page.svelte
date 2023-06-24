<script>
  import { base } from '$app/paths';

  import Background from '$lib/background.svelte';
  import Ball from '$lib/ball.svelte';
</script>

<svelte:head>
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
  <meta charset="utf-8" />
  <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="description"
    content="A personal portfolio site for UC San Diego computer science student Andrew Russell."
  />
  <title>Andrew Russell - Projects</title>
</svelte:head>

<Background />
<Ball />
