function t(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",$=f.reactiveElementPolyfillSupport,g=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??b)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,$?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,M=`<${P}>`,N=document,L=()=>N.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,R="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,H=/>/g,Y=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,X=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),D=X(1),V=X(2),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,Z=N.createTreeWalker(N,129);function K(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=O:void 0!==l[1]?o=H:void 0!==l[2]?(F.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=Y):void 0!==l[3]&&(o=Y):o===Y?">"===l[0]?(o=n??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?Y:'"'===l[3]?I:j):o===I||o===j?o=Y:o===O||o===H?o=U:(o=Y,n=void 0);const d=o===Y&&t[e+1].startsWith("/>")?" ":"";r+=o===U?s+M:c>=0?(i.push(a),s.slice(0,c)+C+s.slice(c)+S+d):s+S+(-2===c?e:d)}return[K(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=G.createElement(l,s),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Z.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[r++],s=i.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?it:"?"===o[1]?nt:"@"===o[1]?rt:st}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],L()),Z.nextNode(),a.push({type:2,index:++n});i.append(t[e],L())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===W)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=z(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);Z.currentNode=i;let n=Z.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new ot(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=Z.nextNode(),r++)}return Z.currentNode=N,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),z(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new G(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new et(this.O(L()),this.O(L()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=Q(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Q(this,i[s+o],e,o),a===W&&(a=this._$AH[o]),r||=!z(a)||a!==this._$AH[o],a===B?t=B:t!==B&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class nt extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class rt extends st{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??B)===W)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(G,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new et(e.insertBefore(L(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const ht=lt.litElementPolyfillSupport;ht?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ut=(t=pt,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ft(t){return(e,s)=>"object"==typeof s?ut(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function _t(t){return ft({...t,state:!0,attribute:!1})}function mt(t,e,s=0){if(!t||!e)return s;const i=t.states[e];if(!i)return s;const n=parseFloat(i.state);return Number.isFinite(n)?n:s}const $t=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:0}),gt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:1}),yt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:2}),bt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:3});function vt(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t);return e>0&&e<1?`${$t.format(Math.round(1e3*t))} mA`:e>=10?`${yt.format(t)} A`:`${bt.format(t)} A`}function xt(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t);return e>=1e4?`${gt.format(t/1e3)} kW`:e>=1e3?`${yt.format(t/1e3)} kW`:`${gt.format(t)} W`}function wt(t,e){if(!t||!e)return"—";const s=t.states[e];if(!s||"unknown"===s.state||"unavailable"===s.state)return"—";const i=s.attributes.unit_of_measurement??"",n=parseFloat(s.state);if(Number.isFinite(n)&&String(n)===s.state.trim()){const t=Math.abs(n),e=t>=100?$t.format(n):t>=10?gt.format(n):yt.format(n);return i?`${e} ${i}`:e}return i?`${s.state} ${i}`:s.state}function kt(t,e,s){t.dispatchEvent(new CustomEvent(e,{detail:s,bubbles:!0,composed:!0,cancelable:!1}))}const At="shelly-3em-confirm-dialog";class Et extends HTMLElement{constructor(){super(),this._confirmed=!1;const t=this.attachShadow({mode:"open"});t.innerHTML='\n      <style>\n        :host {\n          --dialog-accent: #4fc3f7;\n          color: var(--primary-text-color, #e6f4fa);\n          font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);\n        }\n        dialog {\n          width: min(420px, calc(100vw - 32px));\n          padding: 0;\n          overflow: hidden;\n          color: inherit;\n          background:\n            radial-gradient(circle at 15% 0%, color-mix(in srgb, var(--dialog-accent) 10%, transparent), transparent 45%),\n            rgba(7, 16, 25, 0.98);\n          border: 1px solid color-mix(in srgb, var(--dialog-accent) 48%, transparent);\n          border-radius: 18px;\n          box-shadow: 0 0 28px color-mix(in srgb, var(--dialog-accent) 18%, transparent), 0 20px 64px rgba(0, 0, 0, 0.55);\n        }\n        dialog::backdrop {\n          background: rgba(0, 7, 13, 0.76);\n          backdrop-filter: blur(5px);\n        }\n        .body {\n          padding: 22px 22px 18px;\n        }\n        h2 {\n          display: flex;\n          align-items: center;\n          gap: 10px;\n          margin: 0 0 10px;\n          font-size: 16px;\n          font-weight: 650;\n          letter-spacing: 0.02em;\n        }\n        h2::before {\n          content: \'\';\n          width: 9px;\n          height: 9px;\n          flex: 0 0 auto;\n          border-radius: 50%;\n          background: var(--dialog-accent);\n          box-shadow: 0 0 10px var(--dialog-accent);\n        }\n        p {\n          margin: 0;\n          color: var(--secondary-text-color, rgba(220, 235, 245, 0.68));\n          font-size: 14px;\n          line-height: 1.5;\n        }\n        .actions {\n          display: flex;\n          justify-content: flex-end;\n          gap: 10px;\n          padding: 0 22px 20px;\n        }\n        button {\n          padding: 9px 18px;\n          font: inherit;\n          font-size: 13.5px;\n          font-weight: 650;\n          letter-spacing: 0.02em;\n          cursor: pointer;\n          border-radius: 10px;\n        }\n        .cancel {\n          color: var(--secondary-text-color, #a8bbc6);\n          background: rgba(255, 255, 255, 0.05);\n          border: 1px solid rgba(255, 255, 255, 0.12);\n        }\n        .cancel:hover,\n        .cancel:focus-visible {\n          color: var(--primary-text-color, #fff);\n          outline: 1px solid rgba(255, 255, 255, 0.3);\n        }\n        .confirm {\n          color: #0a0f16;\n          background: var(--dialog-accent);\n          border: 1px solid var(--dialog-accent);\n          box-shadow: 0 0 14px color-mix(in srgb, var(--dialog-accent) 45%, transparent);\n        }\n        .confirm:hover,\n        .confirm:focus-visible {\n          filter: brightness(1.12);\n          outline: none;\n        }\n      </style>\n      <dialog aria-labelledby="confirm-title">\n        <div class="body">\n          <h2 id="confirm-title"></h2>\n          <p></p>\n        </div>\n        <div class="actions">\n          <button type="button" class="cancel">Zrušit</button>\n          <button type="button" class="confirm"></button>\n        </div>\n      </dialog>\n    ',this._dialog=t.querySelector("dialog"),t.querySelector(".cancel").addEventListener("click",()=>this._dialog.close()),t.querySelector(".confirm").addEventListener("click",()=>{this._confirmed=!0,this._dialog.close()}),this._dialog.addEventListener("click",t=>{t.target===this._dialog&&this._dialog.close()}),this._dialog.addEventListener("close",()=>{this._resolve?.(this._confirmed),this.remove()})}show(t){const e=this.shadowRoot;return e.querySelector("h2").textContent=t.title,e.querySelector("p").textContent=t.message,e.querySelector(".confirm").textContent=t.confirmLabel,t.accent&&this.style.setProperty("--dialog-accent",t.accent),this._confirmed=!1,this._dialog.showModal(),new Promise(t=>{this._resolve=t})}}customElements.get(At)||customElements.define(At,Et);const Ct={entity:{domain:"sensor"}},St=[{name:"voltage",selector:Ct,custom_label:"Napětí (V)"},{name:"current",selector:Ct,custom_label:"Proud (A)"},{name:"power",selector:Ct,custom_label:"Výkon (W)"}],Pt=[{name:"title",selector:{text:{}}},{name:"phase_a",type:"expandable",title:"Fáze A (LA / TA)",icon:"mdi:alpha-a-circle",schema:St},{name:"phase_b",type:"expandable",title:"Fáze B (LB / TB)",icon:"mdi:alpha-b-circle",schema:St},{name:"phase_c",type:"expandable",title:"Fáze C (LC / TC)",icon:"mdi:alpha-c-circle",schema:St},{name:"totals",type:"expandable",flatten:!0,title:"Celkové hodnoty (header)",icon:"mdi:sigma",schema:[{name:"total_power",selector:Ct,custom_label:"Celkový výkon (W)"},{name:"total_energy",selector:Ct,custom_label:"Celková energie (kWh)"}]},{name:"neutral",type:"expandable",flatten:!0,title:"Neutrál (TN)",icon:"mdi:circle-outline",schema:[{name:"neutral_current",selector:Ct,custom_label:"Proud neutrálu (A)"}]},{name:"device",type:"expandable",flatten:!0,title:"Zařízení",icon:"mdi:restart",schema:[{name:"wifi_signal",selector:Ct,custom_label:"Síla Wi-Fi signálu"},{name:"lan_link_speed",selector:Ct,custom_label:"Rychlost LAN linky"},{name:"reset_button",selector:{entity:{domain:"button"}},custom_label:"Reset (button.*)"}]}],Mt={title:"Titulek karty",phase_a:"Fáze A",phase_b:"Fáze B",phase_c:"Fáze C",voltage:"Napětí (V)",current:"Proud (A)",power:"Výkon (W)",total_power:"Celkový výkon (W)",total_energy:"Celková energie (kWh)",neutral_current:"Proud neutrálu (A)",reset_button:"Reset (button.*)",wifi_signal:"Síla Wi-Fi signálu",lan_link_speed:"Rychlost LAN linky"},Nt={title:"Zobrazí se vlevo nahoře na kartě (např. DUB-1NP-FVE-AC-OUT).",voltage:"Sensor napětí dané fáze ze Shelly Pro 3EM.",current:"Sensor proudu dané fáze — bez něj se CT clamp (TA/TB/TC) nezobrazí.",power:"Sensor aktivního výkonu dané fáze — stačí i bez proudu pro zobrazení clampu.",total_power:"Volitelné — zobrazí se vpravo nahoře (řádek Výkon).",total_energy:"Volitelné — zobrazí se vpravo nahoře pod výkonem (řádek Energie).",neutral_current:"Volitelné — pokud je vyplněno, zobrazí se CT clamp TN vpravo.",reset_button:"Shelly button entita (typicky …_reset nebo …_restart). Klik na Reset v diagramu nejdřív zobrazí potvrzení, pak zavolá button.press.",wifi_signal:"Typicky sensor …_rssi / …_signal_strength. Když je vyplněno, LED Wi-Fi svítí; při najetí myší se ukáže síla signálu.",lan_link_speed:"Typicky sensor …_link_speed / …_ethernet. Když je vyplněno, LED LAN svítí; při najetí myší se ukáže rychlost linky."};let Lt=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>t.custom_label??Mt[t.name]??t.name,this._computeHelper=t=>Nt[t.name]}setConfig(t){this._config=t}render(){return this.hass&&this._config?D`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Pt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._changed}
      ></ha-form>
    `:D``}_changed(t){t.stopPropagation();const e=t.detail.value;this._config=e,kt(this,"config-changed",{config:e})}};Lt.styles=o`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `,t([ft({attribute:!1})],Lt.prototype,"hass",void 0),t([_t()],Lt.prototype,"_config",void 0),Lt=t([dt("shelly-3em-diagram-card-editor")],Lt);const zt={title:"DUB-1NP-FVE-AC-OUT",phase_a:{voltage:"sensor.dub_1nb_grid_ac_in_phase_a_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_a_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_a_vykon"},phase_b:{voltage:"sensor.dub_1nb_grid_ac_in_phase_b_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_b_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_b_vykon"},phase_c:{voltage:"sensor.dub_1nb_grid_ac_in_phase_c_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_c_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_c_vykon"},total_power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_vykon",total_energy:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_energie"},Tt={a:"#c4783a",b:"#90a4ae",c:"#b0bec5"},Rt="#42a5f5",Ut=680,Ot=600,Ht={x:380,y:24,w:128,h:470},Yt={leftX:Ht.x+36,rightX:Ht.x+92,cnY:Ht.y+32,abY:Ht.y+82,iaibY:Ht.y+Ht.h-78,icinY:Ht.y+Ht.h-32,tw:42,th:36},jt=[{key:"c",label:"LC",y:Yt.cnY,termX:Yt.leftX,termY:Yt.cnY},{key:"b",label:"LB",y:Yt.cnY+36,termX:Yt.rightX,termY:Yt.abY},{key:"a",label:"LA",y:Yt.cnY+72,termX:Yt.leftX,termY:Yt.abY}],It=[{key:"c",label:"TC",x:90,y:285,termX:Yt.leftX,termY:Yt.icinY,route:"side"},{key:"b",label:"TB",x:200,y:285,termX:Yt.rightX,termY:Yt.iaibY,route:"around-right",busY:530},{key:"a",label:"TA",x:310,y:285,termX:Yt.leftX,termY:Yt.iaibY,route:"side"}],Ft={x:580,y:285,termX:Yt.rightX,termY:Yt.icinY};let Xt=class extends ct{static getStubConfig(){return{...zt,phase_a:{...zt.phase_a},phase_b:{...zt.phase_b},phase_c:{...zt.phase_c}}}static async getConfigElement(){return document.createElement("shelly-3em-diagram-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");this._config={...t}}getCardSize(){return 9}getGridOptions(){return{columns:12,rows:7,min_rows:5}}_phase(t){if(this._config)return"a"===t?this._config.phase_a:"b"===t?this._config.phase_b:this._config.phase_c}_filled(t){return"string"==typeof t&&t.trim().length>0}_showPhaseClamp(t){const e=this._phase(t);return this._filled(e?.current)||this._filled(e?.power)}_onValueClick(t,e){e.stopPropagation(),function(t,e){e&&kt(t,"hass-more-info",{entityId:e})}(this,t)}async _onResetClick(t){t.stopPropagation();const e=this._config?.reset_button;if(!this._filled(e)||!this.hass?.callService)return;await function(t){const e=document.createElement(At);return document.body.append(e),e.show(t)}({title:"Resetovat Shelly Pro 3EM?",message:"Zařízení se restartuje (Shelly Reset). Měření může na chvíli výpadnout. Opravdu pokračovat?",confirmLabel:"Resetovat",accent:"#ff8a65"})&&await this.hass.callService("button","press",{entity_id:e})}render(){if(!this._config)return D`<ha-card><div class="warn">Chybí konfigurace karty.</div></ha-card>`;const t=this._config.title??"Shelly Pro 3EM",e=this._config.total_power?xt(mt(this.hass,this._config.total_power)):null,s=this._config.total_energy?(i=mt(this.hass,this._config.total_energy),Number.isFinite(i)?Math.abs(i)>=1e3?`${yt.format(i/1e3)} MWh`:`${gt.format(i)} kWh`:"—"):null;var i;return D`
      <ha-card>
        <div class="header">
          <div class="title">${t}</div>
          ${e||s?D`<div class="totals">
                ${e?D`<button
                      class="value-btn"
                      type="button"
                      @click=${t=>this._onValueClick(this._config.total_power,t)}
                    >
                      <span class="caption">Výkon</span>
                      <span class="num">${e}</span>
                    </button>`:B}
                ${s?D`<button
                      class="value-btn"
                      type="button"
                      @click=${t=>this._onValueClick(this._config.total_energy,t)}
                    >
                      <span class="caption">Energie</span>
                      <span class="num">${s}</span>
                    </button>`:B}
              </div>`:B}
        </div>
        <div class="diagram">${this._renderSvg()}</div>
      </ha-card>
    `}_renderSvg(){const{x:t,y:e,w:s,h:i}=Ht,n=e+116,r=e+i-116,o=e+i-64,a=this._wireEnd(Yt.rightX,Yt.cnY,"right");return D`
      <svg
        viewBox="0 0 ${Ut} ${Ot}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Shelly Pro 3EM diagram"
      >
        ${V`<rect class="meter" x=${t} y=${e} width=${s} height=${i} rx="3" />`}
        <!-- Jen jedna linka nad Power (mezi svorkami A/B/C/N a statusem) -->
        ${V`<line class="meter-div" x1=${t} y1=${n} x2=${t+s} y2=${n} />`}
        ${V`<line class="meter-div" x1=${t} y1=${r} x2=${t+s} y2=${r} />`}
        ${V`<line class="meter-div" x1=${t} y1=${o} x2=${t+s} y2=${o} />`}

        <!-- Horní vodiče až po meteru — viditelné na čele jako IA/IC -->
        ${jt.map(t=>this._renderPhaseLine(t))}

        <!-- LN (nulák) — zprava do N, jako TN→IN -->
        ${V`<path
          class="wire"
          fill="none"
          stroke=${Rt}
          d=${`M 655 ${Yt.cnY} L ${a.x} ${a.y}`}
        />`}
        ${V`<text class="label label-n" x="620" y=${Yt.cnY-10} text-anchor="middle" fill=${Rt}>LN</text>`}

        <!-- Horní svorky až po vodičích -->
        ${this._terminal(Yt.leftX,Yt.cnY,"C",Tt.c)}
        ${this._terminal(Yt.rightX,Yt.cnY,"N",Rt)}
        ${this._terminal(Yt.leftX,Yt.abY,"A",Tt.a)}
        ${this._terminal(Yt.rightX,Yt.abY,"B",Tt.b)}

        ${this._renderStatusPanel(t+s/2,n+20)}

        ${this._renderClampRowCaptions()}
        ${It.map(t=>this._renderPhaseClamp(t))}
        ${this._renderNeutralClamp()}

        <!-- Spodní svorky až po vodičích — text nepřekryje linka -->
        ${this._terminal(Yt.leftX,Yt.iaibY,"IA",Tt.a)}
        ${this._terminal(Yt.rightX,Yt.iaibY,"IB",Tt.b)}
        ${this._terminal(Yt.leftX,Yt.icinY,"IC",Tt.c)}
        ${this._terminal(Yt.rightX,Yt.icinY,"IN",Rt)}
      </svg>
    `}_renderStatusPanel(t,e){const s=function(t){if(t<5)return 0;const e=5-4.35*Math.min(1,t/5e3);return Math.round(2*e)/2}(this._countPowerAbs()),i=s>0?Math.min(.49,.35/s):0,n=this._filled(this._config?.wifi_signal),r=this._filled(this._config?.lan_link_speed),o=[{name:"Power",color:"#ff5252",active:!0},{name:"Wi-Fi",color:"#ffd740",active:n,title:n?`Wi-Fi: ${wt(this.hass,this._config?.wifi_signal)}`:void 0},{name:"LAN",color:"#69f0ae",active:r,title:r?`LAN: ${wt(this.hass,this._config?.lan_link_speed)}`:void 0},{name:"Count",color:"#ff5252",active:s>0,countPulse:s>0}],a=e+32*(o.length-1)+52+28,l=this._filled(this._config?.reset_button);return V`
      <g class="status-panel">
        ${o.map((n,r)=>{const o=e+32*r-4,a=t+42;if(n.countPulse)return V`
              <text class="led-label" x=${t-44} y=${e+32*r}>${n.name}</text>
              <circle
                class="led lit led-count"
                cx=${a}
                cy=${o}
                r="6.5"
                fill=${n.color}
                stroke=${n.color}
                opacity="0.08"
              >
                <animate
                  attributeName="opacity"
                  values="1;1;0.08;0.08"
                  keyTimes="0;${i};${i};1"
                  dur="${s}s"
                  repeatCount="indefinite"
                  calcMode="discrete"
                />
              </circle>
            `;if(!n.active)return V`
              <text class="led-label dim" x=${t-44} y=${e+32*r}>${n.name}</text>
              <circle class="led off" cx=${a} cy=${o} r="6.5" />
            `;return V`
            <text class="led-label" x=${t-44} y=${e+32*r}>${n.name}</text>
            <circle
              class=${"led lit"}
              cx=${a}
              cy=${o}
              r="6.5"
              fill=${n.color}
              stroke=${n.color}
              style=${`--led-glow: ${n.color}`}
            >
              ${n.title?V`<title>${n.title}</title>`:B}
            </circle>
          `})}
        <g
          class="reset-group ${l?"live":""}"
          role=${l?"button":B}
          tabindex=${l?0:B}
          @click=${l?t=>{this._onResetClick(t)}:B}
          @keydown=${l?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._onResetClick(t))}:B}
        >
          <circle class="reset-btn" cx=${t} cy=${a} r=${28} />
          <text class="reset-label" x=${t} y=${a+5} text-anchor="middle">Reset</text>
        </g>
      </g>
    `}_countPowerAbs(){if(this._filled(this._config?.total_power))return Math.abs(mt(this.hass,this._config.total_power));let t=0;for(const e of["a","b","c"]){const s=this._phase(e)?.power;this._filled(s)&&(t+=mt(this.hass,s))}return Math.abs(t)}_terminal(t,e,s,i){const{tw:n,th:r}=Yt;return V`
      <rect
        class="term"
        x=${t-n/2}
        y=${e-r/2}
        width=${n}
        height=${r}
        rx="2"
        stroke=${i}
      />
      <text class="term-label" x=${t} y=${e+5} text-anchor="middle" fill=${i}>${s}</text>
    `}_wireEnd(t,e,s){const{tw:i,th:n}=Yt;switch(s){case"left":return{x:t-i/2,y:e};case"right":return{x:t+i/2,y:e};case"top":return{x:t,y:e-n/2};case"bottom":return{x:t,y:e+n/2}}}_renderPhaseLine(t){const e=this._phase(t.key),s=function(t){return Number.isFinite(t)?`${gt.format(t)} V`:"—"}(mt(this.hass,e?.voltage)),i=Tt[t.key],n=Ht.x-18,r=Ht.x-12,o=(Yt.leftX+Yt.rightX)/2;let a;if("c"===t.key){const e=this._wireEnd(t.termX,t.termY,"left");a=`M 64 ${t.y} L ${e.x} ${e.y}`}else if("a"===t.key){const e=this._wireEnd(t.termX,t.termY,"left");a=[`M 64 ${t.y}`,`L ${r} ${t.y}`,`L ${r} ${t.termY}`,`L ${e.x} ${e.y}`].join(" ")}else{const e=this._wireEnd(t.termX,t.termY,"left");a=[`M 64 ${t.y}`,`L ${o} ${t.y}`,`L ${o} ${t.termY}`,`L ${e.x} ${e.y}`].join(" ")}return V`
      <g class="phase-line">
        <path class="wire" fill="none" stroke=${i} d=${a} />
        <text class="caption" x="14" y=${t.y-10}>Napětí</text>
        <text
          class="value clickable"
          x=${68}
          y=${t.y-10}
          fill=${i}
          @click=${t=>this._onValueClick(e?.voltage,t)}
        >
          ${s}
        </text>
        <text class="label" x=${n} y=${t.y-10} text-anchor="end" fill=${i}>
          ${t.label}
        </text>
      </g>
    `}_renderClampRowCaptions(){const t=It.some(t=>this._showPhaseClamp(t.key))||this._filled(this._config?.neutral_current);if(!t)return B;const e=It[0].y;return V`
      <g class="clamp-captions">
        <text class="caption" x="14" y=${e-70}>Proud</text>
        <text class="caption" x="14" y=${e-44}>Výkon</text>
      </g>
    `}_renderPhaseClamp(t){if(!this._showPhaseClamp(t.key))return B;const e=this._phase(t.key),s=mt(this.hass,e?.current),i=mt(this.hass,e?.power),n=Tt[t.key],r=t.y+25,o=this._clampWirePath(t.x,r,t.termX,t.termY,t.route,t.busY,"left");return V`
      <g class="phase-clamp">
        <path class="wire" fill="none" stroke=${n} d=${o} />
        ${this._filled(e?.current)?V`
              <text
                class="value clickable"
                x=${t.x}
                y=${t.y-70}
                text-anchor="middle"
                fill=${n}
                @click=${t=>this._onValueClick(e?.current,t)}
              >
                ${vt(s)}
              </text>
            `:B}
        ${this._filled(e?.power)?V`
              <text
                class="value clickable"
                x=${t.x}
                y=${t.y-44}
                text-anchor="middle"
                fill=${n}
                @click=${t=>this._onValueClick(e?.power,t)}
              >
                ${xt(i)}
              </text>
            `:B}
        ${this._ctIcon(t.x,t.y,t.label,this._filled(e?.current)?Math.abs(s):0,n,"left")}
      </g>
    `}_clampWirePath(t,e,s,i,n,r,o){if("side"===n){const n=this._wireEnd(s,i,o);return[`M ${t} ${e}`,`L ${t} ${i}`,`L ${n.x} ${n.y}`].join(" ")}const a=r??i+80,l=s+Yt.tw/2+36,c=this._wireEnd(s,i,"right");return[`M ${t} ${e}`,`L ${t} ${a}`,`L ${l} ${a}`,`L ${l} ${i}`,`L ${c.x} ${c.y}`].join(" ")}_renderNeutralClamp(){const t=this._config?.neutral_current;if(!this._filled(t))return B;const e=mt(this.hass,t),s=Ft.y+25,i=this._clampWirePath(Ft.x,s,Ft.termX,Ft.termY,"side",void 0,"right");return V`
      <g class="neutral-clamp">
        <path class="wire" fill="none" stroke=${Rt} d=${i} />
        <text class="caption" x=${Ft.x} y=${Ft.y-70} text-anchor="middle">Proud</text>
        <text
          class="value clickable"
          x=${Ft.x}
          y=${Ft.y-44}
          text-anchor="middle"
          fill=${Rt}
          @click=${e=>this._onValueClick(t,e)}
        >
          ${vt(e)}
        </text>
        ${this._ctIcon(Ft.x,Ft.y,"TN",Math.abs(e),Rt)}
      </g>
    `}_ctIcon(t,e,s,i,n,r="bottom"){const o=function(t){if(t<.02)return 0;const e=2.8-2.4*Math.min(1,t/32);return Math.round(4*e)/4}(i),a=25,l=15,c=-66*Math.PI/180,h=246*Math.PI/180,d=a+l*Math.cos(c),p=a+l*Math.sin(c),u=a+l*Math.cos(h),f=a+l*Math.sin(h),_=`M ${d.toFixed(2)} ${p.toFixed(2)} A 15 15 0 1 1 ${u.toFixed(2)} ${f.toFixed(2)}`,m="left"===r?V`<text class="label" x=${-6} y=${29} text-anchor="end" fill=${n}>${s}</text>`:V`<text class="label" x=${a} y=${66} text-anchor="middle" fill=${n}>${s}</text>`;return V`
      <g class="ct-clamp" transform="translate(${t-a}, ${e-a})">
        <rect class="ct-body" x="1" y="1" width=${48} height=${48} rx="7" stroke=${n} />
        <path class="ct-ring" fill="none" stroke=${n} d=${_} />
        <circle
          class="ct-dot ${o>0?"pulse":""}"
          cx=${a}
          cy=${a}
          r="3.5"
          fill=${n}
          style=${o>0?`--pulse-dur:${o}s`:""}
        />
        ${m}
      </g>
    `}};Xt.styles=o`
    :host {
      display: block;
      --diagram-accent: #4fc3f7;
      --diagram-bg: #0f1419;
      --shelly-blue: #1e88e5;
    }

    ha-card {
      background: var(--card-background-color, var(--diagram-bg));
      overflow: hidden;
      padding: 10px 4px 2px;
      color: var(--primary-text-color, #fff);
    }

    .header {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      min-height: 2.4em;
      padding: 0 12px 4px;
      gap: 12px;
    }

    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      max-width: calc(100% - 200px);
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--primary-text-color, #fff);
      pointer-events: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .totals {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      flex-shrink: 0;
    }

    .value-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      flex-direction: row;
      align-items: baseline;
      gap: 8px;
      line-height: 1.2;
      text-align: right;
    }

    .value-btn .caption {
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .value-btn .num {
      color: var(--diagram-accent);
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums;
      font-weight: 500;
    }

    .value-btn:hover .num {
      text-decoration: underline;
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
      stroke-width: 2;
      stroke-linecap: square;
      stroke-linejoin: miter;
      fill: none;
    }

    .meter {
      fill: rgba(30, 136, 229, 0.08);
      stroke: var(--shelly-blue);
      stroke-width: 2;
    }

    .meter-div {
      stroke: var(--shelly-blue);
      stroke-width: 1.2;
      opacity: 0.55;
    }

    .term {
      fill: var(--card-background-color, var(--diagram-bg));
      stroke-width: 1.6;
    }

    .term-label {
      font-size: 13px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 650;
    }

    .label {
      font-size: 12px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
    }

    .caption {
      fill: rgba(255, 255, 255, 0.45);
      font-size: 10px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .value {
      font-size: 13px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
    }

    .value.clickable {
      cursor: pointer;
    }

    .value.clickable:hover {
      filter: brightness(1.2);
      text-decoration: underline;
    }

    .led-label {
      fill: rgba(255, 255, 255, 0.75);
      font-size: 12px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    }

    .led-label.dim {
      fill: rgba(255, 255, 255, 0.35);
    }

    .led.off {
      fill: none;
      stroke: rgba(255, 255, 255, 0.28);
      stroke-width: 1.2;
    }

    .led {
      stroke-width: 1.2;
    }

    .led.lit {
      filter: drop-shadow(0 0 4px var(--led-glow, #fff));
    }

    .led-count {
      filter: drop-shadow(0 0 4px #ff5252);
    }

    .reset-btn {
      /* transparent fill = celá plocha klikací (fill:none chytá jen stroke) */
      fill: transparent;
      stroke: var(--shelly-blue);
      stroke-width: 1.8;
      pointer-events: all;
    }

    .reset-label {
      fill: var(--shelly-blue);
      font-size: 13px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      pointer-events: none;
    }

    .reset-group.live {
      cursor: pointer;
      pointer-events: all;
    }

    .reset-group.live:hover .reset-btn,
    .reset-group.live:focus-visible .reset-btn {
      stroke: var(--diagram-accent);
      fill: rgba(79, 195, 247, 0.1);
    }

    .reset-group.live:hover .reset-label,
    .reset-group.live:focus-visible .reset-label {
      fill: var(--diagram-accent);
    }

    .reset-group.live:focus {
      outline: none;
    }

    .ct-body {
      fill: rgba(15, 20, 25, 0.92);
      stroke-width: 1.8;
    }

    .ct-ring {
      stroke-width: 1.8;
      stroke-linecap: round;
    }

    .ct-dot {
      opacity: 0.45;
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
        transform: scale(0.7);
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
  `,t([ft({attribute:!1})],Xt.prototype,"hass",void 0),t([_t()],Xt.prototype,"_config",void 0),Xt=t([dt("shelly-3em-diagram-card")],Xt),window.customCards=window.customCards||[],window.customCards.push({type:"shelly-3em-diagram-card",name:"Shelly 3EM Diagram Card",description:"Live diagram Shelly Pro 3EM — napětí, proud a výkon po fázích.",preview:!0,documentationURL:"https://github.com/elvisek2020/fve-shelly-card"}),console.info("%c SHELLY-3EM-DIAGRAM-CARD %c 0.2.0 ","background:#0f1419;color:#4fc3f7;font-weight:bold","background:#4fc3f7;color:#0f1419;font-weight:bold");export{Xt as Shelly3emDiagramCard};
