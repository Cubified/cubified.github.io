import{S as le,i as ie,s as oe,k as g,l as p,m as b,h,n as d,b as F,B as ee,o as me,I as se,e as $e,J as we,q as T,r as R,G as l,a as M,w as W,c as B,x as J,K as be,y as K,f as U,t as j,z as Y,L as ze,C as Pe,D as Me,E as Be,F as Le,M as Re,u as _e,N as He,O as xe,P as ne,Q as re,A as qe,R as Ne,T as Ae}from"../../chunks/index-b226882b.js";import{c as ae}from"../../chunks/shared-23917130.js";function Fe(c){let e;return{c(){e=g("canvas"),this.h()},l(s){e=p(s,"CANVAS",{class:!0}),b(e).forEach(h),this.h()},h(){d(e,"class","svelte-qsnq92")},m(s,r){F(s,e,r),c[1](e)},p:ee,i:ee,o:ee,d(s){s&&h(e),c[1](null)}}}function Ge(c,e,s){const r=(i,n,u)=>{const m=i.createShader(n);if(i.shaderSource(m,u),i.compileShader(m),i.getShaderParameter(m,i.COMPILE_STATUS))return m;console.log(i.getShaderInfoLog(m)),i.deleteShader(m)},a=(i,n,u)=>{const m=i.createProgram();if(i.attachShader(m,n),i.attachShader(m,u),i.linkProgram(m),i.getProgramParameter(m,i.LINK_STATUS))return m;console.log(i.getProgramInfoLog(m)),i.deleteProgram(m)};let o;me(()=>{setTimeout(()=>{const i=()=>{if(!o)return;const A=Math.max(window.innerWidth,window.innerHeight);s(0,o.style.width=A+"px",o),s(0,o.style.height=A+"px",o);const D=window.devicePixelRatio||1;s(0,o.width=A*D,o),s(0,o.height=A*D,o)};window.addEventListener("resize",i),i();const n=o.getContext("webgl",{antialias:!0});if(!n)return;const u=r(n,n.VERTEX_SHADER,`
  precision mediump float;

  attribute vec4 a_position;

  varying vec4 v_position;

  void
  main()
  {
    gl_Position = a_position;
    v_position = a_position;
  }
        `),m=r(n,n.FRAGMENT_SHADER,`
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
        `),f=a(n,u,m),w=n.getUniformLocation(f,"u_time"),S=n.getUniformLocation(f,"u_resolution"),E=n.getAttribLocation(f,"a_position"),I=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,I),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]),n.STATIC_DRAW),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.DEPTH_TEST),n.enable(n.BLEND),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.bindBuffer(n.ARRAY_BUFFER,I),n.vertexAttribPointer(E,3,n.FLOAT,!1,0,0),n.enableVertexAttribArray(E);let V=performance.now();const C=()=>{if(requestAnimationFrame(C),!(performance.now()-V<=1e3/120)){if(V=performance.now(),n.useProgram(f),o){const A=Math.max(o.width,o.height);n.viewport(0,0,A,A),n.uniform2f(S,A,A)}n.uniform1f(w,performance.now()/1e3),n.drawArrays(n.TRIANGLES,0,6)}};C()},1e3)});function t(i){se[i?"unshift":"push"](()=>{o=i,s(0,o)})}return[o,t]}class Ue extends le{constructor(e){super(),ie(this,e,Ge,Fe,oe,{})}}function Ie(c,e,s){const r=c.slice();return r[8]=e[s],r[9]=e,r[10]=s,r}function Se(c){let e,s=c[8]+"",r,a,o=c[10];const t=()=>c[6](e,o),i=()=>c[6](null,o);return{c(){e=g("span"),r=T(s),a=T(" "),this.h()},l(n){e=p(n,"SPAN",{class:!0});var u=b(e);r=R(u,s),a=R(u," "),u.forEach(h),this.h()},h(){d(e,"class","svelte-1k08ixd")},m(n,u){F(n,e,u),l(e,r),l(e,a),t()},p(n,u){c=n,o!==c[10]&&(i(),o=c[10],t())},d(n){n&&h(e),i()}}}function je(c){let e,s=c[1],r=[];for(let a=0;a<s.length;a+=1)r[a]=Se(Ie(c,s,a));return{c(){for(let a=0;a<r.length;a+=1)r[a].c();e=$e()},l(a){for(let o=0;o<r.length;o+=1)r[o].l(a);e=$e()},m(a,o){for(let t=0;t<r.length;t+=1)r[t].m(a,o);F(a,e,o)},p(a,[o]){if(o&3){s=a[1];let t;for(t=0;t<s.length;t+=1){const i=Ie(a,s,t);r[t]?r[t].p(i,o):(r[t]=Se(i),r[t].c(),r[t].m(e.parentNode,e))}for(;t<r.length;t+=1)r[t].d(1);r.length=s.length}},i:ee,o:ee,d(a){we(r,a),a&&h(e)}}}function Oe(c,e,s){let{string:r=""}=e,{delay:a=0}=e,{interval:o=100}=e,{play:t=void 0}=e;const i=r.split(" "),n=[],u=()=>{setTimeout(()=>{n.forEach((f,w)=>{setTimeout(()=>{f.style.transform="translateY(0)",f.style.clipPath="inset(0)"},w*o)})},a)};me(()=>{t===void 0&&u()});function m(f,w){se[f?"unshift":"push"](()=>{n[w]=f,s(0,n)})}return c.$$set=f=>{"string"in f&&s(2,r=f.string),"delay"in f&&s(3,a=f.delay),"interval"in f&&s(4,o=f.interval),"play"in f&&s(5,t=f.play)},c.$$.update=()=>{c.$$.dirty&32&&t&&u()},[n,i,r,a,o,t,m]}class ue extends le{constructor(e){super(),ie(this,e,Oe,je,oe,{string:2,delay:3,interval:4,play:5})}}function Ve(c,e,s){const r=c.slice();return r[6]=e[s],r[7]=e,r[8]=s,r}function Ce(c){let e,s=c[8];const r=()=>c[4](e,s),a=()=>c[4](null,s);return{c(){e=g("div"),this.h()},l(o){e=p(o,"DIV",{class:!0}),b(e).forEach(h),this.h()},h(){d(e,"class",ze(`bar ${c[6]}`)+" svelte-z1s61i")},m(o,t){F(o,e,t),r()},p(o,t){c=o,s!==c[8]&&(a(),s=c[8],r())},d(o){o&&h(e),a()}}}function We(c){let e,s,r,a,o,t,i,n,u,m,f,w,S,E,I,V,C,A,D,k,$=c[3],v=[];for(let _=0;_<$.length;_+=1)v[_]=Ce(Ve(c,$,_));return n=new ue({props:{play:c[2],string:"Hi, I'm Andrew Russell."}}),f=new ue({props:{play:c[2],string:"I'm a computer science student studying at UC San Diego.",delay:200,interval:50}}),{c(){e=g("div"),s=g("div");for(let _=0;_<v.length;_+=1)v[_].c();r=M(),a=g("div"),o=g("div"),t=g("div"),i=g("h1"),W(n.$$.fragment),u=M(),m=g("h3"),W(f.$$.fragment),w=M(),S=g("div"),E=g("div"),I=g("div"),V=g("div"),C=g("div"),A=g("img"),this.h()},l(_){e=p(_,"DIV",{class:!0});var y=b(e);s=p(y,"DIV",{class:!0});var L=b(s);for(let te=0;te<v.length;te+=1)v[te].l(L);L.forEach(h),r=B(y),a=p(y,"DIV",{class:!0});var H=b(a);o=p(H,"DIV",{class:!0});var z=b(o);t=p(z,"DIV",{});var x=b(t);i=p(x,"H1",{});var O=b(i);J(n.$$.fragment,O),O.forEach(h),u=B(x),m=p(x,"H3",{});var Q=b(m);J(f.$$.fragment,Q),Q.forEach(h),x.forEach(h),z.forEach(h),w=B(H),S=p(H,"DIV",{class:!0});var N=b(S);E=p(N,"DIV",{class:!0});var X=b(E);I=p(X,"DIV",{class:!0});var q=b(I);V=p(q,"DIV",{class:!0});var Z=b(V);C=p(Z,"DIV",{class:!0});var P=b(C);A=p(P,"IMG",{src:!0,alt:!0,class:!0}),P.forEach(h),Z.forEach(h),q.forEach(h),X.forEach(h),N.forEach(h),H.forEach(h),y.forEach(h),this.h()},h(){d(s,"class","bars svelte-z1s61i"),d(o,"class","hero svelte-z1s61i"),be(A.src,D=ae+"/me.png")||d(A,"src",D),d(A,"alt","Andrew Russell"),d(A,"class","svelte-z1s61i"),d(C,"class","circ fourth svelte-z1s61i"),d(V,"class","circ third svelte-z1s61i"),d(I,"class","circ second svelte-z1s61i"),d(E,"class","circ first svelte-z1s61i"),d(S,"class","circles svelte-z1s61i"),d(a,"class","up svelte-z1s61i"),d(e,"class","intro svelte-z1s61i")},m(_,y){F(_,e,y),l(e,s);for(let L=0;L<v.length;L+=1)v[L].m(s,null);l(e,r),l(e,a),l(a,o),l(o,t),l(t,i),K(n,i,null),l(t,u),l(t,m),K(f,m,null),l(a,w),l(a,S),l(S,E),l(E,I),l(I,V),l(V,C),l(C,A),c[5](S),k=!0},p(_,[y]){if(y&9){$=_[3];let z;for(z=0;z<$.length;z+=1){const x=Ve(_,$,z);v[z]?v[z].p(x,y):(v[z]=Ce(x),v[z].c(),v[z].m(s,null))}for(;z<v.length;z+=1)v[z].d(1);v.length=$.length}const L={};y&4&&(L.play=_[2]),n.$set(L);const H={};y&4&&(H.play=_[2]),f.$set(H)},i(_){k||(U(n.$$.fragment,_),U(f.$$.fragment,_),k=!0)},o(_){j(n.$$.fragment,_),j(f.$$.fragment,_),k=!1},d(_){_&&h(e),we(v,_),Y(n),Y(f),c[5](null)}}}function Je(c,e,s){const r=["blue","red","orange","tan"],a=[];let o,t=!1;me(()=>{setTimeout(()=>{a.forEach((u,m)=>{u.style.transition="transform 1.2s",u.offsetHeight,setTimeout(()=>{u.style.transform="scaleX(1)"},m*150)}),s(1,o.style.clipPath="circle(50% at 50% 50%)",o),s(2,t=!0)},100)});function i(u,m){se[u?"unshift":"push"](()=>{a[m]=u,s(0,a)})}function n(u){se[u?"unshift":"push"](()=>{o=u,s(1,o)})}return[a,o,t,r,i,n]}class Ke extends le{constructor(e){super(),ie(this,e,Je,We,oe,{})}}function Ye(c){let e,s,r;const a=c[4].default,o=Pe(a,c,c[3],null);return{c(){e=g("div"),o&&o.c(),this.h()},l(t){e=p(t,"DIV",{style:!0,class:!0});var i=b(e);o&&o.l(i),i.forEach(h),this.h()},h(){d(e,"style",s=`opacity: ${c[1]?1:0}`),d(e,"class","svelte-1v18v75")},m(t,i){F(t,e,i),o&&o.m(e,null),c[5](e),r=!0},p(t,[i]){o&&o.p&&(!r||i&8)&&Me(o,a,t,t[3],r?Le(a,t[3],i,null):Be(t[3]),null),(!r||i&2&&s!==(s=`opacity: ${t[1]?1:0}`))&&d(e,"style",s)},i(t){r||(U(o,t),r=!0)},o(t){j(o,t),r=!1},d(t){t&&h(e),o&&o.d(t),c[5](null)}}}function Xe(c,e,s){let{$$slots:r={},$$scope:a}=e,{callback:o=()=>{}}=e,t,i=!1;me(()=>{new IntersectionObserver(m=>{i||(s(1,i=m[0].isIntersecting),i&&o())},{root:null,rootMargin:"0px"}).observe(t)});function n(u){se[u?"unshift":"push"](()=>{t=u,s(0,t)})}return c.$$set=u=>{"callback"in u&&s(2,o=u.callback),"$$scope"in u&&s(3,a=u.$$scope)},[t,i,o,a,r,n]}class ve extends le{constructor(e){super(),ie(this,e,Xe,Ye,oe,{callback:2})}}function De(c,e,s){const r=c.slice();return r[9]=e[s].name,r[10]=e[s].img,r[11]=e[s].langs,r[12]=e[s].desc,r[13]=e[s].url,r[14]=e,r[15]=s,r}function ke(c){let e,s,r,a,o,t,i,n=c[9]+"",u,m,f,w,S=c[11].join(", ")+"",E,I,V,C=c[12]+"",A,D,k=c[15];const $=()=>c[6](e,k),v=()=>c[6](null,k);return{c(){e=g("div"),s=g("div"),r=g("img"),t=M(),i=g("a"),u=T(n),f=M(),w=g("p"),E=T(S),I=M(),V=g("p"),A=T(C),D=M(),this.h()},l(_){e=p(_,"DIV",{class:!0});var y=b(e);s=p(y,"DIV",{class:!0});var L=b(s);r=p(L,"IMG",{src:!0,alt:!0,class:!0}),L.forEach(h),t=B(y),i=p(y,"A",{href:!0});var H=b(i);u=R(H,n),H.forEach(h),f=B(y),w=p(y,"P",{});var z=b(w);E=R(z,S),z.forEach(h),I=B(y),V=p(y,"P",{});var x=b(V);A=R(x,C),x.forEach(h),D=B(y),y.forEach(h),this.h()},h(){be(r.src,a=c[10])||d(r,"src",a),d(r,"alt",o=c[9]),d(r,"class","svelte-1x2ndbn"),d(s,"class","image svelte-1x2ndbn"),d(i,"href",m=c[13]),d(e,"class","project svelte-1x2ndbn")},m(_,y){F(_,e,y),l(e,s),l(s,r),l(e,t),l(e,i),l(i,u),l(e,f),l(e,w),l(w,E),l(e,I),l(e,V),l(V,A),l(e,D),$()},p(_,y){c=_,y&1&&!be(r.src,a=c[10])&&d(r,"src",a),y&1&&o!==(o=c[9])&&d(r,"alt",o),y&1&&n!==(n=c[9]+"")&&_e(u,n),y&1&&m!==(m=c[13])&&d(i,"href",m),y&1&&S!==(S=c[11].join(", ")+"")&&_e(E,S),y&1&&C!==(C=c[12]+"")&&_e(A,C),k!==c[15]&&(v(),k=c[15],$())},d(_){_&&h(e),v()}}}function Qe(c){let e,s,r,a,o,t=c[0],i=[];for(let n=0;n<t.length;n+=1)i[n]=ke(De(c,t,n));return{c(){e=g("div"),s=g("div");for(let n=0;n<i.length;n+=1)i[n].c();this.h()},l(n){e=p(n,"DIV",{class:!0,style:!0});var u=b(e);s=p(u,"DIV",{class:!0});var m=b(s);for(let f=0;f<i.length;f+=1)i[f].l(m);m.forEach(h),u.forEach(h),this.h()},h(){d(s,"class","projects mobile svelte-1x2ndbn"),d(e,"class","container svelte-1x2ndbn"),d(e,"style",r=`opacity: ${c[1]?1:0}`)},m(n,u){F(n,e,u),l(e,s);for(let m=0;m<i.length;m+=1)i[m].m(s,null);c[7](s),a||(o=Re(e,"scroll",c[4]),a=!0)},p(n,[u]){if(u&9){t=n[0];let m;for(m=0;m<t.length;m+=1){const f=De(n,t,m);i[m]?i[m].p(f,u):(i[m]=ke(f),i[m].c(),i[m].m(s,null))}for(;m<i.length;m+=1)i[m].d(1);i.length=t.length}u&2&&r!==(r=`opacity: ${n[1]?1:0}`)&&d(e,"style",r)},i:ee,o:ee,d(n){n&&h(e),we(i,n),c[7](null),a=!1,o()}}}function Ze(c,e,s){let{ready:r=!1}=e,{projects:a=[]}=e,o=!1,t;const i=[],n=f=>{Math.ceil(f.target.scrollLeft),!(!t||!i.length)&&i.forEach(w=>{w.style.transform="scale(1)",w.offsetHeight;const S=w.getBoundingClientRect(),E=window.innerWidth/2,I=Math.pow(Math.sin(Math.PI/2*(S.left+S.width/2)/E),window.innerWidth<=500?1:2),V=Math.max(.5,Math.min(1,I));w.style.transform=`scale(${V})`,w.style.opacity=V})};function u(f,w){se[f?"unshift":"push"](()=>{i[w]=f,s(3,i)})}function m(f){se[f?"unshift":"push"](()=>{t=f,s(2,t)})}return c.$$set=f=>{"ready"in f&&s(5,r=f.ready),"projects"in f&&s(0,a=f.projects)},c.$$.update=()=>{if(c.$$.dirty&38&&r&&!o&&(setTimeout(()=>{t.parentNode.scrollTo(window.innerWidth*.3,0),n({target:t.parentNode}),window.addEventListener("resize",()=>{t!=null&&t.parentNode&&n({target:t.parentNode})}),s(1,o=!0)},700),t)){const f=navigator.userAgent;f.match(/iPad/i)||f.match(/iPhone/i)?t.classList.add("mobile"):t.classList.remove("mobile")}},[a,o,t,i,n,r,u,m]}class et extends le{constructor(e){super(),ie(this,e,Ze,Qe,oe,{ready:5,projects:0})}}const{setTimeout:Te}=xe;function tt(c){let e,s,r,a,o,t,i,n,u,m,f,w,S,E,I,V,C;return a=new ue({props:{play:c[3][0],string:"About Me",delay:300}}),{c(){e=g("div"),s=g("div"),r=g("h2"),W(a.$$.fragment),o=M(),t=g("p"),i=T(`I am an undergraduate computer science student at UC San Diego,
            interested in `),n=g("b"),u=T("graphics, embedded systems, and full-stack web development"),m=T(`. I have 7 years of self-taught programming experience working with
            `),f=g("b"),w=T("C and JavaScript"),S=T(`, and am also comfortable working with
            `),E=g("b"),I=T("x86/ARM Assembly, Java, and GLSL"),V=T("."),this.h()},l(A){e=p(A,"DIV",{class:!0});var D=b(e);s=p(D,"DIV",{class:!0});var k=b(s);r=p(k,"H2",{class:!0});var $=b(r);J(a.$$.fragment,$),$.forEach(h),o=B(k),t=p(k,"P",{class:!0});var v=b(t);i=R(v,`I am an undergraduate computer science student at UC San Diego,
            interested in `),n=p(v,"B",{});var _=b(n);u=R(_,"graphics, embedded systems, and full-stack web development"),_.forEach(h),m=R(v,`. I have 7 years of self-taught programming experience working with
            `),f=p(v,"B",{});var y=b(f);w=R(y,"C and JavaScript"),y.forEach(h),S=R(v,`, and am also comfortable working with
            `),E=p(v,"B",{});var L=b(E);I=R(L,"x86/ARM Assembly, Java, and GLSL"),L.forEach(h),V=R(v,"."),v.forEach(h),k.forEach(h),D.forEach(h),this.h()},h(){d(r,"class","svelte-22m5fb"),d(t,"class","svelte-22m5fb"),d(s,"class","box svelte-22m5fb"),d(e,"class","child first svelte-22m5fb")},m(A,D){F(A,e,D),l(e,s),l(s,r),K(a,r,null),l(s,o),l(s,t),l(t,i),l(t,n),l(n,u),l(t,m),l(t,f),l(f,w),l(t,S),l(t,E),l(E,I),l(t,V),C=!0},p(A,D){const k={};D&8&&(k.play=A[3][0]),a.$set(k)},i(A){C||(U(a.$$.fragment,A),C=!0)},o(A){j(a.$$.fragment,A),C=!1},d(A){A&&h(e),Y(a)}}}function st(c){let e,s,r,a,o,t,i,n,u,m,f,w,S,E,I,V,C,A,D,k,$,v,_,y,L,H,z,x,O,Q;return a=new ue({props:{play:c[3][1],string:"Experience",delay:300}}),{c(){e=g("div"),s=g("div"),r=g("h2"),W(a.$$.fragment),o=M(),t=g("p"),i=T("Currently I am a software engineer intern at "),n=g("a"),u=T("Trulioo"),m=T(", where I work on implementing "),f=g("b"),w=T("proof-of-concept projects"),S=T(` and
            developing
            `),E=g("b"),I=T("full-stack WordPress themes"),V=T(`.

            `),C=g("br"),A=M(),D=g("br"),k=T(`

            I am also an `),$=g("b"),v=T("Engineering Manager"),_=T(` with
            `),y=g("a"),L=T("Triton Software Engineering"),H=T(` at
            UCSD, responsible for leading 8 developers in implementing a landing
            page for Los Angeles-based non-profit
            `),z=g("a"),x=T("FixNation"),O=T("."),this.h()},l(N){e=p(N,"DIV",{class:!0});var X=b(e);s=p(X,"DIV",{class:!0});var q=b(s);r=p(q,"H2",{class:!0});var Z=b(r);J(a.$$.fragment,Z),Z.forEach(h),o=B(q),t=p(q,"P",{class:!0});var P=b(t);i=R(P,"Currently I am a software engineer intern at "),n=p(P,"A",{href:!0});var te=b(n);u=R(te,"Trulioo"),te.forEach(h),m=R(P,", where I work on implementing "),f=p(P,"B",{});var G=b(f);w=R(G,"proof-of-concept projects"),G.forEach(h),S=R(P,` and
            developing
            `),E=p(P,"B",{});var ce=b(E);I=R(ce,"full-stack WordPress themes"),ce.forEach(h),V=R(P,`.

            `),C=p(P,"BR",{}),A=B(P),D=p(P,"BR",{}),k=R(P,`

            I am also an `),$=p(P,"B",{});var de=b($);v=R(de,"Engineering Manager"),de.forEach(h),_=R(P,` with
            `),y=p(P,"A",{href:!0});var fe=b(y);L=R(fe,"Triton Software Engineering"),fe.forEach(h),H=R(P,` at
            UCSD, responsible for leading 8 developers in implementing a landing
            page for Los Angeles-based non-profit
            `),z=p(P,"A",{href:!0});var he=b(z);x=R(he,"FixNation"),he.forEach(h),O=R(P,"."),P.forEach(h),q.forEach(h),X.forEach(h),this.h()},h(){d(r,"class","svelte-22m5fb"),d(n,"href","http://trulioo.com"),d(y,"href","https://tse.ucsd.edu"),d(z,"href","https://fixnation.org"),d(t,"class","svelte-22m5fb"),d(s,"class","box svelte-22m5fb"),d(e,"class","child second svelte-22m5fb")},m(N,X){F(N,e,X),l(e,s),l(s,r),K(a,r,null),l(s,o),l(s,t),l(t,i),l(t,n),l(n,u),l(t,m),l(t,f),l(f,w),l(t,S),l(t,E),l(E,I),l(t,V),l(t,C),l(t,A),l(t,D),l(t,k),l(t,$),l($,v),l(t,_),l(t,y),l(y,L),l(t,H),l(t,z),l(z,x),l(t,O),Q=!0},p(N,X){const q={};X&8&&(q.play=N[3][1]),a.$set(q)},i(N){Q||(U(a.$$.fragment,N),Q=!0)},o(N){j(a.$$.fragment,N),Q=!1},d(N){N&&h(e),Y(a)}}}function nt(c){let e,s,r,a,o,t,i,n;return a=new ue({props:{play:c[3][2],string:"Projects",delay:300}}),i=new et({props:{ready:c[1],projects:c[4]}}),{c(){e=g("div"),s=g("div"),r=g("h2"),W(a.$$.fragment),o=M(),t=g("p"),W(i.$$.fragment),this.h()},l(u){e=p(u,"DIV",{class:!0});var m=b(e);s=p(m,"DIV",{class:!0});var f=b(s);r=p(f,"H2",{class:!0});var w=b(r);J(a.$$.fragment,w),w.forEach(h),o=B(f),t=p(f,"P",{class:!0});var S=b(t);J(i.$$.fragment,S),S.forEach(h),f.forEach(h),m.forEach(h),this.h()},h(){d(r,"class","box svelte-22m5fb"),d(t,"class","svelte-22m5fb"),d(s,"class","projects svelte-22m5fb"),d(e,"class","child third svelte-22m5fb")},m(u,m){F(u,e,m),l(e,s),l(s,r),K(a,r,null),l(s,o),l(s,t),K(i,t,null),n=!0},p(u,m){const f={};m&8&&(f.play=u[3][2]),a.$set(f);const w={};m&2&&(w.ready=u[1]),i.$set(w)},i(u){n||(U(a.$$.fragment,u),U(i.$$.fragment,u),n=!0)},o(u){j(a.$$.fragment,u),j(i.$$.fragment,u),n=!1},d(u){u&&h(e),Y(a),Y(i)}}}function rt(c){let e,s,r,a,o,t,i,n,u,m,f,w,S,E,I,V,C,A,D,k,$,v,_,y,L,H,z,x,O,Q,N,X;return a=new ue({props:{play:c[3][3],string:"Resume & Contact",delay:300}}),{c(){e=g("div"),s=g("div"),r=g("h2"),W(a.$$.fragment),o=M(),t=g("p"),i=g("a"),n=ne("svg"),u=ne("path"),m=T(`
              Resume`),f=M(),w=g("br"),S=M(),E=g("a"),I=ne("svg"),V=ne("path"),C=T(`
              GitHub`),A=M(),D=g("br"),k=M(),$=g("a"),v=ne("svg"),_=ne("path"),y=T(`
              LinkedIn`),L=M(),H=g("br"),z=M(),x=g("span"),O=ne("svg"),Q=ne("path"),N=T(`
              alrussell (at) ucsd.edu`),this.h()},l(q){e=p(q,"DIV",{class:!0});var Z=b(e);s=p(Z,"DIV",{class:!0});var P=b(s);r=p(P,"H2",{class:!0});var te=b(r);J(a.$$.fragment,te),te.forEach(h),o=B(P),t=p(P,"P",{class:!0});var G=b(t);i=p(G,"A",{class:!0,href:!0});var ce=b(i);n=re(ce,"svg",{xmlns:!0,"xmlns:xlink":!0,version:!0,viewBox:!0,class:!0});var de=b(n);u=re(de,"path",{d:!0}),b(u).forEach(h),de.forEach(h),m=R(ce,`
              Resume`),ce.forEach(h),f=B(G),w=p(G,"BR",{}),S=B(G),E=p(G,"A",{class:!0,href:!0});var fe=b(E);I=re(fe,"svg",{xmlns:!0,viewBox:!0,class:!0});var he=b(I);V=re(he,"path",{d:!0}),b(V).forEach(h),he.forEach(h),C=R(fe,`
              GitHub`),fe.forEach(h),A=B(G),D=p(G,"BR",{}),k=B(G),$=p(G,"A",{class:!0,href:!0});var ge=b($);v=re(ge,"svg",{xmlns:!0,viewBox:!0,class:!0});var Ee=b(v);_=re(Ee,"path",{d:!0}),b(_).forEach(h),Ee.forEach(h),y=R(ge,`
              LinkedIn`),ge.forEach(h),L=B(G),H=p(G,"BR",{}),z=B(G),x=p(G,"SPAN",{class:!0});var pe=b(x);O=re(pe,"svg",{xmlns:!0,viewBox:!0,class:!0});var ye=b(O);Q=re(ye,"path",{d:!0}),b(Q).forEach(h),ye.forEach(h),N=R(pe,`
              alrussell (at) ucsd.edu`),pe.forEach(h),G.forEach(h),P.forEach(h),Z.forEach(h),this.h()},h(){d(r,"class","svelte-22m5fb"),d(u,"d","M64 0q-27 1 -45 19v0q-18 18 -19 45v384q1 27 19 45t45 19h256q27 -1 45 -19t19 -45v-288h-128q-14 0 -23 -9t-9 -23v-128h-160v0zM256 0v128h128l-128 -128v0zM256 256q-1 27 -19 45v0q-18 18 -45 19q-27 -1 -45 -19t-19 -45q1 -27 19 -45t45 -19q27 1 45 19t19 45v0z M80 432q1 -34 23 -57v0q23 -22 57 -23h64q34 1 57 23q22 23 23 57q-1 15 -16 16h-192q-15 -1 -16 -16v0z"),d(n,"xmlns","http://www.w3.org/2000/svg"),d(n,"xmlns:xlink","http://www.w3.org/1999/xlink"),d(n,"version","1.1"),d(n,"viewBox","-10 0 404 512"),d(n,"class","svelte-22m5fb"),d(i,"class","contact svelte-22m5fb"),d(i,"href",ae+"/resume.pdf"),d(V,"d","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"),d(I,"xmlns","http://www.w3.org/2000/svg"),d(I,"viewBox","0 0 496 512"),d(I,"class","svelte-22m5fb"),d(E,"class","contact svelte-22m5fb"),d(E,"href","https://github.com/Cubified"),d(_,"d","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"),d(v,"xmlns","http://www.w3.org/2000/svg"),d(v,"viewBox","0 0 448 512"),d(v,"class","svelte-22m5fb"),d($,"class","contact svelte-22m5fb"),d($,"href","https://linkedin.com/in/andrewlrussell"),d(Q,"d","M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"),d(O,"xmlns","http://www.w3.org/2000/svg"),d(O,"viewBox","0 0 512 512"),d(O,"class","svelte-22m5fb"),d(x,"class","contact svelte-22m5fb"),d(t,"class","svelte-22m5fb"),d(s,"class","box svelte-22m5fb"),d(e,"class","child fourth svelte-22m5fb")},m(q,Z){F(q,e,Z),l(e,s),l(s,r),K(a,r,null),l(s,o),l(s,t),l(t,i),l(i,n),l(n,u),l(i,m),l(t,f),l(t,w),l(t,S),l(t,E),l(E,I),l(I,V),l(E,C),l(t,A),l(t,D),l(t,k),l(t,$),l($,v),l(v,_),l($,y),l(t,L),l(t,H),l(t,z),l(t,x),l(x,O),l(O,Q),l(x,N),X=!0},p(q,Z){const P={};Z&8&&(P.play=q[3][3]),a.$set(P)},i(q){X||(U(a.$$.fragment,q),X=!0)},o(q){j(a.$$.fragment,q),X=!1},d(q){q&&h(e),Y(a)}}}function at(c){let e=!1,s=()=>{e=!1},r,a,o,t,i,n,u,m,f,w,S,E,I,V,C,A,D,k,$;return He(c[6]),w=new ve({props:{callback:c[7],$$slots:{default:[tt]},$$scope:{ctx:c}}}),E=new ve({props:{callback:c[8],$$slots:{default:[st]},$$scope:{ctx:c}}}),V=new ve({props:{callback:c[9],$$slots:{default:[nt]},$$scope:{ctx:c}}}),A=new ve({props:{callback:c[10],$$slots:{default:[rt]},$$scope:{ctx:c}}}),{c(){a=g("div"),o=g("div"),t=M(),i=g("div"),n=M(),u=g("div"),m=M(),f=g("div"),W(w.$$.fragment),S=M(),W(E.$$.fragment),I=M(),W(V.$$.fragment),C=M(),W(A.$$.fragment),this.h()},l(v){a=p(v,"DIV",{class:!0});var _=b(a);o=p(_,"DIV",{class:!0}),b(o).forEach(h),t=B(_),i=p(_,"DIV",{class:!0}),b(i).forEach(h),n=B(_),u=p(_,"DIV",{class:!0}),b(u).forEach(h),m=B(_),f=p(_,"DIV",{class:!0});var y=b(f);J(w.$$.fragment,y),S=B(y),J(E.$$.fragment,y),I=B(y),J(V.$$.fragment,y),C=B(y),J(A.$$.fragment,y),y.forEach(h),_.forEach(h),this.h()},h(){d(o,"class","bar first svelte-22m5fb"),d(i,"class","bar second svelte-22m5fb"),d(u,"class","bar third svelte-22m5fb"),d(f,"class","content svelte-22m5fb"),d(a,"class","bio svelte-22m5fb")},m(v,_){F(v,a,_),l(a,o),l(a,t),l(a,i),l(a,n),l(a,u),l(a,m),l(a,f),K(w,f,null),l(f,S),K(E,f,null),l(f,I),K(V,f,null),l(f,C),K(A,f,null),c[11](f),D=!0,k||($=Re(window,"scroll",()=>{e=!0,clearTimeout(r),r=Te(s,100),c[6]()}),k=!0)},p(v,[_]){_&4&&!e&&(e=!0,clearTimeout(r),scrollTo(window.pageXOffset,v[2]),r=Te(s,100));const y={};_&4104&&(y.$$scope={dirty:_,ctx:v}),w.$set(y);const L={};_&4104&&(L.$$scope={dirty:_,ctx:v}),E.$set(L);const H={};_&2&&(H.callback=v[9]),_&4106&&(H.$$scope={dirty:_,ctx:v}),V.$set(H);const z={};_&4104&&(z.$$scope={dirty:_,ctx:v}),A.$set(z)},i(v){D||(U(w.$$.fragment,v),U(E.$$.fragment,v),U(V.$$.fragment,v),U(A.$$.fragment,v),D=!0)},o(v){j(w.$$.fragment,v),j(E.$$.fragment,v),j(V.$$.fragment,v),j(A.$$.fragment,v),D=!1},d(v){v&&h(a),Y(w),Y(E),Y(V),Y(A),c[11](null),k=!1,$()}}}function lt(c,e,s){const r=[{name:"tuibox",img:"https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif",url:"https://github.com/Cubified/tuibox",langs:["C"],desc:"A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line."},{name:"mode7",img:`${ae}/mode7.gif`,url:"https://github.com/Cubified/mode7",langs:["JavaScript"],desc:"A pure-Javascript perspective transform (a la SNES Mode 7)."},{name:"ntwm",img:"https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png",url:"https://github.com/Cubified/ntwm",langs:["C"],desc:"A tiny, frameless, keyboard-driven tiling window manager with multimonitor support."},{name:"lush",img:"https://github.com/Cubified/lush/raw/main/demo.gif",url:"https://github.com/Cubified/lush",langs:["x86 Assembly","C"],desc:"A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly."},{name:"Make-A-Wish Volunteer Hub",img:`${ae}/maw.png`,url:"https://github.com/TritonSE/MAW-Volunteer-Hub",langs:["React.js","MongoDB"],desc:"A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering."},{name:"bdfedit",img:"https://github.com/Cubified/bdfedit/raw/main/demo.gif",url:"https://github.com/Cubified/bdfedit",langs:["C"],desc:"A terminal-based, mouse-driven BDF (bitmap) font editor."},{name:"term",img:"https://github.com/Cubified/term/raw/main/demo.gif",url:"https://github.com/Cubified/term",langs:["C"],desc:"A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support."},{name:"React Simple Scheduler",img:"https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png",url:"https://github.com/Cubified/react-simple-scheduler",langs:["TypeScript","React","SASS"],desc:"Simple, extensible scheduler and calendar components for React, modeled after Google Calendar."},{name:"Softbody",img:"https://github.com/Cubified/softbody/raw/main/demo.png",url:"https://github.com/Cubified/softbody",langs:["JavaScript"],desc:"A simple soft body physics simulation for n-sided polygons."}],a=async I=>{await qe(),setTimeout(()=>{s(3,n[I]=!0,n),s(0,o.children[I].children[0].style.width="100vw",o),setTimeout(()=>{s(0,o.children[I].children[0].style.transition="none",o)},600)},I*100)};let o,t=!1,i=0,n=new Array(5).fill(!1);function u(){s(2,i=window.pageYOffset)}const m=()=>a(0),f=()=>a(1),w=()=>{a(2),s(1,t=!0)},S=()=>a(3);function E(I){se[I?"unshift":"push"](()=>{o=I,s(0,o)})}return[o,t,i,n,r,a,u,m,f,w,S,E]}class it extends le{constructor(e){super(),ie(this,e,lt,at,oe,{})}}function ot(c){let e,s,r,a,o,t,i,n,u;return{c(){e=g("div"),s=g("p"),r=T("Built from scratch with "),a=g("a"),o=T("SvelteKit"),t=T(" and "),i=g("a"),n=T("GitHub Pages"),u=T("."),this.h()},l(m){e=p(m,"DIV",{class:!0});var f=b(e);s=p(f,"P",{});var w=b(s);r=R(w,"Built from scratch with "),a=p(w,"A",{href:!0});var S=b(a);o=R(S,"SvelteKit"),S.forEach(h),t=R(w," and "),i=p(w,"A",{href:!0});var E=b(i);n=R(E,"GitHub Pages"),E.forEach(h),u=R(w,"."),w.forEach(h),f.forEach(h),this.h()},h(){d(a,"href","https://kit.svelte.dev"),d(i,"href","https://github.com/Cubified/cubified.github.io"),d(e,"class","footer svelte-4x6tdp")},m(m,f){F(m,e,f),l(e,s),l(s,r),l(s,a),l(a,o),l(s,t),l(s,i),l(i,n),l(s,u)},p:ee,i:ee,o:ee,d(m){m&&h(e)}}}class ct extends le{constructor(e){super(),ie(this,e,null,ot,oe,{})}}function ft(c){let e,s,r,a,o,t,i,n,u,m,f,w,S,E,I,V,C,A,D,k;return m=new Ue({}),I=new Ke({}),C=new it({}),D=new ct({}),{c(){e=g("link"),s=g("link"),r=g("link"),a=g("link"),o=g("meta"),t=g("meta"),i=g("meta"),n=M(),u=g("div"),W(m.$$.fragment),f=M(),w=g("div"),S=M(),E=g("div"),W(I.$$.fragment),V=M(),W(C.$$.fragment),A=M(),W(D.$$.fragment),this.h()},l($){const v=Ne("svelte-10mr0pb",document.head);e=p(v,"LINK",{rel:!0,sizes:!0,href:!0}),s=p(v,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),r=p(v,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),a=p(v,"LINK",{rel:!0,href:!0}),o=p(v,"META",{charset:!0}),t=p(v,"META",{name:!0,content:!0}),i=p(v,"META",{name:!0,content:!0}),v.forEach(h),n=B($),u=p($,"DIV",{class:!0});var _=b(u);J(m.$$.fragment,_),f=B(_),w=p(_,"DIV",{class:!0}),b(w).forEach(h),_.forEach(h),S=B($),E=p($,"DIV",{class:!0});var y=b(E);J(I.$$.fragment,y),V=B(y),J(C.$$.fragment,y),A=B(y),J(D.$$.fragment,y),y.forEach(h),this.h()},h(){d(e,"rel","apple-touch-icon"),d(e,"sizes","180x180"),d(e,"href",ae+"/apple-touch-icon.png"),d(s,"rel","icon"),d(s,"type","image/png"),d(s,"sizes","32x32"),d(s,"href",ae+"/favicon-32x32.png"),d(r,"rel","icon"),d(r,"type","image/png"),d(r,"sizes","16x16"),d(r,"href",ae+"/favicon-16x16.png"),d(a,"rel","manifest"),d(a,"href",ae+"/site.webmanifest"),d(o,"charset","utf-8"),d(t,"name","viewport"),d(t,"content","width=device-width, initial-scale=1"),d(i,"name","description"),d(i,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell",d(w,"class","splitter svelte-s2btq5"),Ae(w,"shown",c[1]),d(u,"class","parent svelte-s2btq5"),d(E,"class","above svelte-s2btq5")},m($,v){l(document.head,e),l(document.head,s),l(document.head,r),l(document.head,a),l(document.head,o),l(document.head,t),l(document.head,i),F($,n,v),F($,u,v),K(m,u,null),l(u,f),l(u,w),c[2](w),F($,S,v),F($,E,v),K(I,E,null),l(E,V),K(C,E,null),l(E,A),K(D,E,null),k=!0},p($,[v]){(!k||v&2)&&Ae(w,"shown",$[1])},i($){k||(U(m.$$.fragment,$),U(I.$$.fragment,$),U(C.$$.fragment,$),U(D.$$.fragment,$),k=!0)},o($){j(m.$$.fragment,$),j(I.$$.fragment,$),j(C.$$.fragment,$),j(D.$$.fragment,$),k=!1},d($){h(e),h(s),h(r),h(a),h(o),h(t),h(i),$&&h(n),$&&h(u),Y(m),c[2](null),$&&h(S),$&&h(E),Y(I),Y(C),Y(D)}}}function ut(c,e,s){let r,a=!1;me(()=>{setTimeout(()=>{s(0,r.style.transition="transform 1s",r),r.offsetHeight,s(1,a=!0)},100)});function o(t){se[t?"unshift":"push"](()=>{r=t,s(0,r)})}return[r,a,o]}class mt extends le{constructor(e){super(),ie(this,e,ut,ft,oe,{})}}export{mt as default};