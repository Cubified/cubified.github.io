import{S as re,i as ae,s as ie,e as Ee,b as U,B as le,I as we,h,o as me,k as p,q as S,l as g,m as b,r as T,n as u,G as r,J as ne,a as z,w as O,c as B,x,K as be,y as X,f as W,t as K,z as Y,L as ze,C as Be,D as qe,E as He,F as Le,M as Te,u as _e,N as Pe,O as Re,P as ee,Q as te,A as je,R as Ne,T as Ie}from"../../chunks/index-5d70f185.js";import{c as se}from"../../chunks/shared-23917130.js";function ke(o,e,s){const n=o.slice();return n[8]=e[s],n[9]=e,n[10]=s,n}function Ve(o){let e,s=o[8]+"",n,l,a=o[10];const t=()=>o[6](e,a),i=()=>o[6](null,a);return{c(){e=p("span"),n=S(s),l=S(" "),this.h()},l(c){e=g(c,"SPAN",{class:!0});var d=b(e);n=T(d,s),l=T(d," "),d.forEach(h),this.h()},h(){u(e,"class","svelte-1k08ixd")},m(c,d){U(c,e,d),r(e,n),r(e,l),t()},p(c,d){o=c,a!==o[10]&&(i(),a=o[10],t())},d(c){c&&h(e),i()}}}function Ge(o){let e,s=o[1],n=[];for(let l=0;l<s.length;l+=1)n[l]=Ve(ke(o,s,l));return{c(){for(let l=0;l<n.length;l+=1)n[l].c();e=Ee()},l(l){for(let a=0;a<n.length;a+=1)n[a].l(l);e=Ee()},m(l,a){for(let t=0;t<n.length;t+=1)n[t].m(l,a);U(l,e,a)},p(l,[a]){if(a&3){s=l[1];let t;for(t=0;t<s.length;t+=1){const i=ke(l,s,t);n[t]?n[t].p(i,a):(n[t]=Ve(i),n[t].c(),n[t].m(e.parentNode,e))}for(;t<n.length;t+=1)n[t].d(1);n.length=s.length}},i:le,o:le,d(l){we(n,l),l&&h(e)}}}function Ue(o,e,s){let{string:n=""}=e,{delay:l=0}=e,{interval:a=100}=e,{play:t=void 0}=e;const i=n.split(" "),c=[],d=()=>{setTimeout(()=>{c.forEach((f,_)=>{setTimeout(()=>{f.style.transform="translateY(0)",f.style.clipPath="inset(0)"},_*a)})},l)};me(()=>{t===void 0&&d()});function v(f,_){ne[f?"unshift":"push"](()=>{c[_]=f,s(0,c)})}return o.$$set=f=>{"string"in f&&s(2,n=f.string),"delay"in f&&s(3,l=f.delay),"interval"in f&&s(4,a=f.interval),"play"in f&&s(5,t=f.play)},o.$$.update=()=>{o.$$.dirty&32&&t&&d()},[c,i,n,l,a,t,v]}class ue extends re{constructor(e){super(),ae(this,e,Ue,Ge,ie,{string:2,delay:3,interval:4,play:5})}}function Ae(o,e,s){const n=o.slice();return n[5]=e[s],n[6]=e,n[7]=s,n}function De(o){let e,s=o[7];const n=()=>o[3](e,s),l=()=>o[3](null,s);return{c(){e=p("div"),this.h()},l(a){e=g(a,"DIV",{class:!0}),b(e).forEach(h),this.h()},h(){u(e,"class",ze(`bar ${o[5]}`)+" svelte-19pv93h")},m(a,t){U(a,e,t),n()},p(a,t){o=a,s!==o[7]&&(l(),s=o[7],n())},d(a){a&&h(e),l()}}}function Je(o){let e,s,n,l,a,t,i,c,d,v,f,_,k,E,I,D,M,C,y,V=o[2],A=[];for(let m=0;m<V.length;m+=1)A[m]=De(Ae(o,V,m));return i=new ue({props:{string:"Hi, I'm Andrew Russell."}}),v=new ue({props:{string:"I'm a computer science student studying at UC San Diego.",delay:200,interval:50}}),{c(){e=p("div"),s=p("div");for(let m=0;m<A.length;m+=1)A[m].c();n=z(),l=p("div"),a=p("div"),t=p("h1"),O(i.$$.fragment),c=z(),d=p("h3"),O(v.$$.fragment),f=z(),_=p("div"),k=p("div"),E=p("div"),I=p("div"),D=p("div"),M=p("img"),this.h()},l(m){e=g(m,"DIV",{class:!0});var $=b(e);s=g($,"DIV",{class:!0});var w=b(s);for(let Z=0;Z<A.length;Z+=1)A[Z].l(w);w.forEach(h),n=B($),l=g($,"DIV",{class:!0});var H=b(l);a=g(H,"DIV",{});var P=b(a);t=g(P,"H1",{});var R=b(t);x(i.$$.fragment,R),R.forEach(h),c=B(P),d=g(P,"H3",{});var N=b(d);x(v.$$.fragment,N),N.forEach(h),P.forEach(h),H.forEach(h),f=B($),_=g($,"DIV",{class:!0});var J=b(_);k=g(J,"DIV",{class:!0});var Q=b(k);E=g(Q,"DIV",{class:!0});var j=b(E);I=g(j,"DIV",{class:!0});var F=b(I);D=g(F,"DIV",{class:!0});var L=b(D);M=g(L,"IMG",{src:!0,alt:!0,class:!0}),L.forEach(h),F.forEach(h),j.forEach(h),Q.forEach(h),J.forEach(h),$.forEach(h),this.h()},h(){u(s,"class","bars svelte-19pv93h"),u(l,"class","hero svelte-19pv93h"),be(M.src,C=se+"/me.png")||u(M,"src",C),u(M,"alt","Andrew Russell"),u(M,"class","svelte-19pv93h"),u(D,"class","circ fourth svelte-19pv93h"),u(I,"class","circ third svelte-19pv93h"),u(E,"class","circ second svelte-19pv93h"),u(k,"class","circ first svelte-19pv93h"),u(_,"class","circles svelte-19pv93h"),u(e,"class","intro svelte-19pv93h")},m(m,$){U(m,e,$),r(e,s);for(let w=0;w<A.length;w+=1)A[w].m(s,null);r(e,n),r(e,l),r(l,a),r(a,t),X(i,t,null),r(a,c),r(a,d),X(v,d,null),r(e,f),r(e,_),r(_,k),r(k,E),r(E,I),r(I,D),r(D,M),o[4](_),y=!0},p(m,[$]){if($&5){V=m[2];let w;for(w=0;w<V.length;w+=1){const H=Ae(m,V,w);A[w]?A[w].p(H,$):(A[w]=De(H),A[w].c(),A[w].m(s,null))}for(;w<A.length;w+=1)A[w].d(1);A.length=V.length}},i(m){y||(W(i.$$.fragment,m),W(v.$$.fragment,m),y=!0)},o(m){K(i.$$.fragment,m),K(v.$$.fragment,m),y=!1},d(m){m&&h(e),we(A,m),Y(i),Y(v),o[4](null)}}}function We(o,e,s){const n=["blue","red","orange","tan"],l=[];let a;me(()=>{setTimeout(()=>{l.forEach((c,d)=>{c.style.transition="transform 1.2s",c.offsetHeight,setTimeout(()=>{c.style.transform="scaleX(1)"},d*150)}),s(1,a.style.clipPath="circle(50% at 50% 50%)",a)},100)});function t(c,d){ne[c?"unshift":"push"](()=>{l[d]=c,s(0,l)})}function i(c){ne[c?"unshift":"push"](()=>{a=c,s(1,a)})}return[l,a,n,t,i]}class Ke extends re{constructor(e){super(),ae(this,e,We,Je,ie,{})}}function Fe(o){let e,s,n;const l=o[4].default,a=Be(l,o,o[3],null);return{c(){e=p("div"),a&&a.c(),this.h()},l(t){e=g(t,"DIV",{style:!0,class:!0});var i=b(e);a&&a.l(i),i.forEach(h),this.h()},h(){u(e,"style",s=`opacity: ${o[1]?1:0}`),u(e,"class","svelte-1v18v75")},m(t,i){U(t,e,i),a&&a.m(e,null),o[5](e),n=!0},p(t,[i]){a&&a.p&&(!n||i&8)&&qe(a,l,t,t[3],n?Le(l,t[3],i,null):He(t[3]),null),(!n||i&2&&s!==(s=`opacity: ${t[1]?1:0}`))&&u(e,"style",s)},i(t){n||(W(a,t),n=!0)},o(t){K(a,t),n=!1},d(t){t&&h(e),a&&a.d(t),o[5](null)}}}function Oe(o,e,s){let{$$slots:n={},$$scope:l}=e,{callback:a=()=>{}}=e,t,i=!1;me(()=>{new IntersectionObserver(v=>{i||(s(1,i=v[0].isIntersecting),i&&a())},{root:null,rootMargin:"0px"}).observe(t)});function c(d){ne[d?"unshift":"push"](()=>{t=d,s(0,t)})}return o.$$set=d=>{"callback"in d&&s(2,a=d.callback),"$$scope"in d&&s(3,l=d.$$scope)},[t,i,a,l,n,c]}class ve extends re{constructor(e){super(),ae(this,e,Oe,Fe,ie,{callback:2})}}function Ce(o,e,s){const n=o.slice();return n[9]=e[s].name,n[10]=e[s].img,n[11]=e[s].langs,n[12]=e[s].desc,n[13]=e[s].url,n[14]=e,n[15]=s,n}function Me(o){let e,s,n,l,a,t,i,c=o[9]+"",d,v,f,_,k=o[11].join(", ")+"",E,I,D,M=o[12]+"",C,y,V=o[15];const A=()=>o[6](e,V),m=()=>o[6](null,V);return{c(){e=p("div"),s=p("div"),n=p("img"),t=z(),i=p("a"),d=S(c),f=z(),_=p("p"),E=S(k),I=z(),D=p("p"),C=S(M),y=z(),this.h()},l($){e=g($,"DIV",{class:!0});var w=b(e);s=g(w,"DIV",{class:!0});var H=b(s);n=g(H,"IMG",{src:!0,alt:!0,class:!0}),H.forEach(h),t=B(w),i=g(w,"A",{href:!0});var P=b(i);d=T(P,c),P.forEach(h),f=B(w),_=g(w,"P",{});var R=b(_);E=T(R,k),R.forEach(h),I=B(w),D=g(w,"P",{});var N=b(D);C=T(N,M),N.forEach(h),y=B(w),w.forEach(h),this.h()},h(){be(n.src,l=o[10])||u(n,"src",l),u(n,"alt",a=o[9]),u(n,"class","svelte-1x2ndbn"),u(s,"class","image svelte-1x2ndbn"),u(i,"href",v=o[13]),u(e,"class","project svelte-1x2ndbn")},m($,w){U($,e,w),r(e,s),r(s,n),r(e,t),r(e,i),r(i,d),r(e,f),r(e,_),r(_,E),r(e,I),r(e,D),r(D,C),r(e,y),A()},p($,w){o=$,w&1&&!be(n.src,l=o[10])&&u(n,"src",l),w&1&&a!==(a=o[9])&&u(n,"alt",a),w&1&&c!==(c=o[9]+"")&&_e(d,c),w&1&&v!==(v=o[13])&&u(i,"href",v),w&1&&k!==(k=o[11].join(", ")+"")&&_e(E,k),w&1&&M!==(M=o[12]+"")&&_e(C,M),V!==o[15]&&(m(),V=o[15],A())},d($){$&&h(e),m()}}}function xe(o){let e,s,n,l,a,t=o[0],i=[];for(let c=0;c<t.length;c+=1)i[c]=Me(Ce(o,t,c));return{c(){e=p("div"),s=p("div");for(let c=0;c<i.length;c+=1)i[c].c();this.h()},l(c){e=g(c,"DIV",{class:!0,style:!0});var d=b(e);s=g(d,"DIV",{class:!0});var v=b(s);for(let f=0;f<i.length;f+=1)i[f].l(v);v.forEach(h),d.forEach(h),this.h()},h(){u(s,"class","projects mobile svelte-1x2ndbn"),u(e,"class","container svelte-1x2ndbn"),u(e,"style",n=`opacity: ${o[1]?1:0}`)},m(c,d){U(c,e,d),r(e,s);for(let v=0;v<i.length;v+=1)i[v].m(s,null);o[7](s),l||(a=Te(e,"scroll",o[4]),l=!0)},p(c,[d]){if(d&9){t=c[0];let v;for(v=0;v<t.length;v+=1){const f=Ce(c,t,v);i[v]?i[v].p(f,d):(i[v]=Me(f),i[v].c(),i[v].m(s,null))}for(;v<i.length;v+=1)i[v].d(1);i.length=t.length}d&2&&n!==(n=`opacity: ${c[1]?1:0}`)&&u(e,"style",n)},i:le,o:le,d(c){c&&h(e),we(i,c),o[7](null),l=!1,a()}}}function Xe(o,e,s){let{ready:n=!1}=e,{projects:l=[]}=e,a=!1,t;const i=[],c=f=>{Math.ceil(f.target.scrollLeft),!(!t||!i.length)&&i.forEach(_=>{_.style.transform="scale(1)",_.offsetHeight;const k=_.getBoundingClientRect(),E=window.innerWidth/2,I=Math.pow(Math.sin(Math.PI/2*(k.left+k.width/2)/E),window.innerWidth<=500?1:2),D=Math.max(.5,Math.min(1,I));_.style.transform=`scale(${D})`,_.style.opacity=D})};function d(f,_){ne[f?"unshift":"push"](()=>{i[_]=f,s(3,i)})}function v(f){ne[f?"unshift":"push"](()=>{t=f,s(2,t)})}return o.$$set=f=>{"ready"in f&&s(5,n=f.ready),"projects"in f&&s(0,l=f.projects)},o.$$.update=()=>{if(o.$$.dirty&38&&n&&!a&&(setTimeout(()=>{t.parentNode.scrollTo(window.innerWidth*.3,0),c({target:t.parentNode}),window.addEventListener("resize",()=>{t!=null&&t.parentNode&&c({target:t.parentNode})}),s(1,a=!0)},700),t)){const f=navigator.userAgent;f.match(/iPad/i)||f.match(/iPhone/i)?t.classList.add("mobile"):t.classList.remove("mobile")}},[l,a,t,i,c,n,d,v]}class Ye extends re{constructor(e){super(),ae(this,e,Xe,xe,ie,{ready:5,projects:0})}}const{setTimeout:Se}=Re;function Qe(o){let e,s,n,l,a,t,i,c,d,v,f,_,k,E,I,D,M;return l=new ue({props:{play:o[3][0],string:"About Me",delay:300}}),{c(){e=p("div"),s=p("div"),n=p("h2"),O(l.$$.fragment),a=z(),t=p("p"),i=S(`I am an undergraduate computer science student at UC San Diego,
            interested in `),c=p("b"),d=S("graphics, embedded systems, and full-stack web development"),v=S(`. I have 7 years of self-taught programming experience working with
            `),f=p("b"),_=S("C and JavaScript"),k=S(`, and am also comfortable working with
            `),E=p("b"),I=S("x86/ARM Assembly, Java, and GLSL"),D=S("."),this.h()},l(C){e=g(C,"DIV",{class:!0});var y=b(e);s=g(y,"DIV",{class:!0});var V=b(s);n=g(V,"H2",{class:!0});var A=b(n);x(l.$$.fragment,A),A.forEach(h),a=B(V),t=g(V,"P",{class:!0});var m=b(t);i=T(m,`I am an undergraduate computer science student at UC San Diego,
            interested in `),c=g(m,"B",{});var $=b(c);d=T($,"graphics, embedded systems, and full-stack web development"),$.forEach(h),v=T(m,`. I have 7 years of self-taught programming experience working with
            `),f=g(m,"B",{});var w=b(f);_=T(w,"C and JavaScript"),w.forEach(h),k=T(m,`, and am also comfortable working with
            `),E=g(m,"B",{});var H=b(E);I=T(H,"x86/ARM Assembly, Java, and GLSL"),H.forEach(h),D=T(m,"."),m.forEach(h),V.forEach(h),y.forEach(h),this.h()},h(){u(n,"class","svelte-86pi94"),u(t,"class","svelte-86pi94"),u(s,"class","box svelte-86pi94"),u(e,"class","child first svelte-86pi94")},m(C,y){U(C,e,y),r(e,s),r(s,n),X(l,n,null),r(s,a),r(s,t),r(t,i),r(t,c),r(c,d),r(t,v),r(t,f),r(f,_),r(t,k),r(t,E),r(E,I),r(t,D),M=!0},p(C,y){const V={};y&8&&(V.play=C[3][0]),l.$set(V)},i(C){M||(W(l.$$.fragment,C),M=!0)},o(C){K(l.$$.fragment,C),M=!1},d(C){C&&h(e),Y(l)}}}function Ze(o){let e,s,n,l,a,t,i,c,d,v,f,_,k,E,I,D,M,C,y,V,A,m,$,w,H,P,R,N,J,Q;return l=new ue({props:{play:o[3][1],string:"Experience",delay:300}}),{c(){e=p("div"),s=p("div"),n=p("h2"),O(l.$$.fragment),a=z(),t=p("p"),i=S("Currently I am a software engineer intern at "),c=p("a"),d=S("Trulioo"),v=S(", where I work on implementing "),f=p("b"),_=S("proof-of-concept projects"),k=S(` and
            developing
            `),E=p("b"),I=S("full-stack WordPress themes"),D=S(`.

            `),M=p("br"),C=z(),y=p("br"),V=S(`

            I am also an `),A=p("b"),m=S("Engineering Manager"),$=S(` with
            `),w=p("a"),H=S("Triton Software Engineering"),P=S(` at
            UCSD, responsible for leading 8 developers in implementing a landing
            page for Los Angeles-based non-profit
            `),R=p("a"),N=S("FixNation"),J=S("."),this.h()},l(j){e=g(j,"DIV",{class:!0});var F=b(e);s=g(F,"DIV",{class:!0});var L=b(s);n=g(L,"H2",{class:!0});var Z=b(n);x(l.$$.fragment,Z),Z.forEach(h),a=B(L),t=g(L,"P",{class:!0});var q=b(t);i=T(q,"Currently I am a software engineer intern at "),c=g(q,"A",{href:!0});var fe=b(c);d=T(fe,"Trulioo"),fe.forEach(h),v=T(q,", where I work on implementing "),f=g(q,"B",{});var G=b(f);_=T(G,"proof-of-concept projects"),G.forEach(h),k=T(q,` and
            developing
            `),E=g(q,"B",{});var oe=b(E);I=T(oe,"full-stack WordPress themes"),oe.forEach(h),D=T(q,`.

            `),M=g(q,"BR",{}),C=B(q),y=g(q,"BR",{}),V=T(q,`

            I am also an `),A=g(q,"B",{});var he=b(A);m=T(he,"Engineering Manager"),he.forEach(h),$=T(q,` with
            `),w=g(q,"A",{href:!0});var ce=b(w);H=T(ce,"Triton Software Engineering"),ce.forEach(h),P=T(q,` at
            UCSD, responsible for leading 8 developers in implementing a landing
            page for Los Angeles-based non-profit
            `),R=g(q,"A",{href:!0});var de=b(R);N=T(de,"FixNation"),de.forEach(h),J=T(q,"."),q.forEach(h),L.forEach(h),F.forEach(h),this.h()},h(){u(n,"class","svelte-86pi94"),u(c,"href","http://trulioo.com"),u(w,"href","https://tse.ucsd.edu"),u(R,"href","https://fixnation.org"),u(t,"class","svelte-86pi94"),u(s,"class","box svelte-86pi94"),u(e,"class","child second svelte-86pi94")},m(j,F){U(j,e,F),r(e,s),r(s,n),X(l,n,null),r(s,a),r(s,t),r(t,i),r(t,c),r(c,d),r(t,v),r(t,f),r(f,_),r(t,k),r(t,E),r(E,I),r(t,D),r(t,M),r(t,C),r(t,y),r(t,V),r(t,A),r(A,m),r(t,$),r(t,w),r(w,H),r(t,P),r(t,R),r(R,N),r(t,J),Q=!0},p(j,F){const L={};F&8&&(L.play=j[3][1]),l.$set(L)},i(j){Q||(W(l.$$.fragment,j),Q=!0)},o(j){K(l.$$.fragment,j),Q=!1},d(j){j&&h(e),Y(l)}}}function et(o){let e,s,n,l,a,t,i,c;return l=new ue({props:{play:o[3][2],string:"Projects",delay:300}}),i=new Ye({props:{ready:o[1],projects:o[4]}}),{c(){e=p("div"),s=p("div"),n=p("h2"),O(l.$$.fragment),a=z(),t=p("p"),O(i.$$.fragment),this.h()},l(d){e=g(d,"DIV",{class:!0});var v=b(e);s=g(v,"DIV",{class:!0});var f=b(s);n=g(f,"H2",{class:!0});var _=b(n);x(l.$$.fragment,_),_.forEach(h),a=B(f),t=g(f,"P",{class:!0});var k=b(t);x(i.$$.fragment,k),k.forEach(h),f.forEach(h),v.forEach(h),this.h()},h(){u(n,"class","box svelte-86pi94"),u(t,"class","svelte-86pi94"),u(s,"class","projects svelte-86pi94"),u(e,"class","child third svelte-86pi94")},m(d,v){U(d,e,v),r(e,s),r(s,n),X(l,n,null),r(s,a),r(s,t),X(i,t,null),c=!0},p(d,v){const f={};v&8&&(f.play=d[3][2]),l.$set(f);const _={};v&2&&(_.ready=d[1]),i.$set(_)},i(d){c||(W(l.$$.fragment,d),W(i.$$.fragment,d),c=!0)},o(d){K(l.$$.fragment,d),K(i.$$.fragment,d),c=!1},d(d){d&&h(e),Y(l),Y(i)}}}function tt(o){let e,s,n,l,a,t,i,c,d,v,f,_,k,E,I,D,M,C,y,V,A,m,$,w,H,P,R,N,J,Q,j,F;return l=new ue({props:{play:o[3][3],string:"Resume & Contact",delay:300}}),{c(){e=p("div"),s=p("div"),n=p("h2"),O(l.$$.fragment),a=z(),t=p("p"),i=p("a"),c=ee("svg"),d=ee("path"),v=S(`
              Resume`),f=z(),_=p("br"),k=z(),E=p("a"),I=ee("svg"),D=ee("path"),M=S(`
              GitHub`),C=z(),y=p("br"),V=z(),A=p("a"),m=ee("svg"),$=ee("path"),w=S(`
              LinkedIn`),H=z(),P=p("br"),R=z(),N=p("span"),J=ee("svg"),Q=ee("path"),j=S(`
              alrussell (at) ucsd.edu`),this.h()},l(L){e=g(L,"DIV",{class:!0});var Z=b(e);s=g(Z,"DIV",{class:!0});var q=b(s);n=g(q,"H2",{class:!0});var fe=b(n);x(l.$$.fragment,fe),fe.forEach(h),a=B(q),t=g(q,"P",{class:!0});var G=b(t);i=g(G,"A",{class:!0,href:!0});var oe=b(i);c=te(oe,"svg",{xmlns:!0,"xmlns:xlink":!0,version:!0,viewBox:!0,class:!0});var he=b(c);d=te(he,"path",{d:!0}),b(d).forEach(h),he.forEach(h),v=T(oe,`
              Resume`),oe.forEach(h),f=B(G),_=g(G,"BR",{}),k=B(G),E=g(G,"A",{class:!0,href:!0});var ce=b(E);I=te(ce,"svg",{xmlns:!0,viewBox:!0,class:!0});var de=b(I);D=te(de,"path",{d:!0}),b(D).forEach(h),de.forEach(h),M=T(ce,`
              GitHub`),ce.forEach(h),C=B(G),y=g(G,"BR",{}),V=B(G),A=g(G,"A",{class:!0,href:!0});var pe=b(A);m=te(pe,"svg",{xmlns:!0,viewBox:!0,class:!0});var $e=b(m);$=te($e,"path",{d:!0}),b($).forEach(h),$e.forEach(h),w=T(pe,`
              LinkedIn`),pe.forEach(h),H=B(G),P=g(G,"BR",{}),R=B(G),N=g(G,"SPAN",{class:!0});var ge=b(N);J=te(ge,"svg",{xmlns:!0,viewBox:!0,class:!0});var ye=b(J);Q=te(ye,"path",{d:!0}),b(Q).forEach(h),ye.forEach(h),j=T(ge,`
              alrussell (at) ucsd.edu`),ge.forEach(h),G.forEach(h),q.forEach(h),Z.forEach(h),this.h()},h(){u(n,"class","svelte-86pi94"),u(d,"d","M64 0q-27 1 -45 19v0q-18 18 -19 45v384q1 27 19 45t45 19h256q27 -1 45 -19t19 -45v-288h-128q-14 0 -23 -9t-9 -23v-128h-160v0zM256 0v128h128l-128 -128v0zM256 256q-1 27 -19 45v0q-18 18 -45 19q-27 -1 -45 -19t-19 -45q1 -27 19 -45t45 -19q27 1 45 19t19 45v0z M80 432q1 -34 23 -57v0q23 -22 57 -23h64q34 1 57 23q22 23 23 57q-1 15 -16 16h-192q-15 -1 -16 -16v0z"),u(c,"xmlns","http://www.w3.org/2000/svg"),u(c,"xmlns:xlink","http://www.w3.org/1999/xlink"),u(c,"version","1.1"),u(c,"viewBox","-10 0 404 512"),u(c,"class","svelte-86pi94"),u(i,"class","contact svelte-86pi94"),u(i,"href",se+"/resume.pdf"),u(D,"d","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"),u(I,"xmlns","http://www.w3.org/2000/svg"),u(I,"viewBox","0 0 496 512"),u(I,"class","svelte-86pi94"),u(E,"class","contact svelte-86pi94"),u(E,"href","https://github.com/Cubified"),u($,"d","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"),u(m,"xmlns","http://www.w3.org/2000/svg"),u(m,"viewBox","0 0 448 512"),u(m,"class","svelte-86pi94"),u(A,"class","contact svelte-86pi94"),u(A,"href","https://linkedin.com/in/andrewlrussell"),u(Q,"d","M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"),u(J,"xmlns","http://www.w3.org/2000/svg"),u(J,"viewBox","0 0 512 512"),u(J,"class","svelte-86pi94"),u(N,"class","contact svelte-86pi94"),u(t,"class","svelte-86pi94"),u(s,"class","box svelte-86pi94"),u(e,"class","child fourth svelte-86pi94")},m(L,Z){U(L,e,Z),r(e,s),r(s,n),X(l,n,null),r(s,a),r(s,t),r(t,i),r(i,c),r(c,d),r(i,v),r(t,f),r(t,_),r(t,k),r(t,E),r(E,I),r(I,D),r(E,M),r(t,C),r(t,y),r(t,V),r(t,A),r(A,m),r(m,$),r(A,w),r(t,H),r(t,P),r(t,R),r(t,N),r(N,J),r(J,Q),r(N,j),F=!0},p(L,Z){const q={};Z&8&&(q.play=L[3][3]),l.$set(q)},i(L){F||(W(l.$$.fragment,L),F=!0)},o(L){K(l.$$.fragment,L),F=!1},d(L){L&&h(e),Y(l)}}}function st(o){let e=!1,s=()=>{e=!1},n,l,a,t,i,c,d,v,f,_,k,E,I,D,M,C,y,V,A;return Pe(o[6]),_=new ve({props:{callback:o[7],$$slots:{default:[Qe]},$$scope:{ctx:o}}}),E=new ve({props:{callback:o[8],$$slots:{default:[Ze]},$$scope:{ctx:o}}}),D=new ve({props:{callback:o[9],$$slots:{default:[et]},$$scope:{ctx:o}}}),C=new ve({props:{callback:o[10],$$slots:{default:[tt]},$$scope:{ctx:o}}}),{c(){l=p("div"),a=p("div"),t=z(),i=p("div"),c=z(),d=p("div"),v=z(),f=p("div"),O(_.$$.fragment),k=z(),O(E.$$.fragment),I=z(),O(D.$$.fragment),M=z(),O(C.$$.fragment),this.h()},l(m){l=g(m,"DIV",{class:!0});var $=b(l);a=g($,"DIV",{class:!0}),b(a).forEach(h),t=B($),i=g($,"DIV",{class:!0}),b(i).forEach(h),c=B($),d=g($,"DIV",{class:!0}),b(d).forEach(h),v=B($),f=g($,"DIV",{class:!0});var w=b(f);x(_.$$.fragment,w),k=B(w),x(E.$$.fragment,w),I=B(w),x(D.$$.fragment,w),M=B(w),x(C.$$.fragment,w),w.forEach(h),$.forEach(h),this.h()},h(){u(a,"class","bar first svelte-86pi94"),u(i,"class","bar second svelte-86pi94"),u(d,"class","bar third svelte-86pi94"),u(f,"class","content svelte-86pi94"),u(l,"class","bio svelte-86pi94")},m(m,$){U(m,l,$),r(l,a),r(l,t),r(l,i),r(l,c),r(l,d),r(l,v),r(l,f),X(_,f,null),r(f,k),X(E,f,null),r(f,I),X(D,f,null),r(f,M),X(C,f,null),o[11](f),y=!0,V||(A=Te(window,"scroll",()=>{e=!0,clearTimeout(n),n=Se(s,100),o[6]()}),V=!0)},p(m,[$]){$&4&&!e&&(e=!0,clearTimeout(n),scrollTo(window.pageXOffset,m[2]),n=Se(s,100));const w={};$&4104&&(w.$$scope={dirty:$,ctx:m}),_.$set(w);const H={};$&4104&&(H.$$scope={dirty:$,ctx:m}),E.$set(H);const P={};$&2&&(P.callback=m[9]),$&4106&&(P.$$scope={dirty:$,ctx:m}),D.$set(P);const R={};$&4104&&(R.$$scope={dirty:$,ctx:m}),C.$set(R)},i(m){y||(W(_.$$.fragment,m),W(E.$$.fragment,m),W(D.$$.fragment,m),W(C.$$.fragment,m),y=!0)},o(m){K(_.$$.fragment,m),K(E.$$.fragment,m),K(D.$$.fragment,m),K(C.$$.fragment,m),y=!1},d(m){m&&h(l),Y(_),Y(E),Y(D),Y(C),o[11](null),V=!1,A()}}}function nt(o,e,s){const n=[{name:"tuibox",img:"https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif",url:"https://github.com/Cubified/tuibox",langs:["C"],desc:"A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line."},{name:"mode7",img:`${se}/mode7.gif`,url:"https://github.com/Cubified/mode7",langs:["JavaScript"],desc:"A pure-Javascript perspective transform (a la SNES Mode 7)."},{name:"ntwm",img:"https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png",url:"https://github.com/Cubified/ntwm",langs:["C"],desc:"A tiny, frameless, keyboard-driven tiling window manager with multimonitor support."},{name:"lush",img:"https://github.com/Cubified/lush/raw/main/demo.gif",url:"https://github.com/Cubified/lush",langs:["x86 Assembly","C"],desc:"A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly."},{name:"Make-A-Wish Volunteer Hub",img:`${se}/maw.png`,url:"https://github.com/TritonSE/MAW-Volunteer-Hub",langs:["React.js","MongoDB"],desc:"A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering."},{name:"bdfedit",img:"https://github.com/Cubified/bdfedit/raw/main/demo.gif",url:"https://github.com/Cubified/bdfedit",langs:["C"],desc:"A terminal-based, mouse-driven BDF (bitmap) font editor."},{name:"term",img:"https://github.com/Cubified/term/raw/main/demo.gif",url:"https://github.com/Cubified/term",langs:["C"],desc:"A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support."},{name:"React Simple Scheduler",img:"https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png",url:"https://github.com/Cubified/react-simple-scheduler",langs:["TypeScript","React","SASS"],desc:"Simple, extensible scheduler and calendar components for React, modeled after Google Calendar."},{name:"Softbody",img:"https://github.com/Cubified/softbody/raw/main/demo.png",url:"https://github.com/Cubified/softbody",langs:["JavaScript"],desc:"A simple soft body physics simulation for n-sided polygons."}],l=async I=>{await je(),setTimeout(()=>{s(3,c[I]=!0,c),s(0,a.children[I].children[0].style.width="100vw",a),setTimeout(()=>{s(0,a.children[I].children[0].style.transition="none",a)},600)},I*100)};let a,t=!1,i=0,c=new Array(5).fill(!1);function d(){s(2,i=window.pageYOffset)}const v=()=>l(0),f=()=>l(1),_=()=>{l(2),s(1,t=!0)},k=()=>l(3);function E(I){ne[I?"unshift":"push"](()=>{a=I,s(0,a)})}return[a,t,i,c,n,l,d,v,f,_,k,E]}class lt extends re{constructor(e){super(),ae(this,e,nt,st,ie,{})}}function rt(o){let e,s,n,l,a,t,i,c,d;return{c(){e=p("div"),s=p("p"),n=S("Built from scratch with "),l=p("a"),a=S("SvelteKit"),t=S(" and "),i=p("a"),c=S("GitHub Pages"),d=S("."),this.h()},l(v){e=g(v,"DIV",{class:!0});var f=b(e);s=g(f,"P",{});var _=b(s);n=T(_,"Built from scratch with "),l=g(_,"A",{href:!0});var k=b(l);a=T(k,"SvelteKit"),k.forEach(h),t=T(_," and "),i=g(_,"A",{href:!0});var E=b(i);c=T(E,"GitHub Pages"),E.forEach(h),d=T(_,"."),_.forEach(h),f.forEach(h),this.h()},h(){u(l,"href","https://kit.svelte.dev"),u(i,"href","https://github.com/Cubified/cubified.github.io"),u(e,"class","footer svelte-4x6tdp")},m(v,f){U(v,e,f),r(e,s),r(s,n),r(s,l),r(l,a),r(s,t),r(s,i),r(i,c),r(s,d)},p:le,i:le,o:le,d(v){v&&h(e)}}}class at extends re{constructor(e){super(),ae(this,e,null,rt,ie,{})}}function it(o){let e,s,n,l,a,t,i,c,d,v,f,_,k,E,I,D,M,C;return k=new Ke({}),I=new lt({}),M=new at({}),{c(){e=p("link"),s=p("link"),n=p("link"),l=p("link"),a=p("meta"),t=p("meta"),i=p("meta"),c=z(),d=p("div"),v=p("div"),f=z(),_=p("div"),O(k.$$.fragment),E=z(),O(I.$$.fragment),D=z(),O(M.$$.fragment),this.h()},l(y){const V=Ne("svelte-10mr0pb",document.head);e=g(V,"LINK",{rel:!0,sizes:!0,href:!0}),s=g(V,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),n=g(V,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),l=g(V,"LINK",{rel:!0,href:!0}),a=g(V,"META",{charset:!0}),t=g(V,"META",{name:!0,content:!0}),i=g(V,"META",{name:!0,content:!0}),V.forEach(h),c=B(y),d=g(y,"DIV",{class:!0});var A=b(d);v=g(A,"DIV",{class:!0}),b(v).forEach(h),A.forEach(h),f=B(y),_=g(y,"DIV",{class:!0});var m=b(_);x(k.$$.fragment,m),E=B(m),x(I.$$.fragment,m),D=B(m),x(M.$$.fragment,m),m.forEach(h),this.h()},h(){u(e,"rel","apple-touch-icon"),u(e,"sizes","180x180"),u(e,"href",se+"/apple-touch-icon.png"),u(s,"rel","icon"),u(s,"type","image/png"),u(s,"sizes","32x32"),u(s,"href",se+"/favicon-32x32.png"),u(n,"rel","icon"),u(n,"type","image/png"),u(n,"sizes","16x16"),u(n,"href",se+"/favicon-16x16.png"),u(l,"rel","manifest"),u(l,"href",se+"/site.webmanifest"),u(a,"charset","utf-8"),u(t,"name","viewport"),u(t,"content","width=device-width, initial-scale=1"),u(i,"name","description"),u(i,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell",u(v,"class","splitter svelte-s2btq5"),Ie(v,"shown",o[1]),u(d,"class","parent svelte-s2btq5"),u(_,"class","above svelte-s2btq5")},m(y,V){r(document.head,e),r(document.head,s),r(document.head,n),r(document.head,l),r(document.head,a),r(document.head,t),r(document.head,i),U(y,c,V),U(y,d,V),r(d,v),o[2](v),U(y,f,V),U(y,_,V),X(k,_,null),r(_,E),X(I,_,null),r(_,D),X(M,_,null),C=!0},p(y,[V]){(!C||V&2)&&Ie(v,"shown",y[1])},i(y){C||(W(k.$$.fragment,y),W(I.$$.fragment,y),W(M.$$.fragment,y),C=!0)},o(y){K(k.$$.fragment,y),K(I.$$.fragment,y),K(M.$$.fragment,y),C=!1},d(y){h(e),h(s),h(n),h(l),h(a),h(t),h(i),y&&h(c),y&&h(d),o[2](null),y&&h(f),y&&h(_),Y(k),Y(I),Y(M)}}}function ot(o,e,s){let n,l=!1;me(()=>{s(0,n.style.transition="transform 1s",n),n.offsetHeight,s(1,l=!0)});function a(t){ne[t?"unshift":"push"](()=>{n=t,s(0,n)})}return[n,l,a]}class ft extends re{constructor(e){super(),ae(this,e,ot,it,ie,{})}}export{ft as default};
