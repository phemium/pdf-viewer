/*! Built with http://stenciljs.com */
((w,d,x,n,h,c,r)=>{((s)=>{s&&(r=s.getAttribute('data-resources-url'))})(d.querySelector("script[data-namespace='pdf-viewer']"));
function e(e,t){return"sc-"+e.t+(t&&t!==l?"-"+t:"")}function t(e,t){return e+(t?"-h":"-s")}function o(e,t){let n,o,l=null,s=!1,i=!1,r=arguments.length;for(;r-- >2;)k.push(arguments[r]);for(;k.length>0;){let t=k.pop();if(t&&void 0!==t.pop)for(r=t.length;r--;)k.push(t[r]);else"boolean"==typeof t&&(t=null),(i="function"!=typeof e)&&(null==t?t="":"number"==typeof t?t=String(t):"string"!=typeof t&&(i=!1)),i&&s?l[l.length-1].vtext+=t:null===l?l=[i?{vtext:t}:t]:l.push(i?{vtext:t}:t),s=i}if(null!=t){if(t.className&&(t.class=t.className),"object"==typeof t.class){for(r in t.class)t.class[r]&&k.push(r);t.class=k.join(" "),k.length=0}null!=t.key&&(n=t.key),null!=t.name&&(o=t.name)}return"function"==typeof e?e(t,l||[],j):{vtag:e,vchildren:l,vtext:void 0,vattrs:t,vkey:n,vname:o,o:void 0,l:!1}}const l="$",s={},i={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},a=(t,n,o,s)=>{let i=o.t+l,r=o[i];if((2===o.s||1===o.s&&!t.u.i)&&(s["s-sc"]=r?e(o,s.mode):e(o)),r){let e=n.p.head;if(n.i)if(1===o.s)e=s.shadowRoot;else{const t=s.getRootNode();t.host&&(e=t)}let l=t.m.get(e);if(l||t.m.set(e,l={}),!l[i]){let t;{t=r.content.cloneNode(!0),l[i]=!0;const o=e.querySelectorAll("[data-styles]");n.v(e,t,o.length&&o[o.length-1].nextSibling||e.firstChild)}}}},f=e=>null!=e,u=e=>e.toLowerCase(),p=()=>{},b=(e,t,n,o,l,s)=>{if("class"!==n||s)if("style"===n){for(const e in o)l&&null!=l[e]||(/-/.test(e)?t.style.removeProperty(e):t.style[e]="");for(const e in l)o&&l[e]===o[e]||(/-/.test(e)?t.style.setProperty(e,l[e]):t.style[e]=l[e])}else if("o"!==n[0]||"n"!==n[1]||!/[A-Z]/.test(n[2])||n in t)if("list"!==n&&"type"!==n&&!s&&(n in t||-1!==["object","function"].indexOf(typeof l)&&null!==l)){const o=e.M(t);o&&o.g&&o.g[n]?v(t,n,l):"ref"!==n&&(v(t,n,null==l?"":l),null!=l&&!1!==l||e.u.k(t,n))}else null!=l&&"key"!==n?((e,t,n,o="boolean"==typeof n,l)=>{l=t!==(t=t.replace(/^xlink\:?/,"")),null==n||o&&(!n||"false"===n)?l?e.removeAttributeNS("http://www.w3.org/1999/xlink",u(t)):e.removeAttribute(t):"function"!=typeof n&&(n=o?"":n.toString(),l?e.setAttributeNS("http://www.w3.org/1999/xlink",u(t),n):e.setAttribute(t,n))})(t,n,l):(s||e.u.j(t,n)&&(null==l||!1===l))&&e.u.k(t,n);else n=u(n)in t?u(n.substring(2)):u(n[2])+n.substring(3),l?l!==o&&e.u.C(t,n,l,0):e.u.W(t,n,0);else if(o!==l){const e=m(o),n=m(l),s=e.filter(e=>!n.includes(e)),i=m(t.className).filter(e=>!s.includes(e)),r=n.filter(t=>!e.includes(t)&&!i.includes(t));i.push(...r),t.className=i.join(" ")}},m=e=>null==e||""===e?[]:e.trim().split(/\s+/),v=(e,t,n)=>{try{e[t]=n}catch(e){}},y=(e,t,n,o,l)=>{const i=11===n.o.nodeType&&n.o.host?n.o.host:n.o,r=t&&t.vattrs||s,a=n.vattrs||s;for(l in r)a&&null!=a[l]||null==r[l]||b(e,i,l,r[l],void 0,o,n.l);for(l in a)l in r&&a[l]===("value"===l||"checked"===l?i[l]:r[l])||b(e,i,l,r[l],a[l],o,n.l)};let M=!1;const g=(e,t)=>{e&&(e.vattrs&&e.vattrs.ref&&e.vattrs.ref(t?null:e.o),e.vchildren&&e.vchildren.forEach(e=>{g(e,t)}))},$=(e,t)=>{{let n=0,o=!1;const l=()=>t.performance.now(),s=!1!==e.asyncQueue,i=Promise.resolve(),r=[],a=[],c=[],f=[],u=t=>n=>{t.push(n),o||(o=!0,e.raf(b))},p=e=>{for(let t=0;t<e.length;t++)try{e[t](l())}catch(e){console.error(e)}e.length=0},d=(e,t)=>{let n,o=0;for(;o<e.length&&(n=l())<t;)try{e[o++](n)}catch(e){console.error(e)}o===e.length?e.length=0:0!==o&&e.splice(0,o)},b=()=>{n++,p(a);const t=s?l()+7*Math.ceil(n*(1/22)):Infinity;d(c,t),d(f,t),c.length>0&&(f.push(...c),c.length=0),(o=a.length+c.length+f.length>0)?e.raf(b):n=0};return e.raf||(e.raf=t.requestAnimationFrame.bind(t)),{tick(e){r.push(e),1===r.length&&i.then(()=>p(r))},read:u(a),write:u(c)}}},k=[],j={forEach:(e,t)=>e.forEach(t),map:(e,t)=>e.map(t)},C=(e,t,n)=>{const[o,l,,s,i,r]=e,a={color:{N:"color"}};if(s)for(t=0;t<s.length;t++)a[(n=s[t])[0]]={O:n[1],S:!!n[2],N:"string"==typeof n[3]?n[3]:n[3]?n[0]:0,A:n[4]};return{t:o,T:l,g:Object.assign({},a),s:i,R:r?r.map(W):void 0}},W=e=>({L:e[0],D:e[1],q:!!e[2],B:!!e[3],I:!!e[4]}),N=(e,t)=>f(t)&&"object"!=typeof t&&"function"!=typeof t?e===Boolean||4===e?"false"!==t&&(""===t||!!t):e===Number||8===e?parseFloat(t):e===String||2===e?t.toString():t:t,O=(e,t,n)=>{e.P.add(t),e.F.has(t)||(e.F.set(t,!0),e.H?e.queue.write(()=>S(e,t,n)):e.queue.tick(()=>S(e,t,n)))},S=async(e,n,l,s,i,r)=>{if(e.F.delete(n),!e.U.has(n)){if(!(i=e.Z.get(n))){if((r=e.G.get(n))&&!r["s-rn"])return void(r["s-rc"]=r["s-rc"]||[]).push(()=>{S(e,n,l)});i=D(e,n,e.J.get(n),l)}((e,n,l,s)=>{try{const i=n.K.host,r=n.K.encapsulation,a="shadow"===r&&e.u.i;let c,f=l;if(a&&(f=l.shadowRoot),!l["s-rn"]){e.V(e,e.u,n,l);const o=l["s-sc"];o&&(e.u.X(l,t(o,!0)),"scoped"===r&&e.u.X(l,t(o)))}if(s.render||s.hostData||i||c){e.Y=!0;const t=s.render&&s.render();let n;e.Y=!1;const i=o(null,n,t),c=e._.get(l)||{};c.o=f,e._.set(l,e.render(l,c,i,a,r))}l["s-rn"]=!0,l["s-rc"]&&(l["s-rc"].forEach(e=>e()),l["s-rc"]=null)}catch(t){e.Y=!1,e.ee(t,8,l,!0)}})(e,e.M(n),n,i),n["s-init"]()}},E=(e,t,n,o,l,s,i,r,a)=>{if(t.type||t.state){const c=e.te.get(n);t.state||(!t.attr||void 0!==c[l]&&""!==c[l]||(r=s&&s.ne)&&f(a=r[t.attr])&&(c[l]=N(t.type,a)),n.hasOwnProperty(l)&&(void 0===c[l]&&(c[l]=N(t.type,n[l])),"mode"!==l&&delete n[l])),o.hasOwnProperty(l)&&void 0===c[l]&&(c[l]=o[l]),t.watchCallbacks&&(c[L+l]=t.watchCallbacks.slice()),R(o,l,function c(t){return(t=e.te.get(e.oe.get(this)))&&t[l]},function u(n,o){(o=e.oe.get(this))&&(t.state||t.mutable)&&A(e,o,l,n,i)})}else if(t.elementRef)T(o,l,n);else if(t.method)T(n,l,o[l].bind(o));else if(t.context){const s=e.le(t.context);void 0!==s&&T(o,l,s.getContext&&s.getContext(n)||s)}},A=(e,t,n,o,l,s,i)=>{(i=e.te.get(t))||e.te.set(t,i={});const r=i[n];if(o!==r&&(i[n]=o,s=e.Z.get(t))){{const e=i[L+n];if(e)for(let t=0;t<e.length;t++)try{s[e[t]].call(s,o,r,n)}catch(e){console.error(e)}}!e.Y&&t["s-rn"]&&O(e,t,l)}},T=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,value:n})},R=(e,t,n,o)=>{Object.defineProperty(e,t,{configurable:!0,get:n,set:o})},L="wc-",D=(e,t,n,o,l,s)=>{try{l=new(s=e.M(t).K),((e,t,n,o,l,s)=>{e.oe.set(o,n),e.te.has(n)||e.te.set(n,{}),Object.entries(Object.assign({color:{type:String}},t.properties,{mode:{type:String}})).forEach(([t,i])=>{E(e,i,n,o,t,l,s)})})(e,s,t,l,n,o),function i(e,t,n){if(t){const o=e.oe.get(n);t.forEach(t=>{n[t.method]={emit:n=>e.se(o,t.name,{bubbles:t.bubbles,composed:t.composed,cancelable:t.cancelable,detail:n})}})}}(e,s.events,l)}catch(n){l={},e.ee(n,7,t,!0)}return e.Z.set(t,l),l},q=(e,t,n,o,l,s)=>{if(e.P.delete(t),(l=e.G.get(t))&&((o=l["s-ld"])&&((n=o.indexOf(t))>-1&&o.splice(n,1),o.length||l["s-init"]&&l["s-init"]()),e.G.delete(t)),e.ie.length&&!e.P.size)for(;s=e.ie.shift();)s()},B=(e,t,n,o)=>{t.forEach(([t,l])=>{const s=l.O;3&s?R(n,t,function n(){return(e.te.get(this)||{})[t]},function n(s){A(e,this,t,N(l.A,s),o)}):32===s&&T(n,t,p)})},I=(e,t,n,o,l)=>{if(n.connectedCallback=function(){((e,t,n)=>{e.U.delete(n),e.re.has(n)||(e.ae=!0,e.P.add(n),e.re.set(n,!0),((e,t,n)=>{for(n=t;n=e.u.ce(n);)if(e.fe(n)){e.ue.has(t)||(e.G.set(t,n),(n["s-ld"]=n["s-ld"]||[]).push(t));break}})(e,n),e.queue.tick(()=>{e.J.set(n,((e,t,n,o,l)=>(n.mode||(n.mode=e.pe(n)),n["s-cr"]||e.de(n,"ssrv")||e.i&&1===t.s||(n["s-cr"]=e.be(""),n["s-cr"]["s-cn"]=!0,e.v(n,n["s-cr"],e.me(n)[0])),1===t.s&&e.i&&!n.shadowRoot&&e.ve(n,{mode:"open"}),o={ne:{}},t.g&&Object.keys(t.g).forEach(s=>{(l=t.g[s].N)&&(o.ne[l]=e.de(n,l))}),o))(e.u,t,n)),e.he(t,n)}))})(e,t,this)},n.disconnectedCallback=function(){((e,t)=>{!e.ye&&((e,t)=>{for(;t;){if(!e.we(t))return 9!==e.Me(t);t=e.we(t)}})(e.u,t)&&(e.U.set(t,!0),q(e,t),g(e._.get(t),!0),e.u.W(t),e.ge.delete(t),[e.G,e.$e,e.J].forEach(e=>e.delete(t)))})(e,this)},n["s-init"]=function(){((e,t,n,o,l,s,i)=>{if((l=e.Z.get(t))&&!e.U.has(t)&&(!t["s-ld"]||!t["s-ld"].length)){e.ue.set(t,!0),(i=e.ke.has(t))||(e.ke.set(t,!0),t["s-ld"]=void 0,e.u.X(t,n));try{g(e._.get(t)),(s=e.$e.get(t))&&(s.forEach(e=>e(t)),e.$e.delete(t)),!i&&l.componentDidLoad&&l.componentDidLoad()}catch(n){e.ee(n,4,t)}q(e,t)}})(e,this,o)},n.forceUpdate=function(){O(e,this,l)},t.g){const o=Object.entries(t.g);{let e={};o.forEach(([t,{N:n}])=>{n&&(e[n]=t)}),e=Object.assign({},e),n.attributeChangedCallback=function(t,n,o){(function l(e,t,n,o){const l=e[u(n)];l&&(t[l]=o)})(e,this,t,o)}}B(e,o,n,l)}};((e,t,n,s,r,c,p)=>{const d=n.performance,b={html:{}},m=n[e]=n[e]||{},v=((e,t,n)=>{const o=new WeakMap,l={p:n,i:!!n.documentElement.attachShadow,je:!1,Me:e=>e.nodeType,Ce:e=>n.createElement(e),We:(e,t)=>n.createElementNS(e,t),be:e=>n.createTextNode(e),Ne:e=>n.createComment(e),v:(e,t,n)=>e.insertBefore(t,n),Oe:e=>e.remove(),Se:(e,t)=>e.appendChild(t),X:(e,t)=>{e.classList.add(t)},me:e=>e.childNodes,we:e=>e.parentNode,xe:e=>e.nextSibling,Ee:e=>e.previousSibling,Ae:e=>u(e.nodeName),Te:e=>e.textContent,Re:(e,t)=>e.textContent=t,de:(e,t)=>e.getAttribute(t),Le:(e,t,n)=>e.setAttribute(t,n),k:(e,t)=>e.removeAttribute(t),j:(e,t)=>e.hasAttribute(t),pe:t=>t.getAttribute("mode")||(e.Context||{}).mode,De:(e,o)=>"child"===o?e.firstElementChild:"parent"===o?l.ce(e):"body"===o?n.body:"document"===o?n:"window"===o?t:e,C:(t,n,s,r,a,c,f,u,p,d)=>{let b=t,m=s,v=o.get(t);d=n+r,v&&v[d]&&v[d](),"string"==typeof f?b=l.De(t,f):"object"==typeof f?b=f:(p=n.split(":")).length>1&&(b=l.De(t,p[0]),n=p[1]),b&&((p=n.split(".")).length>1&&(n=p[0],m=(e=>{e.keyCode===i[p[1]]&&s(e)})),u=l.je?{capture:!!a,passive:!!c}:!!a,e.ael(b,n,m,u),v||o.set(t,v={}),v[d]=(()=>{b&&e.rel(b,n,m,u),v[d]=null}))},W:(e,t,n,l)=>{(l=o.get(e))&&(t?l[t+n]&&l[t+n]():Object.keys(l).forEach(e=>{l[e]&&l[e]()}))},qe:(e,n,o,l)=>(l=new t.CustomEvent(n,o),e&&e.dispatchEvent(l),l),ce:(e,t)=>(t=l.we(e))&&11===l.Me(t)?t.host:t,Be:(e,t,n,o)=>e.setAttributeNS(t,n,o),ve:(e,t)=>e.attachShadow(t)};e.ael||(e.ael=((e,t,n,o)=>e.addEventListener(t,n,o)),e.rel=((e,t,n,o)=>e.removeEventListener(t,n,o)));try{t.addEventListener("e",null,Object.defineProperty({},"passive",{get:()=>l.je=!0}))}catch(e){}return l})(m,n,s),h=v.p.documentElement,w=n["s-defined"]=n["s-defined"]||{},g=(e,t)=>{n.customElements.get(e.t)||(I(k,b[e.t]=e,t.prototype,c,d),t.observedAttributes=Object.values(e.g).map(e=>e.N).filter(e=>!!e),n.customElements.define(e.t,t))},k={u:v,Ie:g,M:e=>b[v.Ae(e)],le:e=>t[e],isClient:!0,fe:e=>!(!w[v.Ae(e)]&&!k.M(e)),ee:(e,t,n)=>console.error(e,t,n&&n.tagName),queue:t.queue=$(m,n),he:(e,t)=>{{const n=e.T,o=!v.i;let s=r+n+(o?".sc":"")+".entry.js";import(s).then(n=>{try{e.K=n[(e=>u(e).split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(""))(e.t)],function o(e,t,n,s,i){if(s){const n=t.t+(i||l);if(!t[n]){const o=e.Ce("template");t[n]=o,o.innerHTML=`<style>${s}</style>`,e.Se(e.p.head,o)}}}(v,e,e.s,e.K.style,e.K.styleMode),O(k,t,d)}catch(t){console.error(t),e.K=class{}}},e=>console.error(e,s))}},Y:!1,H:!1,ye:!1,V:a,G:new WeakMap,m:new WeakMap,re:new WeakMap,ge:new WeakMap,ke:new WeakMap,ue:new WeakMap,oe:new WeakMap,J:new WeakMap,Z:new WeakMap,U:new WeakMap,F:new WeakMap,$e:new WeakMap,Pe:new WeakMap,_:new WeakMap,te:new WeakMap,P:new Set,ie:[]};return t.isServer=t.isPrerender=!(t.isClient=!0),t.window=n,t.location=n.location,t.document=s,t.resourcesUrl=t.publicPath=r,k.se=t.emit=((e,n,o)=>v.qe(e,t.eventNameFn?t.eventNameFn(n):n,o)),m.h=o,m.Context=t,m.onReady=(()=>new Promise(e=>k.queue.write(()=>k.P.size?k.ie.push(e):e()))),k.render=((e,t)=>{let n,o,l,s,i,r,a;const c=(l,p,d,b,m,v,h,w,g)=>{if(w=p.vchildren[d],n||(s=!0,"slot"===w.vtag&&(o&&t.X(b,o+"-s"),w.vchildren?w.Fe=!0:w.He=!0)),f(w.vtext))w.o=t.be(w.vtext);else if(w.He)w.o=t.be("");else{if(v=w.o=M||"svg"===w.vtag?t.We("http://www.w3.org/2000/svg",w.vtag):t.Ce(w.Fe?"slot-fb":w.vtag),e.fe(v)&&e.ue.delete(a),M="svg"===w.vtag||"foreignObject"!==w.vtag&&M,y(e,null,w,M),f(o)&&v["s-si"]!==o&&t.X(v,v["s-si"]=o),w.vchildren)for(m=0;m<w.vchildren.length;++m)(h=c(l,w,m,v))&&t.Se(v,h);"svg"===w.vtag&&(M=!1)}return w.o["s-hn"]=r,(w.Fe||w.He)&&(w.o["s-sr"]=!0,w.o["s-cr"]=i,w.o["s-sn"]=w.vname||"",(g=l&&l.vchildren&&l.vchildren[d])&&g.vtag===w.vtag&&l.o&&u(l.o)),w.o},u=(n,o,l,i)=>{e.ye=!0;const a=t.me(n);for(l=a.length-1;l>=0;l--)(i=a[l])["s-hn"]!==r&&i["s-ol"]&&(t.Oe(i),t.v(v(i),i,m(i)),t.Oe(i["s-ol"]),i["s-ol"]=null,s=!0),o&&u(i,o);e.ye=!1},p=(e,n,o,l,s,i,a,u)=>{const p=e["s-cr"];for((a=p&&t.we(p)||e).shadowRoot&&t.Ae(a)===r&&(a=a.shadowRoot);s<=i;++s)l[s]&&(u=f(l[s].vtext)?t.be(l[s].vtext):c(null,o,s,e))&&(l[s].o=u,t.v(a,u,m(n)))},d=(e,n,o,s)=>{for(;n<=o;++n)f(e[n])&&(s=e[n].o,l=!0,s["s-ol"]?t.Oe(s["s-ol"]):u(s,!0),t.Oe(s))},b=(e,t)=>e.vtag===t.vtag&&e.vkey===t.vkey&&("slot"!==e.vtag||e.vname===t.vname),m=e=>e&&e["s-ol"]?e["s-ol"]:e,v=e=>t.we(e["s-ol"]?e["s-ol"]:e),h=(n,o,l)=>{const s=o.o=n.o,i=n.vchildren,r=o.vchildren;M=o.o&&f(t.ce(o.o))&&void 0!==o.o.ownerSVGElement,M="svg"===o.vtag||"foreignObject"!==o.vtag&&M,f(o.vtext)?(l=s["s-cr"])?t.Re(t.we(l),o.vtext):n.vtext!==o.vtext&&t.Re(s,o.vtext):("slot"!==o.vtag&&y(e,n,o,M),f(i)&&f(r)?((e,n,o,l,s,i,r,a)=>{let y=0,w=0,M=n.length-1,g=n[0],$=n[M],k=l.length-1,j=l[0],C=l[k];for(;y<=M&&w<=k;)if(null==g)g=n[++y];else if(null==$)$=n[--M];else if(null==j)j=l[++w];else if(null==C)C=l[--k];else if(b(g,j))h(g,j),g=n[++y],j=l[++w];else if(b($,C))h($,C),$=n[--M],C=l[--k];else if(b(g,C))"slot"!==g.vtag&&"slot"!==C.vtag||u(t.we(g.o)),h(g,C),t.v(e,g.o,t.xe($.o)),g=n[++y],C=l[--k];else if(b($,j))"slot"!==g.vtag&&"slot"!==C.vtag||u(t.we($.o)),h($,j),t.v(e,$.o,g.o),$=n[--M],j=l[++w];else{for(s=null,i=y;i<=M;++i)if(n[i]&&f(n[i].vkey)&&n[i].vkey===j.vkey){s=i;break}f(s)?((a=n[s]).vtag!==j.vtag?r=c(n&&n[w],o,s,e):(h(a,j),n[s]=void 0,r=a.o),j=l[++w]):(r=c(n&&n[w],o,w,e),j=l[++w]),r&&t.v(v(g.o),r,m(g.o))}y>M?p(e,null==l[k+1]?null:l[k+1].o,o,l,w,k):w>k&&d(n,y,M)})(s,i,o,r):f(r)?(f(n.vtext)&&t.Re(s,""),p(s,null,o,r,0,r.length-1)):f(i)&&d(i,0,i.length-1)),M&&"svg"===o.vtag&&(M=!1)},w=(e,n,o,l,s,i,r,a)=>{for(l=0,s=(o=t.me(e)).length;l<s;l++)if(n=o[l],1===t.Me(n)){if(n["s-sr"])for(r=n["s-sn"],n.hidden=!1,i=0;i<s;i++)if(o[i]["s-hn"]!==n["s-hn"])if(a=t.Me(o[i]),""!==r){if(1===a&&r===t.de(o[i],"slot")){n.hidden=!0;break}}else if(1===a||3===a&&""!==t.Te(o[i]).trim()){n.hidden=!0;break}w(n)}},g=[],$=(e,n,o,s,i,r,a,c,f,u)=>{for(i=0,r=(n=t.me(e)).length;i<r;i++){if((o=n[i])["s-sr"]&&(s=o["s-cr"]))for(c=t.me(t.we(s)),f=o["s-sn"],a=c.length-1;a>=0;a--)(s=c[a])["s-cn"]||s["s-nr"]||s["s-hn"]===o["s-hn"]||((3===(u=t.Me(s))||8===u)&&""===f||1===u&&null===t.de(s,"slot")&&""===f||1===u&&t.de(s,"slot")===f)&&(g.some(e=>e.Qe===s)||(l=!0,s["s-sn"]=f,g.push({Ue:o,Qe:s})));1===t.Me(o)&&$(o)}};return(c,f,u,p,d,b,m,v,y,M,k,j)=>{if(a=c,r=t.Ae(a),i=a["s-cr"],n=p,o=a["s-sc"],s=l=!1,h(f,u),s){for($(u.o),m=0;m<g.length;m++)(v=g[m]).Qe["s-ol"]||((y=t.be(""))["s-nr"]=v.Qe,t.v(t.we(v.Qe),v.Qe["s-ol"]=y,v.Qe));for(e.ye=!0,m=0;m<g.length;m++){for(v=g[m],k=t.we(v.Ue),j=t.xe(v.Ue),y=v.Qe["s-ol"];y=t.Ee(y);)if((M=y["s-nr"])&&M&&M["s-sn"]===v.Qe["s-sn"]&&k===t.we(M)&&(M=t.xe(M))&&M&&!M["s-nr"]){j=M;break}(!j&&k!==t.we(v.Qe)||t.xe(v.Qe)!==j)&&v.Qe!==j&&(t.Oe(v.Qe),t.v(k,v.Qe,j))}e.ye=!1}return l&&w(u.o),g.length=0,u}})(k,v),h["s-ld"]=[],h["s-rn"]=!0,h["s-init"]=(()=>{k.ue.set(h,m.loaded=k.H=!0),v.qe(n,"appload",{detail:{namespace:e}})}),p.map(C).forEach(e=>g(e,class extends HTMLElement{})),k.ae||h["s-init"](),((e,t,n,o,l,s)=>{if(t.componentOnReady=((t,n)=>{if(!t.nodeName.includes("-"))return n(null),!1;const o=e.M(t);if(o)if(e.ue.has(t))n(t);else{const o=e.$e.get(t)||[];o.push(n),e.$e.set(t,o)}return!!o}),l){for(s=l.length-1;s>=0;s--)t.componentOnReady(l[s][0],l[s][1])&&l.splice(s,1);for(s=0;s<o.length;s++)if(!n[o[s]].componentOnReady)return;for(s=0;s<l.length;s++)l[s][1](null);l.length=0}})(k,m,n,n["s-apps"],n["s-cr"]),m.initialized=!0,k})(n,x,w,d,r,h,c);
})(window,document,{},"PdfViewer","hydrated",[["phemium-pdf-viewer","hrtthgvl",1,[["element",64],["enableSearch",1,0,"enable-search",4],["enableSideDrawer",1,0,"enable-side-drawer",4],["enableToolbar",1,0,"enable-toolbar",4],["iframeLoaded",16],["page",1,0,1,8],["print",32],["resourcesUrl",4,0,0,0,"resourcesUrl"],["scale",1,0,1,1],["setScale",32],["src",1,0,1,2],["window",4,0,0,0,"window"]],1]]);