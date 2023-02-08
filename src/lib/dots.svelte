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

  uniform float u_time;
  uniform vec2 u_resolution;

  varying vec4 v_position;

  vec3 c_brown = vec3(89.0, 69.0, 69.0) / 255.0;
  vec3 c_tan = vec3(110.0, 90.0, 90.0) / 255.0;

  vec2 GetGradient(vec2 intPos, float t) {
    float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);;
    
    // Rotate gradient: random starting rotation, random rotation rate
    float angle = 6.283185 * rand + 4.0 * t * rand;
    return vec2(cos(angle), sin(angle));
  }

  float Pseudo3dNoise(vec3 pos) {
    vec2 i = floor(pos.xy);
    vec2 f = pos.xy - i;
    vec2 blend = f * f * (3.0 - 2.0 * f);
    float noiseVal = 
      mix(
        mix(
          dot(GetGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
          dot(GetGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
          blend.x),
        mix(
          dot(GetGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
          dot(GetGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
          blend.x),
      blend.y
    );
    return noiseVal / 0.7; // normalize to about [-1..1]
  }

  float ease(float x) {
    return (x < 0.5 ? 2.0 * x * x : 1.0 - pow(-2.0 * x + 2.0, 2.0) / 2.0);
  }

  #define rad 0.4
  #define halfrad (rad / 2.0)
  #define tenrad (rad * 10.0)
  #define possin(x) ((sin(x) + 1.0) / 2.0)
  void main() {
    vec2 uv = v_position.xy;
    mat2 rot = mat2(cos(u_time / 10.0), -sin(u_time / 10.0), sin(u_time / 10.0), cos(u_time / 10.0));
    uv = rot * uv;

    float noiseVal = 0.5 + 0.5 * Pseudo3dNoise(vec3(uv * (tenrad), u_time));

    // if (length(mod(uv + halfrad, rad) - halfrad) <= noiseVal / tenrad) {

    float cutoff = possin(u_time) * 0.2;
    cutoff = clamp(cutoff, 0.09, 0.2);
    if (u_time < 2.6) cutoff = mix(0.3, cutoff, clamp(ease(u_time - 1.6), 0.0, 1.0));

    if (noiseVal / tenrad >= cutoff) {
        gl_FragColor = vec4(mix(c_brown, c_tan, noiseVal), 1.0);
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

        if (performance.now() - last <= 1000 / 120) return;
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
