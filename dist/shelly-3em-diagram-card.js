function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",$=u.reactiveElementPolyfillSupport,f=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:g).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,$?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,w=A.trustedTypes,C=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+S,P=`<${k}>`,M=document,T=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,z=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),X=new WeakMap,W=M.createTreeWalker(M,129);function Y(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const q=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=O;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===O?"!--"===l[1]?o=R:void 0!==l[1]?o=H:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=r??O,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?D:I):o===D||o===I?o=z:o===R||o===H?o=O:(o=z,r=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";n+=o===O?s+P:c>=0?(i.push(a),s.slice(0,c)+E+s.slice(c)+S+d):s+S+(-2===c?e:d)}return[Y(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=q(t,e);if(this.el=Z.createElement(l,s),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=c[n++],s=i.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],T()),W.nextNode(),a.push({type:2,index:++r});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===F)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=N(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);W.currentNode=i;let r=W.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new K(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=W.nextNode(),n++)}return W.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),N(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(Y(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new Z(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new K(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=G(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=G(this,i[s+o],e,o),a===F&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===F)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Z,K),(A.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new K(e.insertBefore(T(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:y},ct=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,s)=>"object"==typeof s?ct(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function dt(t,e,s=0){if(!t||!e)return s;const i=t.states[e];if(!i)return s;const r=parseFloat(i.state);return Number.isFinite(r)?r:s}const pt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:0}),ut=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:1}),_t=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:2}),mt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:3});function $t(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t);return e>=1e4?`${ut.format(t/1e3)} kW`:e>=1e3?`${_t.format(t/1e3)} kW`:`${ut.format(t)} W`}function ft(t,e){e&&function(t,e,s){t.dispatchEvent(new CustomEvent(e,{detail:s,bubbles:!0,composed:!0,cancelable:!1}))}(t,"hass-more-info",{entityId:e})}const gt={title:"DUB-1NP-FVE-AC-OUT",phase_a:{voltage:"sensor.dub_1nb_grid_ac_in_phase_a_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_a_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_a_vykon"},phase_b:{voltage:"sensor.dub_1nb_grid_ac_in_phase_b_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_b_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_b_vykon"},phase_c:{voltage:"sensor.dub_1nb_grid_ac_in_phase_c_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_c_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_c_vykon"},total_power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_vykon",total_energy:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_energie"},yt=300,vt=48,bt=100,At=280,xt=[{key:"c",lineLabel:"LC",clampLabel:"TC",lineY:78,clampX:70,termX:yt+28,outTerm:"IC",outTermX:yt+28,outTermY:vt+At-28},{key:"b",lineLabel:"LB",clampLabel:"TB",lineY:118,clampX:150,termX:yt+72,outTerm:"IB",outTermX:yt+72,outTermY:vt+At-68},{key:"a",lineLabel:"LA",clampLabel:"TA",lineY:158,clampX:230,termX:yt+28,outTerm:"IA",outTermX:yt+28,outTermY:vt+At-68}];let wt=class extends ot{static getStubConfig(){return{...gt,phase_a:{...gt.phase_a},phase_b:{...gt.phase_b},phase_c:{...gt.phase_c}}}setConfig(t){if(!t)throw new Error("Missing configuration");this._config={...t}}getCardSize(){return 8}getGridOptions(){return{columns:12,rows:6,min_rows:4}}_phase(t){if(this._config)return"a"===t?this._config.phase_a:"b"===t?this._config.phase_b:this._config.phase_c}_onValueClick(t,e){e.stopPropagation(),ft(this,t)}render(){if(!this._config)return j`<ha-card><div class="warn">Chybí konfigurace karty.</div></ha-card>`;const t=this._config.title??"Shelly Pro 3EM",e=this._config.total_power?$t(dt(this.hass,this._config.total_power)):null,s=this._config.total_energy?(i=dt(this.hass,this._config.total_energy),Number.isFinite(i)?Math.abs(i)>=1e3?`${_t.format(i/1e3)} MWh`:`${ut.format(i)} kWh`:"—"):null;var i;return j`
      <ha-card>
        <div class="header">
          <div class="header-left">
            <div class="title">${t}</div>
            ${e||s?j`<div class="totals">
                  ${e?j`<button
                        class="value-btn"
                        type="button"
                        @click=${t=>this._onValueClick(this._config.total_power,t)}
                      >
                        ${e}
                      </button>`:V}
                  ${s?j`<button
                        class="value-btn"
                        type="button"
                        @click=${t=>this._onValueClick(this._config.total_energy,t)}
                      >
                        ${s}
                      </button>`:V}
                </div>`:V}
          </div>
          <div class="header-icons" aria-hidden="true">
            <svg class="status-icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M12 3C7.5 3 3.5 5.1 1 8.3l1.6 1.6C4.7 7.5 8.1 6 12 6s7.3 1.5 9.4 3.9L23 8.3C20.5 5.1 16.5 3 12 3zm0 6c-2.7 0-5.1 1-7 2.6L6.6 13C8 11.8 9.9 11 12 11s4 0.8 5.4 2l1.6-1.4C17.1 10 14.7 9 12 9zm0 6c-1.2 0-2.3.4-3.2 1.1L12 21l3.2-4.9C14.3 15.4 13.2 15 12 15z"
              />
            </svg>
            <svg class="status-icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
              />
            </svg>
          </div>
        </div>
        <div class="diagram">${this._renderSvg()}</div>
      </ha-card>
    `}_renderSvg(){const t=yt,e=vt,s=bt,i=At,r=e+22,n=e+62,o=e+i-68,a=e+i-28,l=t+s+70;return j`
      <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shelly Pro 3EM diagram">
        <!-- Vstupní fáze LC / LB / LA -->
        ${xt.map(t=>this._renderPhaseInput(t))}

        <!-- LN výstup z N doprava -->
        <line class="wire" x1=${t+72} y1=${r} x2="520" y2=${r} />
        <text class="label" x="500" y=${r-8} text-anchor="end">LN</text>

        <!-- Meter body -->
        <rect class="meter" x=${t} y=${e} width=${s} height=${i} rx="4" />

        <!-- Vnitřní oddělovače -->
        <line class="meter-div" x1=${t} y1=${e+42} x2=${t+s} y2=${e+42} />
        <line class="meter-div" x1=${t} y1=${e+82} x2=${t+s} y2=${e+82} />
        <line class="meter-div" x1=${t} y1=${e+i-88} x2=${t+s} y2=${e+i-88} />
        <line class="meter-div" x1=${t} y1=${e+i-48} x2=${t+s} y2=${e+i-48} />

        <!-- Svorky C N -->
        ${this._terminal(t+28,r,"C")}
        ${this._terminal(t+72,r,"N")}

        <!-- Svorky A B -->
        ${this._terminal(t+28,n,"A")}
        ${this._terminal(t+72,n,"B")}

        <!-- Status LEDs + Reset (dekorativní) -->
        <g class="status-panel" transform="translate(${t+18}, ${e+108})">
          ${["Power","Wi-Fi","LAN","Count"].map((t,e)=>j`
              <text class="led-label" x="0" y=${22*e}>${t}</text>
              <circle class="led" cx="62" cy=${22*e-4} r="5" />
            `)}
          <circle class="reset-btn" cx="42" cy="108" r="22" />
          <text class="reset-label" x="42" y="112" text-anchor="middle">Reset</text>
        </g>

        <!-- Svorky IA IB -->
        ${this._terminal(t+28,o,"IA")}
        ${this._terminal(t+72,o,"IB")}

        <!-- Svorky IC IN -->
        ${this._terminal(t+28,a,"IC")}
        ${this._terminal(t+72,a,"IN")}

        <!-- CT clampy + smyčky fází -->
        ${xt.map(t=>this._renderPhaseClamp(t,340))}

        <!-- TN clamp + smyčka k IN -->
        ${this._renderCtClamp(l,250,"TN",0)}
        <path
          class="wire"
          fill="none"
          d="M ${t+72} ${a}
             L ${t+72} ${340}
             L ${l} ${340}
             L ${l} ${272}"
        />
      </svg>
    `}_terminal(t,e,s){return j`
      <rect class="term" x=${t-14} y=${e-12} width="28" height="24" rx="2" />
      <text class="term-label" x=${t} y=${e+4} text-anchor="middle">${s}</text>
    `}_renderPhaseInput(t){const e=this._phase(t.key),s=function(t){return Number.isFinite(t)?`${ut.format(t)} V`:"—"}(dt(this.hass,e?.voltage)),i="c"===t.key?vt+22:vt+62,r=t.termX;return j`
      <g class="phase-in">
        <path
          class="wire"
          fill="none"
          d="M 16 ${t.lineY} L ${r} ${t.lineY} L ${r} ${i}"
        />
        <text class="label" x="20" y=${t.lineY-8}>${t.lineLabel}</text>
        <text
          class="value clickable"
          x="90"
          y=${t.lineY-8}
          @click=${t=>this._onValueClick(e?.voltage,t)}
        >
          ${s}
        </text>
      </g>
    `}_renderPhaseClamp(t,e){const s=this._phase(t.key),i=dt(this.hass,s?.current),r=dt(this.hass,s?.power),n=250,o=`\n      M ${t.outTermX} ${t.outTermY}\n      L ${t.outTermX} ${e}\n      L ${t.clampX} ${e}\n      L ${t.clampX} 272\n    `;return j`
      <g class="phase-clamp">
        <!-- Hodnoty nad clampem -->
        <text
          class="value clickable"
          x=${t.clampX}
          y=${202}
          text-anchor="middle"
          @click=${t=>this._onValueClick(s?.current,t)}
        >
          ${function(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t);return e>0&&e<1?`${pt.format(Math.round(1e3*t))} mA`:e>=10?`${_t.format(t)} A`:`${mt.format(t)} A`}(i)}
        </text>
        <text
          class="value clickable"
          x=${t.clampX}
          y=${220}
          text-anchor="middle"
          @click=${t=>this._onValueClick(s?.power,t)}
        >
          ${$t(r)}
        </text>
        ${this._renderCtClamp(t.clampX,n,t.clampLabel,Math.abs(i))}
        <path class="wire" fill="none" d=${o} />
      </g>
    `}_renderCtClamp(t,e,s,i){const r=function(t){if(t<.02)return 0;const e=2.8-2.4*Math.min(1,t/32);return Math.round(4*e)/4}(i),n=18;return j`
      <g class="ct-clamp" transform="translate(${t-n}, ${e-n})">
        <rect class="ct-body" x="0" y="0" width=${36} height=${36} rx="3" />
        <circle class="ct-ring" cx=${n} cy=${n} r="11" />
        <circle
          class="ct-dot ${r>0?"pulse":""}"
          cx=${n}
          cy=${n}
          r="3.5"
          style=${r>0?`--pulse-dur:${r}s`:""}
        />
        <text class="label" x=${n} y=${50} text-anchor="middle">${s}</text>
      </g>
    `}};wt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)})`
    :host {
      display: block;
      --diagram-accent: var(--primary-color, #4fc3f7);
      --diagram-line: var(--primary-text-color, #e0e6ed);
      --diagram-muted: var(--secondary-text-color, #9aa5b1);
      --diagram-bg: var(--card-background-color, #0f1419);
    }

    ha-card {
      background: var(--diagram-bg);
      overflow: hidden;
      padding: 12px 8px 8px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 8px 4px;
      gap: 12px;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--diagram-line);
      letter-spacing: 0.02em;
    }

    .totals {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .value-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: var(--diagram-accent);
      font: inherit;
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums;
    }

    .value-btn:hover {
      text-decoration: underline;
    }

    .header-icons {
      display: flex;
      gap: 8px;
      color: var(--diagram-muted);
      padding-top: 2px;
    }

    .diagram {
      width: 100%;
      line-height: 0;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .wire {
      stroke: var(--diagram-line);
      stroke-width: 1.2;
      fill: none;
      opacity: 0.85;
    }

    .meter {
      fill: transparent;
      stroke: var(--diagram-line);
      stroke-width: 1.4;
    }

    .meter-div {
      stroke: var(--diagram-line);
      stroke-width: 1;
      opacity: 0.55;
    }

    .term {
      fill: transparent;
      stroke: var(--diagram-line);
      stroke-width: 1.1;
    }

    .term-label {
      fill: var(--diagram-line);
      font-size: 11px;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 500;
    }

    .label {
      fill: var(--diagram-muted);
      font-size: 11px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .value {
      fill: var(--diagram-accent);
      font-size: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-variant-numeric: tabular-nums;
    }

    .value.clickable {
      cursor: pointer;
    }

    .value.clickable:hover {
      text-decoration: underline;
    }

    .led-label {
      fill: var(--diagram-muted);
      font-size: 10px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .led {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.2;
    }

    .reset-btn {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.4;
    }

    .reset-label {
      fill: var(--diagram-line);
      font-size: 10px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .ct-body {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.3;
    }

    .ct-ring {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.3;
    }

    .ct-dot {
      fill: var(--diagram-accent);
      opacity: 0.35;
    }

    .ct-dot.pulse {
      opacity: 1;
      animation: ct-pulse var(--pulse-dur, 1.5s) ease-in-out infinite;
      transform-origin: center;
      transform-box: fill-box;
    }

    @keyframes ct-pulse {
      0%,
      100% {
        opacity: 0.35;
        transform: scale(0.75);
      }
      50% {
        opacity: 1;
        transform: scale(1.25);
      }
    }

    .warn {
      padding: 16px;
      color: var(--error-color, #ff5252);
    }
  `,t([ht({attribute:!1})],wt.prototype,"hass",void 0),t([function(t){return ht({...t,state:!0,attribute:!1})}()],wt.prototype,"_config",void 0),wt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("shelly-3em-diagram-card")],wt),window.customCards=window.customCards||[],window.customCards.push({type:"shelly-3em-diagram-card",name:"Shelly 3EM Diagram Card",description:"Live diagram Shelly Pro 3EM — napětí, proud a výkon po fázích.",preview:!0,documentationURL:"https://github.com/elvisek2020/fve-shelly-card"}),console.info("%c SHELLY-3EM-DIAGRAM-CARD %c 0.1.0 ","background:#0f1419;color:#4fc3f7;font-weight:bold","background:#4fc3f7;color:#0f1419;font-weight:bold");export{wt as Shelly3emDiagramCard};
