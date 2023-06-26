import{S as xe,i as we,s as Ee,k as c,l as u,m as E,h as i,n as a,b as H,B as M,o as Re,I as Se,a as v,w as he,q as x,J as ye,c as g,x as pe,r as w,G as t,y as ve,f as ge,t as be,z as Ae}from"../../chunks/index-8ff2c44d.js";import{c as G}from"../../chunks/shared-23917130.js";import{B as Be}from"../../chunks/border-e42bd11d.js";function Ie(z){let d;return{c(){d=c("canvas"),this.h()},l(f){d=u(f,"CANVAS",{class:!0}),E(d).forEach(i),this.h()},h(){a(d,"class","svelte-34dq6z")},m(f,_){H(f,d,_),z[1](d)},p:M,i:M,o:M,d(f){f&&i(d),z[1](null)}}}function Le(z,d,f){const _=(e,h,A)=>{const n=e.createShader(h);if(e.shaderSource(n,A),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))return n;console.log(e.getShaderInfoLog(n)),e.deleteShader(n)},b=(e,h,A)=>{const n=e.createProgram();if(e.attachShader(n,h),e.attachShader(n,A),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;console.log(e.getProgramInfoLog(n)),e.deleteProgram(n)};let l;Re(()=>{const e=l.getContext("webgl",{antialias:!0});if(!e)return;const h=_(e,e.VERTEX_SHADER,`
precision mediump float;

attribute vec4 a_position;

varying vec4 v_position;

void
main()
{
  gl_Position = a_position;
  v_position = a_position;
}
      `),A=_(e,e.FRAGMENT_SHADER,`
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
      `),n=b(e,h,A);e.useProgram(n);const S=e.getUniformLocation(n,"u_time"),r=e.getAttribLocation(n,"a_position"),y=()=>{if(!l)return;const p=Math.max(window.innerWidth,window.innerHeight);f(0,l.style.width=p+"px",l),f(0,l.style.height=p+"px",l);const V=1;f(0,l.width=p*V,l),f(0,l.height=p*V,l),e.viewport(0,0,l.width,l.height)};window.addEventListener("resize",y),y();const C=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,C),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]),e.STATIC_DRAW),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.bindBuffer(e.ARRAY_BUFFER,C),e.vertexAttribPointer(r,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(r);let N=performance.now();const B=p=>{requestAnimationFrame(B),!(p-N<=1e3/120)&&(N=p,e.uniform1f(S,p/1e3),e.drawArrays(e.TRIANGLES,0,6))};B(performance.now())});function R(e){Se[e?"unshift":"push"](()=>{l=e,f(0,l)})}return[l,R]}class Pe extends xe{constructor(d){super(),we(this,d,Le,Ie,Ee,{})}}function Te(z){let d,f,_,b,l,R,e,h,A,n,S,r,y,C,N,B,p,V,D,O,I,K,q,L,j,Y,W,J,X,Q,Z,ee,te,re,P,ae,ne,T,oe,se,F,ie,U,k,$;return n=new Be({}),k=new Pe({}),{c(){d=c("meta"),f=c("link"),_=c("link"),b=c("link"),l=c("link"),R=c("meta"),e=c("meta"),h=c("meta"),A=v(),he(n.$$.fragment),S=v(),r=c("main"),y=c("h1"),C=x("Hi, I'm Andrew Russell."),N=v(),B=c("h2"),p=x("I write software."),V=v(),D=c("br"),O=v(),I=c("a"),K=x("About"),q=x(`
   / 
  `),L=c("a"),j=x("Projects"),Y=v(),W=c("br"),J=v(),X=c("br"),Q=v(),Z=c("br"),ee=v(),te=c("br"),re=v(),P=c("a"),ae=x("Resume"),ne=x(`
   / 
  `),T=c("a"),oe=x("GitHub"),se=x(`
   / 
  `),F=c("a"),ie=x("LinkedIn"),U=v(),he(k.$$.fragment),this.h()},l(o){const m=ye("svelte-gczla7",document.head);d=u(m,"META",{charset:!0}),f=u(m,"LINK",{rel:!0,sizes:!0,href:!0}),_=u(m,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),b=u(m,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),l=u(m,"LINK",{rel:!0,href:!0}),R=u(m,"META",{name:!0,content:!0}),e=u(m,"META",{name:!0,content:!0}),h=u(m,"META",{name:!0,content:!0}),m.forEach(i),A=g(o),pe(n.$$.fragment,o),S=g(o),r=u(o,"MAIN",{class:!0});var s=E(r);y=u(s,"H1",{});var le=E(y);C=w(le,"Hi, I'm Andrew Russell."),le.forEach(i),N=g(s),B=u(s,"H2",{});var ce=E(B);p=w(ce,"I write software."),ce.forEach(i),V=g(s),D=u(s,"BR",{}),O=g(s),I=u(s,"A",{href:!0,class:!0});var ue=E(I);K=w(ue,"About"),ue.forEach(i),q=w(s,`
   / 
  `),L=u(s,"A",{href:!0,class:!0});var fe=E(L);j=w(fe,"Projects"),fe.forEach(i),Y=g(s),W=u(s,"BR",{}),J=g(s),X=u(s,"BR",{}),Q=g(s),Z=u(s,"BR",{}),ee=g(s),te=u(s,"BR",{}),re=g(s),P=u(s,"A",{href:!0,class:!0});var de=E(P);ae=w(de,"Resume"),de.forEach(i),ne=w(s,`
   / 
  `),T=u(s,"A",{href:!0,class:!0});var me=E(T);oe=w(me,"GitHub"),me.forEach(i),se=w(s,`
   / 
  `),F=u(s,"A",{href:!0,class:!0});var _e=E(F);ie=w(_e,"LinkedIn"),_e.forEach(i),s.forEach(i),U=g(o),pe(k.$$.fragment,o),this.h()},h(){a(d,"charset","utf-8"),a(f,"rel","apple-touch-icon"),a(f,"sizes","180x180"),a(f,"href",G+"/apple-touch-icon.png"),a(_,"rel","icon"),a(_,"type","image/png"),a(_,"sizes","32x32"),a(_,"href",G+"/favicon-32x32.png"),a(b,"rel","icon"),a(b,"type","image/png"),a(b,"sizes","16x16"),a(b,"href",G+"/favicon-16x16.png"),a(l,"rel","manifest"),a(l,"href",G+"/site.webmanifest"),a(R,"name","viewport"),a(R,"content","width=device-width, initial-scale=1"),a(e,"name","apple-mobile-web-app-capable"),a(e,"content","yes"),a(h,"name","description"),a(h,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell",a(I,"href","/about"),a(I,"class","svelte-17efd4i"),a(L,"href","/projects"),a(L,"class","svelte-17efd4i"),a(P,"href","/resume.pdf"),a(P,"class","svelte-17efd4i"),a(T,"href","https://github.com/Cubified"),a(T,"class","svelte-17efd4i"),a(F,"href","https://linkedin.com/in/andrewlrussell"),a(F,"class","svelte-17efd4i"),a(r,"class","svelte-17efd4i")},m(o,m){t(document.head,d),t(document.head,f),t(document.head,_),t(document.head,b),t(document.head,l),t(document.head,R),t(document.head,e),t(document.head,h),H(o,A,m),ve(n,o,m),H(o,S,m),H(o,r,m),t(r,y),t(y,C),t(r,N),t(r,B),t(B,p),t(r,V),t(r,D),t(r,O),t(r,I),t(I,K),t(r,q),t(r,L),t(L,j),t(r,Y),t(r,W),t(r,J),t(r,X),t(r,Q),t(r,Z),t(r,ee),t(r,te),t(r,re),t(r,P),t(P,ae),t(r,ne),t(r,T),t(T,oe),t(r,se),t(r,F),t(F,ie),H(o,U,m),ve(k,o,m),$=!0},p:M,i(o){$||(ge(n.$$.fragment,o),ge(k.$$.fragment,o),$=!0)},o(o){be(n.$$.fragment,o),be(k.$$.fragment,o),$=!1},d(o){i(d),i(f),i(_),i(b),i(l),i(R),i(e),i(h),o&&i(A),Ae(n,o),o&&i(S),o&&i(r),o&&i(U),Ae(k,o)}}}class Ce extends xe{constructor(d){super(),we(this,d,null,Te,Ee,{})}}export{Ce as default};
