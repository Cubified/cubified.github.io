import{S as Ae,i as be,s as xe,k as i,l as c,m as v,h as o,n as a,b as D,B as q,o as Ee,I as we,a as I,w as me,q as b,J as Re,c as L,x as _e,r as x,G as t,y as he,f as pe,t as ve,z as ge}from"../../chunks/index-f2a81916.js";import{c as K}from"../../chunks/shared-23917130.js";import{B as Se}from"../../chunks/border-2c69ce87.js";function ye(V){let f;return{c(){f=i("canvas"),this.h()},l(u){f=c(u,"CANVAS",{class:!0}),v(f).forEach(o),this.h()},h(){a(f,"class","svelte-34dq6z")},m(u,m){D(u,f,m),V[1](f)},p:q,i:q,o:q,d(u){u&&o(f),V[1](null)}}}function Ie(V,f,u){const m=(e,_,A)=>{const n=e.createShader(_);if(e.shaderSource(n,A),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))return n;console.log(e.getShaderInfoLog(n)),e.deleteShader(n)},g=(e,_,A)=>{const n=e.createProgram();if(e.attachShader(n,_),e.attachShader(n,A),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;console.log(e.getProgramInfoLog(n)),e.deleteProgram(n)};let s;Ee(()=>{const e=s.getContext("webgl",{antialias:!0});if(!e)return;const _=m(e,e.VERTEX_SHADER,`
precision mediump float;

attribute vec4 a_position;

varying vec4 v_position;

void
main()
{
  gl_Position = a_position;
  v_position = a_position;
}
      `),A=m(e,e.FRAGMENT_SHADER,`
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
      `),n=g(e,_,A);e.useProgram(n);const R=e.getUniformLocation(n,"u_time"),l=e.getAttribLocation(n,"a_position"),S=()=>{if(!s)return;const h=Math.max(window.innerWidth,window.innerHeight);u(0,s.style.width=h+"px",s),u(0,s.style.height=h+"px",s);const U=1;u(0,s.width=h*U,s),u(0,s.height=h*U,s),e.viewport(0,0,s.width,s.height)};window.addEventListener("resize",S),S();const N=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,N),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]),e.STATIC_DRAW),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.bindBuffer(e.ARRAY_BUFFER,N),e.vertexAttribPointer(l,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(l);let H=performance.now();const y=h=>{requestAnimationFrame(y),!(h-H<=1e3/120)&&(H=h,e.uniform1f(R,h/1e3),e.drawArrays(e.TRIANGLES,0,6))};y(performance.now())});function w(e){we[e?"unshift":"push"](()=>{s=e,u(0,s)})}return[s,w]}class Le extends Ae{constructor(f){super(),be(this,f,Ie,ye,xe,{})}}function Be(V){let f,u,m,g,s,w,e,_,A,n,R,l,S,N,H,y,h,U,j,Y,B,P,W,J,T,X,Q,Z,ee,E,F,te,ae,k,ne,re,z,oe,G,C,M;return n=new Se({}),C=new Le({}),{c(){f=i("meta"),u=i("link"),m=i("link"),g=i("link"),s=i("link"),w=i("meta"),e=i("meta"),_=i("meta"),A=I(),me(n.$$.fragment),R=I(),l=i("main"),S=i("h1"),N=b("Hi, I'm Andrew Russell."),H=I(),y=i("h2"),h=b("I write software."),U=I(),j=i("br"),Y=I(),B=i("div"),P=i("a"),W=b("About"),J=b(`
     / 
    `),T=i("a"),X=b("Projects"),Q=I(),Z=i("br"),ee=I(),E=i("div"),F=i("a"),te=b("Resume"),ae=b(`
     / 
    `),k=i("a"),ne=b("GitHub"),re=b(`
     / 
    `),z=i("a"),oe=b("LinkedIn"),G=I(),me(C.$$.fragment),this.h()},l(r){const d=Re("svelte-gczla7",document.head);f=c(d,"META",{charset:!0}),u=c(d,"LINK",{rel:!0,sizes:!0,href:!0}),m=c(d,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),g=c(d,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),s=c(d,"LINK",{rel:!0,href:!0}),w=c(d,"META",{name:!0,content:!0}),e=c(d,"META",{name:!0,content:!0}),_=c(d,"META",{name:!0,content:!0}),d.forEach(o),A=L(r),_e(n.$$.fragment,r),R=L(r),l=c(r,"MAIN",{class:!0});var p=v(l);S=c(p,"H1",{});var se=v(S);N=x(se,"Hi, I'm Andrew Russell."),se.forEach(o),H=L(p),y=c(p,"H2",{});var ie=v(y);h=x(ie,"I write software."),ie.forEach(o),U=L(p),j=c(p,"BR",{}),Y=L(p),B=c(p,"DIV",{});var O=v(B);P=c(O,"A",{href:!0,class:!0});var ce=v(P);W=x(ce,"About"),ce.forEach(o),J=x(O,`
     / 
    `),T=c(O,"A",{href:!0,class:!0});var le=v(T);X=x(le,"Projects"),le.forEach(o),O.forEach(o),Q=L(p),Z=c(p,"BR",{}),ee=L(p),E=c(p,"DIV",{});var $=v(E);F=c($,"A",{href:!0,class:!0});var ue=v(F);te=x(ue,"Resume"),ue.forEach(o),ae=x($,`
     / 
    `),k=c($,"A",{href:!0,class:!0});var fe=v(k);ne=x(fe,"GitHub"),fe.forEach(o),re=x($,`
     / 
    `),z=c($,"A",{href:!0,class:!0});var de=v(z);oe=x(de,"LinkedIn"),de.forEach(o),$.forEach(o),p.forEach(o),G=L(r),_e(C.$$.fragment,r),this.h()},h(){a(f,"charset","utf-8"),a(u,"rel","apple-touch-icon"),a(u,"sizes","180x180"),a(u,"href",K+"/apple-touch-icon.png"),a(m,"rel","icon"),a(m,"type","image/png"),a(m,"sizes","32x32"),a(m,"href",K+"/favicon-32x32.png"),a(g,"rel","icon"),a(g,"type","image/png"),a(g,"sizes","16x16"),a(g,"href",K+"/favicon-16x16.png"),a(s,"rel","manifest"),a(s,"href",K+"/site.webmanifest"),a(w,"name","viewport"),a(w,"content","width=device-width, initial-scale=1"),a(e,"name","apple-mobile-web-app-capable"),a(e,"content","yes"),a(_,"name","description"),a(_,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell",a(P,"href","/about"),a(P,"class","svelte-1uu56og"),a(T,"href","/projects"),a(T,"class","svelte-1uu56og"),a(F,"href","/resume.pdf"),a(F,"class","svelte-1uu56og"),a(k,"href","https://github.com/Cubified"),a(k,"class","svelte-1uu56og"),a(z,"href","https://linkedin.com/in/andrewlrussell"),a(z,"class","svelte-1uu56og"),a(l,"class","svelte-1uu56og")},m(r,d){t(document.head,f),t(document.head,u),t(document.head,m),t(document.head,g),t(document.head,s),t(document.head,w),t(document.head,e),t(document.head,_),D(r,A,d),he(n,r,d),D(r,R,d),D(r,l,d),t(l,S),t(S,N),t(l,H),t(l,y),t(y,h),t(l,U),t(l,j),t(l,Y),t(l,B),t(B,P),t(P,W),t(B,J),t(B,T),t(T,X),t(l,Q),t(l,Z),t(l,ee),t(l,E),t(E,F),t(F,te),t(E,ae),t(E,k),t(k,ne),t(E,re),t(E,z),t(z,oe),D(r,G,d),he(C,r,d),M=!0},p:q,i(r){M||(pe(n.$$.fragment,r),pe(C.$$.fragment,r),M=!0)},o(r){ve(n.$$.fragment,r),ve(C.$$.fragment,r),M=!1},d(r){o(f),o(u),o(m),o(g),o(s),o(w),o(e),o(_),r&&o(A),ge(n,r),r&&o(R),r&&o(l),r&&o(G),ge(C,r)}}}class ke extends Ae{constructor(f){super(),be(this,f,null,Be,xe,{})}}export{ke as default};
