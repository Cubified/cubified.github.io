import{S as x,i as A,s as b,k as S,l as R,m as E,h as u,n as w,b as B,B as c,o as y,J as T}from"./index-7c65267d.js";function L(r){let t;return{c(){t=S("div"),this.h()},l(n){t=R(n,"DIV",{class:!0}),E(t).forEach(u),this.h()},h(){w(t,"class","border svelte-1c2eotk")},m(n,s){B(n,t,s)},p:c,i:c,o:c,d(n){n&&u(t)}}}class N extends x{constructor(t){super(),A(this,t,null,L,b,{})}}function V(r){let t;return{c(){t=S("canvas"),this.h()},l(n){t=R(n,"CANVAS",{class:!0}),E(t).forEach(u),this.h()},h(){w(t,"class","svelte-1d26rcc")},m(n,s){B(n,t,s),r[1](t)},p:c,i:c,o:c,d(n){n&&u(t),r[1](null)}}}function C(r,t,n){const s=(e,d,l)=>{const o=e.createShader(d);if(e.shaderSource(o,l),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))return o;console.log(e.getShaderInfoLog(o)),e.deleteShader(o)},F=(e,d,l)=>{const o=e.createProgram();if(e.attachShader(o,d),e.attachShader(o,l),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS))return o;console.log(e.getProgramInfoLog(o)),e.deleteProgram(o)};let a;y(()=>{const e=a.getContext("webgl",{antialias:!0});if(!e)return;const d=s(e,e.VERTEX_SHADER,`
precision mediump float;

attribute vec4 a_position;

varying vec4 v_position;

void
main()
{
  gl_Position = a_position;
  v_position = a_position;
}
      `),l=s(e,e.FRAGMENT_SHADER,`
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec4 v_position;

vec3 colorA = vec3(25.0, 25.0, 25.0) / 255.0;
vec3 colorB = vec3(233.0, 233.0, 233.0) / 255.0;

vec2 getGradient(vec2 intPos, float t) {
  float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);;
  
  // Rotate gradient: random starting rotation, random rotation rate
  float angle = 6.283185 * rand + 4.0 * t * rand;
  return vec2(cos(angle), sin(angle));
}

float pseudo3dNoise(vec3 pos) {
  vec2 i = floor(pos.xy);
  vec2 f = pos.xy - i;
  vec2 blend = f * f * (3.0 - 2.0 * f);
  float noiseVal = 
    mix(
      mix(
        dot(getGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
        dot(getGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
        blend.x),
      mix(
        dot(getGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
        dot(getGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
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

#define SCALE 1.0

void main() {
  vec2 uv = v_position.xy;

  float noise = ease(0.2 + 0.8 * pseudo3dNoise(vec3(uv * SCALE, u_time * 0.5)));
  float fudge = fract(sin((u_time / 30000.0) + dot(uv / (uv.x + 0.1), vec2(12.9898,78.233))) * 43758.5453);

  noise *= mix(fudge, 1.0, noise);

  gl_FragColor = vec4(mix(colorA, colorB, noise), 1.0);

  return;

/*
  mat2 rot = mat2(cos(u_time / 10.0), -sin(u_time / 10.0), sin(u_time / 10.0), cos(u_time / 10.0));
  uv = rot * uv;

  float noiseVal = 0.5 + 0.5 * pseudo3dNoise(vec3(uv * (tenrad), u_time));

  // if (length(mod(uv + halfrad, rad) - halfrad) <= noiseVal / tenrad) {

  // float blend = clamp(pow(distance(v_position.xy, u_mouse), 2.0), 0.0, 0.4);
  // if (blend <= 0.05) discard;

  if (u_time < 1.2) noiseVal = 0.0;
  else if (u_time >= 1.2 && u_time < 1.7) noiseVal *= (u_time - 1.2) * 2.0;
  noiseVal *= 0.75 / distance(v_position.xy, u_mouse);
  noiseVal = min(noiseVal, 1.5);

  float cutoff = possin(u_time) * 0.2;
  cutoff = clamp(cutoff, 0.09, 0.2);
  if (u_time < 2.6) cutoff = mix(0.3, cutoff, clamp(ease(u_time - 1.6), 0.0, 1.0));

  if (noiseVal / tenrad >= cutoff) {
      gl_FragColor = vec4(mix(c_brown, c_tan, noiseVal), 1.0);
  } else {
      discard;
  }
*/
}
      `),o=F(e,d,l);e.useProgram(o);const f=e.getUniformLocation(o,"u_time"),m=e.getAttribLocation(o,"a_position"),_=()=>{if(!a)return;const i=Math.max(window.innerWidth,window.innerHeight);n(0,a.style.width=i+"px",a),n(0,a.style.height=i+"px",a);const g=window.devicePixelRatio||1;n(0,a.width=i*g,a),n(0,a.height=i*g,a),e.viewport(0,0,a.width,a.height)};window.addEventListener("resize",_),_();const v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]),e.STATIC_DRAW),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.bindBuffer(e.ARRAY_BUFFER,v),e.vertexAttribPointer(m,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(m);let p=performance.now();const h=i=>{requestAnimationFrame(h),!(i-p<=1e3/120)&&(p=i,e.uniform1f(f,i/1e3),e.drawArrays(e.TRIANGLES,0,6))};h(performance.now())});function P(e){T[e?"unshift":"push"](()=>{a=e,n(0,a)})}return[a,P]}class U extends x{constructor(t){super(),A(this,t,C,V,b,{})}}export{N as B,U as a};
