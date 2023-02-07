<script>
  import { onMount } from 'svelte';

  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  };

  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  };

  let canv;
  onMount(() => {
    setTimeout(() => {
      const resize = () => {
        if (!canv) return;
        const max = Math.max(window.innerWidth, window.innerHeight);
        canv.style.width = max + 'px';
        canv.style.height = max + 'px';

        const ratio = window.devicePixelRatio || 1;
        canv.width = max * ratio;
        canv.height = max * ratio;
      };
      window.addEventListener('resize', resize);
      resize();

      const gl = canv.getContext('webgl', { antialias: true });
      if (!gl) {
        return;
      }

      const vs = createShader(
        gl,
        gl.VERTEX_SHADER,
        `
  precision mediump float;

  attribute vec4 a_position;

  varying vec4 v_position;

  void
  main()
  {
    gl_Position = a_position;
    v_position = a_position;
  }
        `
      );
      const fs = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        `
  precision mediump float;

  #define RAD 0.04

  uniform float u_time;
  uniform vec2 u_resolution;

  varying vec4 v_position;

  vec3 c_brown = vec3(89.0, 69.0, 69.0) / 255.0;
  vec3 c_tan = vec3(110.0, 90.0, 90.0) / 255.0;

  float
  hash(vec2 p)
  {
    p  = 50.0*fract( p*0.3183099 + vec2(0.71,0.113));
    return -1.0+2.0*fract( p.x*p.y*(p.x+p.y) );
  }

  float
  noise(in vec2 p)
  {
    vec2 i = floor( p );
    vec2 f = fract( p );
        
    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( hash( i + vec2(0.0,0.0) ), 
                     hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
  }

  void
  main()
  {
    vec2 p = v_position.xy;

    float time = u_time + 3.25;

    vec2 uv = p + time * 0.25;

    float f = noise(2.0 * uv);
    f = 0.5 + 0.5 * f;

    vec2 m = mod(p, RAD);
    float s = pow(pow(sin(f), 2.0), sin(time / 2.0) * 6.0);
    if (distance(m, vec2(RAD / 2.0)) <= min(pow(s, 2.0), RAD / 2.4)) {
      gl_FragColor = vec4(mix(c_tan, c_brown, f), 1.0);
    } else {
      discard;
    }
  }
        `
      );

      const prog = createProgram(gl, vs, fs);
      const time = gl.getUniformLocation(prog, 'u_time');
      const res = gl.getUniformLocation(prog, 'u_resolution');
      const pos = gl.getAttribLocation(prog, 'a_position');

      const buf = gl.createBuffer();
      gl.bindBuffer(
        gl.ARRAY_BUFFER, buf
      );
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]),
        gl.STATIC_DRAW
      );
    
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.DEPTH_TEST);
      // gl.enable(gl.CULL_FACE);
      gl.enable(gl.BLEND);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(pos);

      let last = performance.now();
      const render = () => {
        requestAnimationFrame(render);

        if (performance.now() - last <= 1000 / 60) return;
        last = performance.now();

        gl.useProgram(prog);
        if (canv) {
          const max = Math.max(canv.width, canv.height);
          gl.viewport(0, 0, max, max);
          gl.uniform2f(res, max, max);
        }
        gl.uniform1f(time, performance.now() / 1000.0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      render();
    }, 1000);
  });
</script>

<canvas bind:this={canv} />

<style>
  canvas {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
