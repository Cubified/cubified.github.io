<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  import Background from '$lib/background.svelte';

  /*
   * VECTOR PRIMITIVE
   */
  class vec2 {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
    distance(p){
      return Math.sqrt(
        (p.x - this.x) * (p.x - this.x) +
        (p.y - this.y) * (p.y - this.y)
      );
    }
    copy(){
      return new vec2(
        this.x,
        this.y
      );
    }
    length(){
      return this.distance(new vec2(0, 0));
    }
    norm(){
      let len = this.length();
      return new vec2(
        this.x / len,
        this.y / len
      );
    }
    add(p){
      return new vec2(
        this.x + p.x,
        this.y + p.y
      );
    }
    add_s(n){
      return new vec2(
        this.x + n,
        this.y + n
      );
    }
    sub(p){
      return new vec2(
        this.x - p.x,
        this.y - p.y
      );
    }
    sub_s(n){
      return new vec2(
        this.x - n,
        this.y - n
      );
    }
    mult(p){
      return new vec2(
        this.x * p.x,
        this.y * p.y
      );
    }
    mult_s(n){
      return new vec2(
        n * this.x,
        n * this.y
      );
    }
    dot(v){
      return (this.x * v.x) + (this.y * v.y);
    }
  }

  /*
   * POINT HELPER CLASS
   */
  class Point extends vec2 {
    constructor(x, y, xo, yo) {
      super(x, y);

      this.origin = new vec2(x-(xo ?? 0), y-(yo ?? 0));
      this.velocity = new vec2(0, 0);
      this.acceleration = new vec2(0, 0);
      this.noUpdate = false;
    }
    update(){ // Not to be called manually!
      if (this.noUpdate) return;

      this.x += this.velocity.x;
      this.y += this.velocity.y;

      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;
    }
  }

  /*
   * PHYSICS OBJECTS
   */
  class Spring {
    constructor(a, b, props_arg){
      this.points = [a, b];
      this.from = a;
      this.to = b;
      let props = props_arg ?? {};
      this.props = {
        d0: props.d0 ?? a.distance(b),
        k: props.k ?? 0.001,
        mass: props.mass ?? 100,
        damping: props.damping ?? 0.05
      };

      this.first_update = true; // Fun little pop-in animation
    }
    update(){
      if(this.first_update){
        this.first_update = false;
        this.from.x *= 1.1;
        this.from.y *= 1.1;
      }

      let Fnet = (this.props.k * (this.from.distance(this.to) - this.props.d0)),
        vec = this.to.sub(this.from).mult_s(0.5);

      this.from.acceleration = vec.mult_s(Fnet / this.props.mass);
      this.from.acceleration = this.from.acceleration.sub(this.from.velocity.mult_s(this.props.damping));

      this.to.acceleration = vec.mult_s(-Fnet / this.props.mass);
      this.to.acceleration = this.to.acceleration.sub(this.to.velocity.mult_s(this.props.damping));

      this.from.update();
      this.to.update();
    }
  }

  class Body {
    constructor(p, c) {
      this.points = [];
      for (let i = 0; i < p.length; i++) {
        this.points.push(new Point(p[i][0], p[i][1]));
      }

      this.springs = [];
      for (let i = 0; i < c.length; i++) {
        this.springs.push(new Spring(this.points[c[i][0]], this.points[c[i][1]]));
      }
    }
    update() {
      for (let i = 0; i < this.springs.length; i++) {
        this.springs[i].update();
      }
    }
  }

  class SpringBody {
    constructor(n, r, x, y){
      let arr = [];
      for(let i=2*Math.PI;i>=0;i-=(2*Math.PI)/n){
        arr.push(new Point(x + (r*Math.cos(i)), y + (r*Math.sin(i))));
      }
      this.points = arr;

      this.springs = [];
      arr.forEach(p1 => {
        arr.forEach(p2 => {
          if(p1 !== p2){
            let hit = false;
            this.springs.forEach(spr => {
              if((spr.from === p1 && spr.to === p2) ||
                 (spr.from === p2 && spr.to === p1)) hit = true;
            });
            if(!hit) this.springs.push(new Spring(p1, p2));
          }
        });
      });
    }
    update(){
      this.springs.forEach(s => {
        s.update();
      });
    }
  }

  class World {
    constructor(fn){
      this.objects = [];
      this.fn = fn;

      this.loop = this.loop.bind(this);
    }
    get points(){
      let out = [];
      this.objects.forEach(obj => {
        out.push(...obj.points);
      });
      return out;
    }
    add(obj){
      this.objects.push(obj);
    }
    loop(){
      requestAnimationFrame(this.loop);
      this.objects.forEach(obj => {
        obj.update();
      });

      this.fn();
    }
  }

  let parent, boxes = [];
  onMount(() => {
    let body;
    if (window.innerWidth <= 500) {
      const x = (window.innerWidth <= 500 ? 10 : (window.innerWidth - boxes[0].offsetWidth) / 2);
      body = new Body([
        [x, 10],
        [x, 235],
        [x, 510]
      ], [
        [0, 1], [1, 2], [0, 2]
      ], 135, 250);
    } else {
      body = new SpringBody(3, 250, 125, 250);
    }
    const w = new World(() => {
      for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i]) continue;
        boxes[i].style.top = body.points[i].y + 'px';
        boxes[i].style.left = body.points[i].x + 'px';
      }
    });
    w.add(body);
    w.loop();

    let mouse = null, start = null, zIndex = 1;
    const mousedown = (e) => {
      let tmp = e.target;
      let i = -1;
      while (tmp !== parent) {
        let x = boxes.indexOf(tmp);
        if (x > -1) {
          i = x;
          break;
        }
        tmp = tmp.parentNode;
      }

      if (i > -1) {
        mouse = w.points[i];
        start = new vec2(e.pageX - tmp.offsetLeft, e.pageY - tmp.offsetTop);
        mousemove(e);

        tmp.style.zIndex = zIndex++;
      }
    };
    const mousemove = (e) => {
      if (mouse) {
        mouse.x = e.pageX - start.x;
        mouse.y = e.pageY - start.y;
        mouse.noUpdate = true;
      }
    };
    const mouseup = (e) => {
      if (mouse) mouse.noUpdate = false;
      mouse = null;
      start = null;
    };

    parent.addEventListener('mousedown', mousedown);
    parent.addEventListener('mousemove', mousemove);
    parent.addEventListener('mouseup', mouseup);

    parent.addEventListener('touchstart', (e) => {
      e.preventDefault();
      mousedown(e.touches[0]);
    });
    parent.addEventListener('touchmove', (e) => {
      mousemove(e.touches[0]);
    });
    parent.addEventListener('touchend', (e) => {
      mouseup(e.touches[0]);
    });
  });
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
  <title>Andrew Russell - About</title>
</svelte:head>

<div class="border" />

<main bind:this={parent}>
  <div bind:this={boxes[0]} class="box">
    <h1>Bio</h1>
    <p>
    I am an undergraduate computer science student at UC San Diego, interested in graphics, embedded systems, and full-stack web development.
    <br />
    <br />
    I have 7 years of self-taught programming experience working with C and JavaScript, and am also comfortable working with x86/ARM Assembly, Java, and GLSL.
    </p>
  </div>
  <div bind:this={boxes[1]} class="box">
    <h1>Work</h1>
    <p>
      Currently I am a software engineer intern at <a
        href="http://trulioo.com">Trulioo</a
      >, where I work on implementing proof-of-concept projects and
      developing full-stack WordPress themes.

      <br />
      <br />

      I am also VP Technology of
      <a href="https://tse.ucsd.edu">Triton Software Engineering</a> at
      UCSD, and previously led 8 developers in implementing a landing
      page for Los Angeles-based non-profit
      <a href="https://landing.fixnation.org">FixNation</a> as an Engineering Manager.
    </p>
  </div>
  <div bind:this={boxes[2]} class="box">
    <h1>Contact</h1>
    <p>
      <a class="contact" href="{base}/resume.pdf">
        Resume
      </a>
      <br />
      <a class="contact" href="https://github.com/Cubified">
        GitHub
      </a>
      <br />
      <a class="contact" href="https://linkedin.com/in/andrewlrussell">
        LinkedIn
      </a>
    </p>
  </div>
</main>

<Background />

<style>
  main {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .border {
    width: calc(100vw - 6rem);
    height: calc(100vh - 6rem);
    box-sizing: border-box;
    margin: 3rem;
    padding: 3rem;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .border {
    mix-blend-mode: difference;
    border: 1rem solid var(--color-light);
  }

  a {
    color: var(--color-dark);
    text-decoration: none;
    box-shadow: inset 0 -0.1rem var(--color-dark);
    padding: 0 0.25rem;
    transition: box-shadow 0.2s, color 0.2s;
  }
  a:hover {
    box-shadow: inset 0 -1.3rem var(--color-dark);
    color: var(--color-light);
  }

  .box {
    width: 23rem;
    margin: 0 auto 2rem;
    padding: 1rem;
    box-sizing: border-box;
    background: var(--color-light);
    user-select: none;
    cursor: pointer;
    mix-blend-mode: normal;

    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.8);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  .box h1, .box p {
    color: var(--color-dark);
    text-shadow: none;
    margin: 0;
  }
  .box h1 {
    margin-bottom: 0.25rem;
  }
</style>
