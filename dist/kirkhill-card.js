var H=globalThis,N=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),et=new WeakMap,w=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(N&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&et.set(e,t))}return t}toString(){return this.cssText}},st=r=>new w(typeof r=="string"?r:r+"",void 0,D),I=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new w(e,r,D)},it=(r,t)=>{if(N)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=H.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},j=N?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return st(e)})(r):r;var{is:xt,defineProperty:St,getOwnPropertyDescriptor:Et,getOwnPropertyNames:wt,getOwnPropertySymbols:Ct,getPrototypeOf:Pt}=Object,U=globalThis,rt=U.trustedTypes,kt=rt?rt.emptyScript:"",Tt=U.reactiveElementPolyfillSupport,C=(r,t)=>r,B={toAttribute(r,t){switch(t){case Boolean:r=r?kt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ot=(r,t)=>!xt(r,t),nt={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:ot};Symbol.metadata??=Symbol("metadata"),U.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&St(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Et(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??nt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...wt(e),...Ct(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:B).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:B;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??ot)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[C("elementProperties")]=new Map,_[C("finalized")]=new Map,Tt?.({ReactiveElement:_}),(U.reactiveElementVersions??=[]).push("2.1.2");var G=globalThis,at=r=>r,O=G.trustedTypes,lt=O?O.createPolicy("lit-html",{createHTML:r=>r}):void 0,mt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+$,Mt=`<${ft}>`,y=document,k=()=>y.createComment(""),T=r=>r===null||typeof r!="object"&&typeof r!="function",Y=Array.isArray,Rt=r=>Y(r)||typeof r?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,ct=/>/g,v=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,pt=/"/g,_t=/^(?:script|style|textarea|title)$/i,Z=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),m=Z(1),Q=Z(2),Bt=Z(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ut=new WeakMap,b=y.createTreeWalker(y,129);function $t(r,t){if(!Y(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return lt!==void 0?lt.createHTML(t):t}var Ht=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=P;for(let l=0;l<e;l++){let a=r[l],c,u,h=-1,p=0;for(;p<a.length&&(o.lastIndex=p,u=o.exec(a),u!==null);)p=o.lastIndex,o===P?u[1]==="!--"?o=ht:u[1]!==void 0?o=ct:u[2]!==void 0?(_t.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=v):u[3]!==void 0&&(o=v):o===v?u[0]===">"?(o=i??P,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?v:u[3]==='"'?pt:dt):o===pt||o===dt?o=v:o===ht||o===ct?o=P:(o=v,i=void 0);let f=o===v&&r[l+1].startsWith("/>")?" ":"";n+=o===P?a+Mt:h>=0?(s.push(c),a.slice(0,h)+mt+a.slice(h)+$+f):a+$+(h===-2?l:f)}return[$t(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},M=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[c,u]=Ht(t,e);if(this.el=r.createElement(c,s),b.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=b.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(mt)){let p=u[o++],f=i.getAttribute(h).split($),x=/([.?@])?(.*)/.exec(p);a.push({type:1,index:n,name:x[2],strings:f,ctor:x[1]==="."?F:x[1]==="?"?K:x[1]==="@"?q:E}),i.removeAttribute(h)}else h.startsWith($)&&(a.push({type:6,index:n}),i.removeAttribute(h));if(_t.test(i.tagName)){let h=i.textContent.split($),p=h.length-1;if(p>0){i.textContent=O?O.emptyScript:"";for(let f=0;f<p;f++)i.append(h[f],k()),b.nextNode(),a.push({type:2,index:++n});i.append(h[p],k())}}}else if(i.nodeType===8)if(i.data===ft)a.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf($,h+1))!==-1;)a.push({type:7,index:n}),h+=$.length-1}n++}}static createElement(t,e){let s=y.createElement("template");return s.innerHTML=t,s}};function S(r,t,e=r,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=T(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=S(r,i._$AS(r,t.values),i,s)),t}var V=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??y).importNode(e,!0);b.currentNode=i;let n=b.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new R(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new J(n,this,t)),this._$AV.push(c),a=s[++l]}o!==a?.index&&(n=b.nextNode(),o++)}return b.currentNode=y,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},R=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),T(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Rt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement($t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new V(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new M(t)),e}k(t){Y(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(k()),this.O(k()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=at(t).nextSibling;at(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=S(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let l=t,a,c;for(t=n[0],a=0;a<n.length-1;a++)c=S(this,l[s+a],e,a),c===A&&(c=this._$AH[a]),o||=!T(c)||c!==this._$AH[a],c===d?t=d:t!==d&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},F=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},K=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},q=class extends E{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??d)===A)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},J=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Nt=G.litHtmlPolyfillSupport;Nt?.(M,R),(G.litHtmlVersions??=[]).push("3.3.3");var gt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new R(t.insertBefore(k(),n),n,void 0,e??{})}return i._$AI(r),i};var X=globalThis,g=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};g._$litElement$=!0,g.finalized=!0,X.litElementHydrateSupport?.({LitElement:g});var Ut=X.litElementPolyfillSupport;Ut?.({LitElement:g});(X.litElementVersions??=[]).push("4.2.2");var Ot=["J","F","M","A","M","J","J","A","S","O","N","D"],vt=320,bt=240,L=40,yt=new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"});function z(r,t=1,e=""){return r===null||Number.isNaN(r)?"\u2014":`${r.toFixed(t)}${e}`}function Lt(r){return r===null||r<=0?null:Math.max(.4,20/r)}function At(r){return r==="on"?"var(--kh-running, #2e7d32)":r==="off"?"var(--kh-stopped, #9e9e9e)":"var(--kh-unknown, #f9a825)"}var tt=class extends g{static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=I`
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
      background: var(--kh-map-bg, var(--secondary-background-color));
      border-radius: 8px;
    }
    .turbine-label {
      font-size: 9px;
      fill: var(--primary-text-color);
      text-anchor: middle;
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
  `}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t}getCardSize(){return 8}static getStubConfig(){return{title:"Kirk Hill Wind Farm"}}shouldUpdate(t){return t.has("hass")||t.has("_config")}get _turbinePrefix(){return this._config?.turbine_prefix??"turbine"}get _sitePrefix(){return this._config?.site_prefix??"kirk_hill_wind_farm"}_entity(t){return this.hass?.states?.[t]}_number(t){let e=this._entity(t);if(!e)return null;let s=parseFloat(e.state);return Number.isNaN(s)?null:s}_turbines(){let t=this._turbinePrefix,e=[];for(let s=1;s<=8;s++){let i=this._entity(`binary_sensor.${t}_t${s}_running`);if(!i)continue;let n=i.attributes??{};e.push({id:`T${s}`,running:i.state,lat:n.latitude??null,lon:n.longitude??null,rpm:n.rotor_speed_rpm??null,latestInterval:n.latest_generation_interval_end??null,generation:this._number(`sensor.${t}_t${s}_generation`),share:this._number(`sensor.${t}_t${s}_generation_share`),capacityFactor:this._number(`sensor.${t}_t${s}_capacity_factor`)})}return e}_positions(t){let e=t.filter(p=>p.lat!==null&&p.lon!==null),s={};if(e.length===0)return s;let i=e.map(p=>p.lat),n=e.map(p=>p.lon),o=Math.min(...i),l=Math.max(...i),a=Math.min(...n),c=Math.max(...n),u=l-o||1e-4,h=c-a||1e-4;for(let p of e){let f=L+(p.lon-a)/h*(vt-2*L),x=L+(l-p.lat)/u*(bt-2*L);s[p.id]={x:f,y:x}}return s}_renderTurbineMarker(t,e,s){let i=At(t.running),n=Lt(t.rpm),o=n===null,l=[0,120,240].map(a=>Q`<ellipse cx="0" cy="-8" rx="2.1" ry="8" transform="rotate(${a})" fill="${i}" />`);return Q`
      <g transform="translate(${e}, ${s})">
        <title>${t.id} — ${t.running} — ${z(t.rpm,1," rpm")}</title>
        <circle r="12" fill="var(--card-background-color, #fff)" stroke="${i}" stroke-width="2" />
        <g class="rotor ${o?"stopped":""}" style="${o?"":`animation-duration:${n}s`}">
          ${l}
          <circle r="2.4" fill="${i}" />
        </g>
        <text class="turbine-label" y="24">${t.id}</text>
      </g>
    `}_renderMap(t){let e=this._positions(t);return Object.keys(e).length===0?m`<div class="empty">No turbine coordinates available.</div>`:m`
      <svg class="map" viewBox="0 0 ${vt} ${bt}" role="img" aria-label="Turbine map">
        ${t.map(s=>{let i=e[s.id];return i?this._renderTurbineMarker(s,i.x,i.y):d})}
      </svg>
    `}_renderTable(t){return m`
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
          ${t.map(e=>m`
              <tr>
                <td>
                  <span class="dot" style="background:${At(e.running)}"></span>${e.id}
                </td>
                <td>${z(e.generation,2)}</td>
                <td>${z(e.share,1,"%")}</td>
                <td>${z(e.capacityFactor,1,"%")}</td>
              </tr>
            `)}
        </tbody>
      </table>
    `}_renderRevenue(){let t=this._entity(`sensor.${this._sitePrefix}_revenue_month_to_date`),e=this._entity(`sensor.${this._sitePrefix}_revenue_year_to_date`);if(!t&&!e)return d;let s=this._number(`sensor.${this._sitePrefix}_revenue_month_to_date`),i=e?.attributes?.monthly??[],n=s===null?"\u2014":yt.format(s);if(!(s!==null||i.length>0))return m`
        <div class="revenue">
          <div class="panel-label">Revenue</div>
          <div class="empty">Set a £/MWh price in the integration options to see revenue.</div>
        </div>
      `;let l=i.reduce((a,c)=>Math.max(a,c.revenue_gbp),0)||1;return m`
      <div class="revenue">
        <div class="panel-label">Revenue — month to date</div>
        <div class="revenue-headline">${n}</div>
        <div class="revenue-sub">Year-to-date by month</div>
        <div class="bars">
          ${i.map(a=>m`
              <div class="bar-col" title="${yt.format(a.revenue_gbp)}">
                <div
                  class="bar"
                  style="height:${Math.round(a.revenue_gbp/l*100)}%"
                ></div>
                <div class="bar-label">${Ot[a.month-1]??""}</div>
              </div>
            `)}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return m`${d}`;let t=this._turbines(),e=this._config.title??"Kirk Hill Wind Farm";return t.length===0?m`
        <ha-card>
          <div class="title">${e}</div>
          <div class="empty">
            No turbine entities found. Expected
            <code>binary_sensor.${this._turbinePrefix}_t1_running</code> … Is the Kirk Hill
            integration set up?
          </div>
        </ha-card>
      `:m`
      <ha-card>
        <div class="title">${e}</div>
        <div class="panels">
          <div>
            <div class="panel-label">Turbines</div>
            ${this._renderMap(t)}
          </div>
          <div>
            <div class="panel-label">Status</div>
            ${this._renderTable(t)}
          </div>
        </div>
        ${this._renderRevenue()}
      </ha-card>
    `}};customElements.define("kirkhill-card",tt);window.customCards=window.customCards??[];window.customCards.push({type:"kirkhill-card",name:"Kirk Hill Wind Farm Card",description:"Turbine map, status table and revenue chart for the Kirk Hill integration.",preview:!0,documentationURL:"https://github.com/njp970/kirkhill-card"});console.info("%c kirkhill-card %c 0.1.0 ","background:#2e7d32;color:#fff","");export{tt as KirkhillCard};
