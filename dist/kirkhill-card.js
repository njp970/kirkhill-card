var O=globalThis,I=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),nt=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(I&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}},ot=r=>new P(typeof r=="string"?r:r+"",void 0,j),W=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new P(e,r,j)},at=(r,t)=>{if(I)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=O.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},F=I?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ot(e)})(r):r;var{is:Ct,defineProperty:Mt,getOwnPropertyDescriptor:Pt,getOwnPropertyNames:kt,getOwnPropertySymbols:Tt,getPrototypeOf:Rt}=Object,L=globalThis,lt=L.trustedTypes,Ht=lt?lt.emptyScript:"",Nt=L.reactiveElementPolyfillSupport,k=(r,t)=>r,K={toAttribute(r,t){switch(t){case Boolean:r=r?Ht:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ct=(r,t)=>!Ct(r,t),ht={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Mt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Pt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let h=i?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let t=Rt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let e=this.properties,s=[...kt(e),...Tt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(F(i))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:K).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:K;this._$Em=i;let h=o.fromAttribute(e,n.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??ct)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,n,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[k("elementProperties")]=new Map,g[k("finalized")]=new Map,Nt?.({ReactiveElement:g}),(L.reactiveElementVersions??=[]).push("2.1.2");var Q=globalThis,dt=r=>r,z=Q.trustedTypes,pt=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,gt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,bt="?"+b,Ut=`<${bt}>`,x=document,R=()=>x.createComment(""),H=r=>r===null||typeof r!="object"&&typeof r!="function",X=Array.isArray,Ot=r=>X(r)||typeof r?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,mt=/>/g,y=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,_t=/"/g,vt=/^(?:script|style|textarea|title)$/i,tt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),m=tt(1),D=tt(2),qt=tt(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),$t=new WeakMap,A=x.createTreeWalker(x,129);function yt(r,t){if(!X(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var It=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=T;for(let h=0;h<e;h++){let a=r[h],l,p,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,p=o.exec(a),p!==null);)f=o.lastIndex,o===T?p[1]==="!--"?o=ut:p[1]!==void 0?o=mt:p[2]!==void 0?(vt.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=y):p[3]!==void 0&&(o=y):o===y?p[0]===">"?(o=i??T,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,l=p[1],o=p[3]===void 0?y:p[3]==='"'?_t:ft):o===_t||o===ft?o=y:o===ut||o===mt?o=T:(o=y,i=void 0);let u=o===y&&r[h+1].startsWith("/>")?" ":"";n+=o===T?a+Ut:c>=0?(s.push(l),a.slice(0,c)+gt+a.slice(c)+b+u):a+b+(c===-2?h:u)}return[yt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},N=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[l,p]=It(t,e);if(this.el=r.createElement(l,s),A.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(gt)){let f=p[o++],u=i.getAttribute(c).split(b),_=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:_[2],strings:u,ctor:_[1]==="."?J:_[1]==="?"?Z:_[1]==="@"?G:M}),i.removeAttribute(c)}else c.startsWith(b)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(vt.test(i.tagName)){let c=i.textContent.split(b),f=c.length-1;if(f>0){i.textContent=z?z.emptyScript:"";for(let u=0;u<f;u++)i.append(c[u],R()),A.nextNode(),a.push({type:2,index:++n});i.append(c[f],R())}}}else if(i.nodeType===8)if(i.data===bt)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(b,c+1))!==-1;)a.push({type:7,index:n}),c+=b.length-1}n++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function C(r,t,e=r,s){if(t===S)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=H(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}var q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??x).importNode(e,!0);A.currentNode=i;let n=A.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new U(n,n.nextSibling,this,t):a.type===1?l=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(l=new Y(n,this,t)),this._$AV.push(l),a=s[++h]}o!==a?.index&&(n=A.nextNode(),o++)}return A.currentNode=x,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},U=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),H(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ot(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(yt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new q(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new N(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(R()),this.O(R()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=dt(t).nextSibling;dt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=C(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let h=t,a,l;for(t=n[0],a=0;a<n.length-1;a++)l=C(this,h[s+a],e,a),l===S&&(l=this._$AH[a]),o||=!H(l)||l!==this._$AH[a],l===d?t=d:t!==d&&(t+=(l??"")+n[a+1]),this._$AH[a]=l}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Z=class extends M{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},G=class extends M{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??d)===S)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var Lt=Q.litHtmlPolyfillSupport;Lt?.(N,U),(Q.litHtmlVersions??=[]).push("3.3.3");var At=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new U(t.insertBefore(R(),n),n,void 0,e??{})}return i._$AI(r),i};var et=globalThis,v=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=At(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};v._$litElement$=!0,v.finalized=!0,et.litElementHydrateSupport?.({LitElement:v});var zt=et.litElementPolyfillSupport;zt?.({LitElement:v});(et.litElementVersions??=[]).push("4.2.2");var Dt=["J","F","M","A","M","J","J","A","S","O","N","D"],E=360,w=300,xt=52,$=256,Bt=(r,t,e)=>`https://a.basemaps.cartocdn.com/dark_all/${r}/${t}/${e}.png`;function st(r,t){return(r+180)/360*Math.pow(2,t)*$}function it(r,t){let e=Math.sin(r*Math.PI/180);return(.5-Math.log((1+e)/(1-e))/(4*Math.PI))*Math.pow(2,t)*$}var St=new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"});function B(r,t=1,e=""){return r===null||Number.isNaN(r)?"\u2014":`${r.toFixed(t)}${e}`}function jt(r){return r===null||r<=0?null:Math.max(.4,20/r)}function Et(r){return r==="on"?"var(--kh-running, #2e7d32)":r==="off"?"var(--kh-stopped, #9e9e9e)":"var(--kh-unknown, #f9a825)"}var rt=class extends v{constructor(){super(...arguments);this._mapClipId=`khmap-${Math.random().toString(36).slice(2,9)}`}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=W`
    ha-card {
      padding: 16px;
    }
    .title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .panels {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      gap: 16px;
    }
    .panels.single {
      grid-template-columns: 1fr;
    }
    @media (max-width: 600px) {
      .panels {
        grid-template-columns: 1fr;
      }
    }
    .panel-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    svg.map {
      width: 100%;
      height: auto;
      background: var(--kh-map-bg, #0b0c0e);
      border-radius: 10px;
    }
    svg.map image {
      image-rendering: auto;
    }
    .turbine-label {
      font-size: 9px;
      font-weight: 600;
      fill: #fff;
      stroke: rgba(0, 0, 0, 0.85);
      stroke-width: 0.5px;
      paint-order: stroke;
      text-anchor: middle;
    }
    .map-attr {
      font-size: 7px;
      fill: rgba(255, 255, 255, 0.55);
      text-anchor: end;
    }
    .rotor {
      transform-box: fill-box;
      transform-origin: center;
      animation-name: kh-spin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    .rotor.stopped {
      animation: none;
    }
    @keyframes kh-spin {
      to {
        transform: rotate(360deg);
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }
    th,
    td {
      text-align: right;
      padding: 4px 6px;
      border-bottom: 1px solid var(--divider-color);
    }
    th:first-child,
    td:first-child {
      text-align: left;
    }
    th {
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
      vertical-align: middle;
    }
    .revenue {
      margin-top: 16px;
      border-top: 1px solid var(--divider-color);
      padding-top: 12px;
    }
    .revenue-headline {
      font-size: 1.6rem;
      font-weight: 600;
    }
    .revenue-sub {
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      margin-bottom: 10px;
    }
    .bars {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      align-items: end;
      gap: 4px;
      height: 90px;
    }
    .bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
    }
    .bar {
      width: 100%;
      background: var(--kh-bar, var(--primary-color));
      border-radius: 2px 2px 0 0;
      min-height: 1px;
    }
    .bar-label {
      font-size: 0.65rem;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }
  `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 8}static getStubConfig(){return{title:"Kirk Hill Wind Farm"}}shouldUpdate(e){return e.has("hass")||e.has("_config")}get _turbinePrefix(){return this._config?.turbine_prefix??"turbine"}get _sitePrefix(){return this._config?.site_prefix??"kirk_hill_wind_farm"}_entity(e){return this.hass?.states?.[e]}_number(e){let s=this._entity(e);if(!s)return null;let i=parseFloat(s.state);return Number.isNaN(i)?null:i}_turbines(){let e=this._turbinePrefix,s=[];for(let i=1;i<=8;i++){let n=this._entity(`binary_sensor.${e}_t${i}_running`);if(!n)continue;let o=n.attributes??{};s.push({id:`T${i}`,running:n.state,lat:o.latitude??null,lon:o.longitude??null,rpm:o.rotor_speed_rpm??null,latestInterval:o.latest_generation_interval_end??null,generation:this._number(`sensor.${e}_t${i}_generation`),share:this._number(`sensor.${e}_t${i}_generation_share`),capacityFactor:this._number(`sensor.${e}_t${i}_capacity_factor`)})}return s}_chooseZoom(e){for(let s=17;s>=8;s--){let i=e.map(a=>st(a.lon,s)),n=e.map(a=>it(a.lat,s)),o=Math.max(...i)-Math.min(...i),h=Math.max(...n)-Math.min(...n);if(o<=E-2*xt&&h<=w-2*xt)return s}return 8}_renderTurbineMarker(e,s,i){let n=Et(e.running),o=jt(e.rpm),h=o===null,a=[0,120,240].map(l=>D`<ellipse cx="0" cy="-8" rx="2.1" ry="8" transform="rotate(${l})" fill="${n}" />`);return D`
      <g transform="translate(${s}, ${i})">
        <title>${e.id} — ${e.running} — ${B(e.rpm,1," rpm")}</title>
        <circle r="11" fill="rgba(20,22,26,0.62)" stroke="${n}" stroke-width="2" />
        <g class="rotor ${h?"stopped":""}" style="${h?"":`animation-duration:${o}s`}">
          ${a}
          <circle r="2.4" fill="${n}" />
        </g>
        <text class="turbine-label" y="23">${e.id}</text>
      </g>
    `}_renderMap(e){let s=e.filter(u=>u.lat!==null&&u.lon!==null);if(s.length===0)return m`<div class="empty">No turbine coordinates available.</div>`;let i=this._chooseZoom(s),n=s.map(u=>st(u.lon,i)),o=s.map(u=>it(u.lat,i)),h=(Math.min(...n)+Math.max(...n))/2,a=(Math.min(...o)+Math.max(...o))/2,l=h-E/2,p=a-w/2,c=Math.pow(2,i),f=[];for(let u=Math.floor(l/$);u<=Math.floor((l+E)/$);u++)for(let _=Math.floor(p/$);_<=Math.floor((p+w)/$);_++){if(_<0||_>=c)continue;let wt=(u%c+c)%c;f.push(D`<image href="${Bt(i,wt,_)}" x="${u*$-l}" y="${_*$-p}" width="${$}" height="${$}" />`)}return m`
      <svg class="map" viewBox="0 0 ${E} ${w}" role="img" aria-label="Turbine map">
        <defs>
          <clipPath id="${this._mapClipId}">
            <rect x="0" y="0" width="${E}" height="${w}" rx="10" />
          </clipPath>
        </defs>
        <g clip-path="url(#${this._mapClipId})">
          ${f}
          ${s.map(u=>this._renderTurbineMarker(u,st(u.lon,i)-l,it(u.lat,i)-p))}
          <text class="map-attr" x="${E-5}" y="${w-6}">© OpenStreetMap © CARTO</text>
        </g>
        <rect x="0.5" y="0.5" width="${E-1}" height="${w-1}" rx="10" fill="none" stroke="var(--divider-color)" />
      </svg>
    `}_renderTable(e){return m`
      <table>
        <thead>
          <tr>
            <th>Turbine</th>
            <th>Gen (kWh)</th>
            <th>Share</th>
            <th>Cap. factor</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(s=>m`
              <tr>
                <td>
                  <span class="dot" style="background:${Et(s.running)}"></span>${s.id}
                </td>
                <td>${B(s.generation,2)}</td>
                <td>${B(s.share,1,"%")}</td>
                <td>${B(s.capacityFactor,1,"%")}</td>
              </tr>
            `)}
        </tbody>
      </table>
    `}_renderRevenue(){let e=this._entity(`sensor.${this._sitePrefix}_revenue_month_to_date`),s=this._entity(`sensor.${this._sitePrefix}_revenue_year_to_date`);if(!e&&!s)return d;let i=this._number(`sensor.${this._sitePrefix}_revenue_month_to_date`),n=s?.attributes?.monthly??[],o=i===null?"\u2014":St.format(i);if(!(i!==null||n.length>0))return m`
        <div class="revenue">
          <div class="panel-label">Revenue</div>
          <div class="empty">Set a £/MWh price in the integration options to see revenue.</div>
        </div>
      `;let a=n.reduce((l,p)=>Math.max(l,p.revenue_gbp),0)||1;return m`
      <div class="revenue">
        <div class="panel-label">Revenue — month to date</div>
        <div class="revenue-headline">${o}</div>
        <div class="revenue-sub">Year-to-date by month</div>
        <div class="bars">
          ${n.map(l=>m`
              <div class="bar-col" title="${St.format(l.revenue_gbp)}">
                <div
                  class="bar"
                  style="height:${Math.round(l.revenue_gbp/a*100)}%"
                ></div>
                <div class="bar-label">${Dt[l.month-1]??""}</div>
              </div>
            `)}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return m`${d}`;let e=this._turbines(),s=this._config.title??"Kirk Hill Wind Farm";if(e.length===0)return m`
        <ha-card>
          <div class="title">${s}</div>
          <div class="empty">
            No turbine entities found. Expected
            <code>binary_sensor.${this._turbinePrefix}_t1_running</code> … Is the Kirk Hill
            integration set up?
          </div>
        </ha-card>
      `;let i=this._config.panels??["map","table","revenue"],n=i.includes("map"),o=i.includes("table"),h=i.includes("revenue"),a=n?m`<div>
          <div class="panel-label">Turbines</div>
          ${this._renderMap(e)}
        </div>`:d,l=o?m`<div>
          <div class="panel-label">Status</div>
          ${this._renderTable(e)}
        </div>`:d,p=n&&o?"panels":"panels single";return m`
      <ha-card>
        ${this._config.title===""?d:m`<div class="title">${s}</div>`}
        ${n||o?m`<div class="${p}">${a}${l}</div>`:d}
        ${h?this._renderRevenue():d}
      </ha-card>
    `}};customElements.define("kirkhill-card",rt);window.customCards=window.customCards??[];window.customCards.push({type:"kirkhill-card",name:"Kirk Hill Wind Farm Card",description:"Turbine map, status table and revenue chart for the Kirk Hill integration.",preview:!0,documentationURL:"https://github.com/njp970/kirkhill-card"});console.info("%c kirkhill-card %c 0.2.0 ","background:#2e7d32;color:#fff","");export{rt as KirkhillCard};
