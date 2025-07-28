import{S as fe,i as de,s as me,k as l,l as u,m as x,h as r,n as t,b as $,B as U,o as _e,I as he,a as V,w as re,q as A,J as pe,c as H,x as se,r as b,G as n,y as ie,f as ce,t as le,z as ue}from"../../chunks/index-f2a81916.js";import{c as M}from"../../chunks/shared-23917130.js";import{B as ve}from"../../chunks/border-2c69ce87.js";function ge(k){let c;return{c(){c=l("canvas"),this.h()},l(i){c=u(i,"CANVAS",{class:!0}),x(c).forEach(r),this.h()},h(){t(c,"class","svelte-34dq6z")},m(i,m){$(i,c,m),k[1](c)},p:U,i:U,o:U,d(i){i&&r(c),k[1](null)}}}function Ae(k,c,i){const m=(e,_,g)=>{const a=e.createShader(_);if(e.shaderSource(a,g),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))return a;console.log(e.getShaderInfoLog(a)),e.deleteShader(a)},v=(e,_,g)=>{const a=e.createProgram();if(e.attachShader(a,_),e.attachShader(a,g),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS))return a;console.log(e.getProgramInfoLog(a)),e.deleteProgram(a)};let s;_e(()=>{const e=s.getContext("webgl",{antialias:!0});if(!e)return;const _=m(e,e.VERTEX_SHADER,`
precision mediump float;

attribute vec4 a_position;

varying vec4 v_position;

void
main()
{
  gl_Position = a_position;
  v_position = a_position;
}
      `),g=m(e,e.FRAGMENT_SHADER,`
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
      `),a=v(e,_,g);e.useProgram(a);const w=e.getUniformLocation(a,"u_time"),f=e.getAttribLocation(a,"a_position"),R=()=>{if(!s)return;const h=Math.max(window.innerWidth,window.innerHeight);i(0,s.style.width=h+"px",s),i(0,s.style.height=h+"px",s);const N=1;i(0,s.width=h*N,s),i(0,s.height=h*N,s),e.viewport(0,0,s.width,s.height)};window.addEventListener("resize",R),R();const C=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,C),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]),e.STATIC_DRAW),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.bindBuffer(e.ARRAY_BUFFER,C),e.vertexAttribPointer(f,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(f);let z=performance.now();const y=h=>{requestAnimationFrame(y),!(h-z<=1e3/120)&&(z=h,e.uniform1f(w,h/1e3),e.drawArrays(e.TRIANGLES,0,6))};y(performance.now())});function E(e){he[e?"unshift":"push"](()=>{s=e,i(0,s)})}return[s,E]}class be extends fe{constructor(c){super(),de(this,c,Ae,ge,me,{})}}function xe(k){let c,i,m,v,s,E,e,_,g,a,w,f,R,C,z,y,h,N,O,K,p,L,q,W,T,Y,J,B,X,j,F,Q,D,P,G;return a=new ve({}),P=new be({}),{c(){c=l("meta"),i=l("link"),m=l("link"),v=l("link"),s=l("link"),E=l("meta"),e=l("meta"),_=l("meta"),g=V(),re(a.$$.fragment),w=V(),f=l("main"),R=l("h1"),C=A("Hi, I'm Andrew Russell."),z=V(),y=l("h2"),h=A("Website under construction."),N=V(),O=l("br"),K=V(),p=l("div"),L=l("a"),q=A("GitHub"),W=A(`
     / 
    `),T=l("a"),Y=A("LinkedIn"),J=A(`
     / 
    `),B=l("a"),X=A("ORCID"),j=A(`
     / 
    `),F=l("a"),Q=A("Email"),D=V(),re(P.$$.fragment),this.h()},l(o){const d=pe("svelte-1w20w73",document.head);c=u(d,"META",{charset:!0}),i=u(d,"LINK",{rel:!0,sizes:!0,href:!0}),m=u(d,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),v=u(d,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),s=u(d,"LINK",{rel:!0,href:!0}),E=u(d,"META",{name:!0,content:!0}),e=u(d,"META",{name:!0,content:!0}),_=u(d,"META",{name:!0,content:!0}),d.forEach(r),g=H(o),se(a.$$.fragment,o),w=H(o),f=u(o,"MAIN",{class:!0});var S=x(f);R=u(S,"H1",{});var Z=x(R);C=b(Z,"Hi, I'm Andrew Russell."),Z.forEach(r),z=H(S),y=u(S,"H2",{});var ee=x(y);h=b(ee,"Website under construction."),ee.forEach(r),N=H(S),O=u(S,"BR",{}),K=H(S),p=u(S,"DIV",{});var I=x(p);L=u(I,"A",{href:!0,class:!0});var te=x(L);q=b(te,"GitHub"),te.forEach(r),W=b(I,`
     / 
    `),T=u(I,"A",{href:!0,class:!0});var ne=x(T);Y=b(ne,"LinkedIn"),ne.forEach(r),J=b(I,`
     / 
    `),B=u(I,"A",{href:!0,class:!0});var ae=x(B);X=b(ae,"ORCID"),ae.forEach(r),j=b(I,`
     / 
    `),F=u(I,"A",{href:!0,class:!0});var oe=x(F);Q=b(oe,"Email"),oe.forEach(r),I.forEach(r),S.forEach(r),D=H(o),se(P.$$.fragment,o),this.h()},h(){t(c,"charset","utf-8"),t(i,"rel","apple-touch-icon"),t(i,"sizes","180x180"),t(i,"href",M+"/apple-touch-icon.png"),t(m,"rel","icon"),t(m,"type","image/png"),t(m,"sizes","32x32"),t(m,"href",M+"/favicon-32x32.png"),t(v,"rel","icon"),t(v,"type","image/png"),t(v,"sizes","16x16"),t(v,"href",M+"/favicon-16x16.png"),t(s,"rel","manifest"),t(s,"href",M+"/site.webmanifest"),t(E,"name","viewport"),t(E,"content","width=device-width, initial-scale=1"),t(e,"name","apple-mobile-web-app-capable"),t(e,"content","yes"),t(_,"name","description"),t(_,"content","A personal portfolio site for software engineer Andrew Russell."),document.title="Andrew Russell",t(L,"href","https://github.com/Cubified"),t(L,"class","svelte-1uu56og"),t(T,"href","https://linkedin.com/in/andrewlrussell"),t(T,"class","svelte-1uu56og"),t(B,"href","https://orcid.org/0009-0000-6263-5528"),t(B,"class","svelte-1uu56og"),t(F,"href","mailto:alrussell@ucsd.edu"),t(F,"class","svelte-1uu56og"),t(f,"class","svelte-1uu56og")},m(o,d){n(document.head,c),n(document.head,i),n(document.head,m),n(document.head,v),n(document.head,s),n(document.head,E),n(document.head,e),n(document.head,_),$(o,g,d),ie(a,o,d),$(o,w,d),$(o,f,d),n(f,R),n(R,C),n(f,z),n(f,y),n(y,h),n(f,N),n(f,O),n(f,K),n(f,p),n(p,L),n(L,q),n(p,W),n(p,T),n(T,Y),n(p,J),n(p,B),n(B,X),n(p,j),n(p,F),n(F,Q),$(o,D,d),ie(P,o,d),G=!0},p:U,i(o){G||(ce(a.$$.fragment,o),ce(P.$$.fragment,o),G=!0)},o(o){le(a.$$.fragment,o),le(P.$$.fragment,o),G=!1},d(o){r(c),r(i),r(m),r(v),r(s),r(E),r(e),r(_),o&&r(g),ue(a,o),o&&r(w),o&&r(f),o&&r(D),ue(P,o)}}}class ye extends fe{constructor(c){super(),de(this,c,null,xe,me,{})}}export{ye as default};
