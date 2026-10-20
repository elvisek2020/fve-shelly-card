function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,_=f.trustedTypes,$=_?_.emptyScript:"",g=f.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,g?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+E,z=`<${P}>`,L=document,M=()=>L.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,V=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),X=/'/g,j=/"/g,H=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=I(1),W=I(2),D=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Z=new WeakMap,q=L.createTreeWalker(L,129);function K(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=Y;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===Y?"!--"===l[1]?r=O:void 0!==l[1]?r=U:void 0!==l[2]?(H.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=V):void 0!==l[3]&&(r=V):r===V?">"===l[0]?(r=n??Y,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?V:'"'===l[3]?j:X):r===j||r===X?r=V:r===O||r===U?r=Y:(r=V,n=void 0);const d=r===V&&t[e+1].startsWith("/>")?" ":"";o+=r===Y?i+z:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?nt:"@"===r[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===D)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new rt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=q.nextNode(),o++)}return q.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new J(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new et(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Q(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==D,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Q(this,s[i+r],e,r),a===D&&(a=this._$AH[r]),o||=!N(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class nt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class ot extends it{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??B)===D)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(J,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new et(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const ht=lt.litElementPolyfillSupport;ht?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ft(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return ft({...t,state:!0,attribute:!1})}function $t(t,e,i=0){if(!t||!e)return i;const s=t.states[e];if(!s)return i;const n=parseFloat(s.state);return Number.isFinite(n)?n:i}const gt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:0}),mt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:1}),yt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:2}),bt=new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:3});function vt(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t);return e>0&&e<1?`${gt.format(Math.round(1e3*t))} mA`:e>=10?`${yt.format(t)} A`:`${bt.format(t)} A`}function xt(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t);return e>=1e4?`${mt.format(t/1e3)} kW`:e>=1e3?`${yt.format(t/1e3)} kW`:`${mt.format(t)} W`}function wt(t,e){if(!t||!e)return"—";const i=t.states[e];if(!i||"unknown"===i.state||"unavailable"===i.state)return"—";const s=i.attributes.unit_of_measurement??"",n=parseFloat(i.state);if(Number.isFinite(n)&&String(n)===i.state.trim()){const t=Math.abs(n),e=t>=100?gt.format(n):t>=10?mt.format(n):yt.format(n);return s?`${e} ${s}`:e}return s?`${i.state} ${s}`:i.state}function kt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0,cancelable:!1}))}function At(t,e){e&&kt(t,"hass-more-info",{entityId:e})}const St="shelly-3em-confirm-dialog";class Ct extends HTMLElement{constructor(){super(),this._confirmed=!1;const t=this.attachShadow({mode:"open"});t.innerHTML='\n      <style>\n        :host {\n          --dialog-accent: #4fc3f7;\n          color: var(--primary-text-color, #e6f4fa);\n          font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);\n        }\n        dialog {\n          width: min(420px, calc(100vw - 32px));\n          padding: 0;\n          overflow: hidden;\n          color: inherit;\n          background:\n            radial-gradient(circle at 15% 0%, color-mix(in srgb, var(--dialog-accent) 10%, transparent), transparent 45%),\n            rgba(7, 16, 25, 0.98);\n          border: 1px solid color-mix(in srgb, var(--dialog-accent) 48%, transparent);\n          border-radius: 18px;\n          box-shadow: 0 0 28px color-mix(in srgb, var(--dialog-accent) 18%, transparent), 0 20px 64px rgba(0, 0, 0, 0.55);\n        }\n        dialog::backdrop {\n          background: rgba(0, 7, 13, 0.76);\n          backdrop-filter: blur(5px);\n        }\n        .body {\n          padding: 22px 22px 18px;\n        }\n        h2 {\n          display: flex;\n          align-items: center;\n          gap: 10px;\n          margin: 0 0 10px;\n          font-size: 16px;\n          font-weight: 650;\n          letter-spacing: 0.02em;\n        }\n        h2::before {\n          content: \'\';\n          width: 9px;\n          height: 9px;\n          flex: 0 0 auto;\n          border-radius: 50%;\n          background: var(--dialog-accent);\n          box-shadow: 0 0 10px var(--dialog-accent);\n        }\n        p {\n          margin: 0;\n          color: var(--secondary-text-color, rgba(220, 235, 245, 0.68));\n          font-size: 14px;\n          line-height: 1.5;\n        }\n        .actions {\n          display: flex;\n          justify-content: flex-end;\n          gap: 10px;\n          padding: 0 22px 20px;\n        }\n        button {\n          padding: 9px 18px;\n          font: inherit;\n          font-size: 13.5px;\n          font-weight: 650;\n          letter-spacing: 0.02em;\n          cursor: pointer;\n          border-radius: 10px;\n        }\n        .cancel {\n          color: var(--secondary-text-color, #a8bbc6);\n          background: rgba(255, 255, 255, 0.05);\n          border: 1px solid rgba(255, 255, 255, 0.12);\n        }\n        .cancel:hover,\n        .cancel:focus-visible {\n          color: var(--primary-text-color, #fff);\n          outline: 1px solid rgba(255, 255, 255, 0.3);\n        }\n        .confirm {\n          color: #0a0f16;\n          background: var(--dialog-accent);\n          border: 1px solid var(--dialog-accent);\n          box-shadow: 0 0 14px color-mix(in srgb, var(--dialog-accent) 45%, transparent);\n        }\n        .confirm:hover,\n        .confirm:focus-visible {\n          filter: brightness(1.12);\n          outline: none;\n        }\n      </style>\n      <dialog aria-labelledby="confirm-title">\n        <div class="body">\n          <h2 id="confirm-title"></h2>\n          <p></p>\n        </div>\n        <div class="actions">\n          <button type="button" class="cancel">Zrušit</button>\n          <button type="button" class="confirm"></button>\n        </div>\n      </dialog>\n    ',this._dialog=t.querySelector("dialog"),t.querySelector(".cancel").addEventListener("click",()=>this._dialog.close()),t.querySelector(".confirm").addEventListener("click",()=>{this._confirmed=!0,this._dialog.close()}),this._dialog.addEventListener("click",t=>{t.target===this._dialog&&this._dialog.close()}),this._dialog.addEventListener("close",()=>{this._resolve?.(this._confirmed),this.remove()})}show(t){const e=this.shadowRoot;return e.querySelector("h2").textContent=t.title,e.querySelector("p").textContent=t.message,e.querySelector(".confirm").textContent=t.confirmLabel,t.accent&&this.style.setProperty("--dialog-accent",t.accent),this._confirmed=!1,this._dialog.showModal(),new Promise(t=>{this._resolve=t})}}function Et(t){const e=document.createElement(St);return document.body.append(e),e.show(t)}customElements.get(St)||customElements.define(St,Ct);const Pt=r`
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
    display: flex;
    align-items: flex-start;
    min-height: 2.4em;
    padding: 0 12px 4px;
    gap: 12px;
  }

  .header-main {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .title {
    max-width: 100%;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--primary-text-color, #fff);
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

  .phase-name {
    font-size: 11px;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-weight: 600;
    letter-spacing: 0.01em;
    opacity: 0.92;
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

  .shelly-brand {
    fill: rgba(255, 255, 255, 0.78);
    font-size: 20px;
    font-family: 'Segoe Script', 'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', cursive;
    font-style: italic;
    font-weight: 600;
    letter-spacing: 0.01em;
    pointer-events: none;
    user-select: none;
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

  .warn {
    padding: 16px;
    color: var(--error-color, #ff5252);
  }
`,zt={entity:{domain:"sensor"}},Lt={text:{}},Mt=[{name:"name",selector:Lt,custom_label:"Název fáze"},{name:"voltage",selector:zt,custom_label:"Napětí (V)"},{name:"current",selector:zt,custom_label:"Proud (A)"},{name:"power",selector:zt,custom_label:"Výkon (W)"}],Nt=[{name:"title",selector:Lt},{name:"phase_a",type:"expandable",title:"Fáze A (LA / TA)",icon:"mdi:alpha-a-circle",schema:Mt},{name:"phase_b",type:"expandable",title:"Fáze B (LB / TB)",icon:"mdi:alpha-b-circle",schema:Mt},{name:"phase_c",type:"expandable",title:"Fáze C (LC / TC)",icon:"mdi:alpha-c-circle",schema:Mt},{name:"totals",type:"expandable",flatten:!0,title:"Celkové hodnoty (header)",icon:"mdi:sigma",schema:[{name:"total_power",selector:zt,custom_label:"Celkový výkon (W)"},{name:"total_energy",selector:zt,custom_label:"Celková energie (kWh)"}]},{name:"neutral",type:"expandable",flatten:!0,title:"Neutrál (TN)",icon:"mdi:circle-outline",schema:[{name:"neutral_current",selector:zt,custom_label:"Proud neutrálu (A)"}]},{name:"device",type:"expandable",flatten:!0,title:"Zařízení",icon:"mdi:restart",schema:[{name:"wifi_signal",selector:zt,custom_label:"Síla Wi-Fi signálu"},{name:"lan_link_speed",selector:zt,custom_label:"Rychlost LAN linky"},{name:"reset_button",selector:{entity:{domain:"button"}},custom_label:"Reset (button.*)"}]}],Rt={title:"Titulek karty",phase_a:"Fáze A",phase_b:"Fáze B",phase_c:"Fáze C",voltage:"Napětí (V)",current:"Proud (A)",power:"Výkon (W)",name:"Název fáze",total_power:"Celkový výkon (W)",total_energy:"Celková energie (kWh)",neutral_current:"Proud neutrálu (A)",reset_button:"Reset (button.*)",wifi_signal:"Síla Wi-Fi signálu",lan_link_speed:"Rychlost LAN linky"},Tt={title:"Zobrazí se uprostřed nahoře na kartě (např. DUB-1NP-FVE-AC-OUT).",name:"Volitelné — vedle „Napětí“ u LA/LB/LC a nad proudem u TA/TB/TC.",voltage:"Sensor napětí dané fáze ze Shelly Pro 3EM. Bez něj se vstupní linka nezobrazí.",current:"Sensor proudu dané fáze — bez něj (a bez výkonu) se CT clamp (TA/TB/TC) nezobrazí.",power:"Sensor aktivního výkonu dané fáze — stačí i bez proudu pro zobrazení clampu.",total_power:"Volitelné — zobrazí se vpravo nahoře (řádek Výkon).",total_energy:"Volitelné — zobrazí se vpravo nahoře pod výkonem (řádek Energie).",neutral_current:"Volitelné — pokud je vyplněno, zobrazí se CT clamp TN vpravo.",reset_button:"Shelly button entita (typicky …_reset nebo …_restart). Klik na Reset v diagramu nejdřív zobrazí potvrzení, pak zavolá button.press.",wifi_signal:"Typicky sensor …_rssi / …_signal_strength. Když je vyplněno, LED Wi-Fi svítí; při najetí myší se ukáže síla signálu.",lan_link_speed:"Typicky sensor …_link_speed / …_ethernet. Když je vyplněno, LED LAN svítí; při najetí myší se ukáže rychlost linky."};let Yt=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>t.custom_label??Rt[t.name]??t.name,this._computeHelper=t=>Tt[t.name]}setConfig(t){this._config=t}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Nt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._changed}
      ></ha-form>
    `:F``}_changed(t){t.stopPropagation();const e=t.detail.value;this._config=e,kt(this,"config-changed",{config:e})}};Yt.styles=r`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `,t([ft({attribute:!1})],Yt.prototype,"hass",void 0),t([_t()],Yt.prototype,"_config",void 0),Yt=t([dt("shelly-3em-diagram-card-editor")],Yt);const Ot={title:"DUB-1NP-FVE-AC-OUT",phase_a:{voltage:"sensor.dub_1nb_grid_ac_in_phase_a_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_a_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_a_vykon"},phase_b:{voltage:"sensor.dub_1nb_grid_ac_in_phase_b_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_b_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_b_vykon"},phase_c:{voltage:"sensor.dub_1nb_grid_ac_in_phase_c_napeti",current:"sensor.dub_1nb_grid_ac_in_phase_c_proud",power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_c_vykon"},total_power:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_vykon",total_energy:"sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_energie"},Ut={a:"#c4783a",b:"#90a4ae",c:"#b0bec5"},Vt="#42a5f5",Xt=680,jt=600,Ht={x:380,y:24,w:128,h:470},It={leftX:Ht.x+36,rightX:Ht.x+92,cnY:Ht.y+32,abY:Ht.y+82,iaibY:Ht.y+Ht.h-78,icinY:Ht.y+Ht.h-32,tw:42,th:36},Ft=[{key:"c",label:"LC",y:It.cnY,termX:It.leftX,termY:It.cnY},{key:"b",label:"LB",y:It.cnY+36,termX:It.rightX,termY:It.abY},{key:"a",label:"LA",y:It.cnY+72,termX:It.leftX,termY:It.abY}],Wt=340,Dt=[{key:"c",label:"TC",y:Wt,termX:It.leftX,termY:It.icinY,route:"side"},{key:"b",label:"TB",y:Wt,termX:It.rightX,termY:It.iaibY,route:"around-right",busY:530},{key:"a",label:"TA",y:Wt,termX:It.leftX,termY:It.iaibY,route:"side"}],Bt={x:580,y:Wt,termX:It.rightX,termY:It.icinY};let Zt=class extends ct{static getStubConfig(){return{...Ot,phase_a:{...Ot.phase_a},phase_b:{...Ot.phase_b},phase_c:{...Ot.phase_c}}}static async getConfigElement(){return document.createElement("shelly-3em-diagram-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");this._config={...t}}getCardSize(){return 9}getGridOptions(){return{columns:12,rows:7,min_rows:5}}_phase(t){if(this._config)return"a"===t?this._config.phase_a:"b"===t?this._config.phase_b:this._config.phase_c}_filled(t){return"string"==typeof t&&t.trim().length>0}_showPhaseClamp(t){const e=this._phase(t);return this._filled(e?.current)||this._filled(e?.power)}_showPhaseLine(t){return this._filled(this._phase(t)?.voltage)}_layoutPhaseClamps(){const t=Dt.filter(t=>this._showPhaseClamp(t.key)),e=t.length;if(0===e)return[];const i=200-110*(e-1)/2;return t.map((t,e)=>({...t,x:i+110*e}))}_onValueClick(t,e){e.stopPropagation(),At(this,t)}async _onResetClick(t){t.stopPropagation();const e=this._config?.reset_button;if(!this._filled(e)||!this.hass?.callService)return;await Et({title:"Resetovat Shelly Pro 3EM?",message:"Zařízení se restartuje (Shelly Reset). Měření může na chvíli výpadnout. Opravdu pokračovat?",confirmLabel:"Resetovat",accent:"#ff8a65"})&&await this.hass.callService("button","press",{entity_id:e})}render(){if(!this._config)return F`<ha-card><div class="warn">Chybí konfigurace karty.</div></ha-card>`;const t=this._config.title??"Shelly Pro 3EM",e=this._config.total_power?xt($t(this.hass,this._config.total_power)):null,i=this._config.total_energy?(s=$t(this.hass,this._config.total_energy),Number.isFinite(s)?Math.abs(s)>=1e3?`${yt.format(s/1e3)} MWh`:`${mt.format(s)} kWh`:"—"):null;var s;return F`
      <ha-card>
        <div class="header">
          <div class="header-main">
            <div class="title">${t}</div>
          </div>
          ${e||i?F`<div class="totals">
                ${e?F`<button
                      class="value-btn"
                      type="button"
                      @click=${t=>this._onValueClick(this._config.total_power,t)}
                    >
                      <span class="caption">Výkon</span>
                      <span class="num">${e}</span>
                    </button>`:B}
                ${i?F`<button
                      class="value-btn"
                      type="button"
                      @click=${t=>this._onValueClick(this._config.total_energy,t)}
                    >
                      <span class="caption">Energie</span>
                      <span class="num">${i}</span>
                    </button>`:B}
              </div>`:B}
        </div>
        <div class="diagram">${this._renderSvg()}</div>
      </ha-card>
    `}_renderSvg(){const{x:t,y:e,w:i,h:s}=Ht,n=e+116,o=e+s-116,r=e+s-64,a=this._wireEnd(It.rightX,It.cnY,"right"),l=Xt-12,c=a.x+22;return F`
      <svg
        viewBox="0 0 ${Xt} ${jt}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Shelly Pro 3EM diagram"
      >
        ${W`<rect class="meter" x=${t} y=${e} width=${i} height=${s} rx="3" />`}
        <!-- Jen jedna linka nad Power (mezi svorkami A/B/C/N a statusem) -->
        ${W`<line class="meter-div" x1=${t} y1=${n} x2=${t+i} y2=${n} />`}
        ${W`<line class="meter-div" x1=${t} y1=${o} x2=${t+i} y2=${o} />`}
        ${W`<line class="meter-div" x1=${t} y1=${r} x2=${t+i} y2=${r} />`}

        <!-- Horní vodiče až po meteru — viditelné na čele jako IA/IC -->
        ${Ft.filter(t=>this._showPhaseLine(t.key)).map(t=>this._renderPhaseLine(t))}

        <!-- LN — do svorky N; na pravém konci vodiče „Nulový vodič“ -->
        ${W`<path
          class="wire"
          fill="none"
          stroke=${Vt}
          d=${`M ${l} ${It.cnY} L ${a.x} ${a.y}`}
        />`}
        ${W`<text
          class="label"
          x=${c}
          y=${It.cnY-10}
          text-anchor="start"
          fill=${Vt}
        >LN</text>`}
        ${W`<text
          class="phase-name"
          x=${l}
          y=${It.cnY-10}
          text-anchor="end"
          fill=${Vt}
        >Nulový vodič</text>`}

        <!-- Horní svorky až po vodičích -->
        ${this._terminal(It.leftX,It.cnY,"C",Ut.c)}
        ${this._terminal(It.rightX,It.cnY,"N",Vt)}
        ${this._terminal(It.leftX,It.abY,"A",Ut.a)}
        ${this._terminal(It.rightX,It.abY,"B",Ut.b)}

        ${this._renderStatusPanel(t+i/2,n+20)}

        ${this._renderClampRowCaptions()}
        ${this._layoutPhaseClamps().map(t=>this._renderPhaseClamp(t))}
        ${this._renderNeutralClamp()}

        <!-- Spodní svorky až po vodičích — text nepřekryje linka -->
        ${this._terminal(It.leftX,It.iaibY,"IA",Ut.a)}
        ${this._terminal(It.rightX,It.iaibY,"IB",Ut.b)}
        ${this._terminal(It.leftX,It.icinY,"IC",Ut.c)}
        ${this._terminal(It.rightX,It.icinY,"IN",Vt)}
      </svg>
    `}_renderStatusPanel(t,e){const i=function(t){if(t<5)return 0;const e=5-4.35*Math.min(1,t/5e3);return Math.round(2*e)/2}(this._countPowerAbs()),s=i>0?Math.min(.49,.35/i):0,n=this._filled(this._config?.wifi_signal),o=this._filled(this._config?.lan_link_speed),r=[{name:"Power",color:"#ff5252",active:!0},{name:"Wi-Fi",color:"#ffd740",active:n,title:n?`Wi-Fi: ${wt(this.hass,this._config?.wifi_signal)}`:void 0},{name:"LAN",color:"#69f0ae",active:o,title:o?`LAN: ${wt(this.hass,this._config?.lan_link_speed)}`:void 0},{name:"Count",color:"#ff5252",active:i>0,countPulse:i>0}],a=e+32*(r.length-1),l=a+56,c=(a+l)/2+6,h=l+28,d=this._filled(this._config?.reset_button);return W`
      <g class="status-panel">
        ${r.map((n,o)=>{const r=e+32*o-4,a=t+42;return n.countPulse?W`
              <text class="led-label" x=${t-44} y=${e+32*o}>${n.name}</text>
              <circle
                class="led lit led-count"
                cx=${a}
                cy=${r}
                r="6.5"
                fill=${n.color}
                stroke=${n.color}
                opacity="0.08"
              >
                <animate
                  attributeName="opacity"
                  values="1;1;0.08;0.08"
                  keyTimes="0;${s};${s};1"
                  dur="${i}s"
                  repeatCount="indefinite"
                  calcMode="discrete"
                />
              </circle>
            `:n.active?W`
            <text class="led-label" x=${t-44} y=${e+32*o}>${n.name}</text>
            <circle
              class="led lit"
              cx=${a}
              cy=${r}
              r="6.5"
              fill=${n.color}
              stroke=${n.color}
              style=${`--led-glow: ${n.color}`}
            >
              ${n.title?W`<title>${n.title}</title>`:B}
            </circle>
          `:W`
              <text class="led-label dim" x=${t-44} y=${e+32*o}>${n.name}</text>
              <circle class="led off" cx=${a} cy=${r} r="6.5" />
            `})}
        <text class="shelly-brand" x=${t} y=${c} text-anchor="middle">Shelly</text>
        <g
          class="reset-group ${d?"live":""}"
          role=${d?"button":B}
          tabindex=${d?0:B}
          @click=${d?t=>{this._onResetClick(t)}:B}
          @keydown=${d?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._onResetClick(t))}:B}
        >
          <circle class="reset-btn" cx=${t} cy=${h} r=${28} />
          <text class="reset-label" x=${t} y=${h+5} text-anchor="middle">Reset</text>
        </g>
      </g>
    `}_countPowerAbs(){if(this._filled(this._config?.total_power))return Math.abs($t(this.hass,this._config.total_power));let t=0;for(const e of["a","b","c"]){const i=this._phase(e)?.power;this._filled(i)&&(t+=$t(this.hass,i))}return Math.abs(t)}_terminal(t,e,i,s){const{tw:n,th:o}=It;return W`
      <rect
        class="term"
        x=${t-n/2}
        y=${e-o/2}
        width=${n}
        height=${o}
        rx="2"
        stroke=${s}
      />
      <text class="term-label" x=${t} y=${e+5} text-anchor="middle" fill=${s}>${i}</text>
    `}_wireEnd(t,e,i){const{tw:s,th:n}=It;switch(i){case"left":return{x:t-s/2,y:e};case"right":return{x:t+s/2,y:e};case"top":return{x:t,y:e-n/2};case"bottom":return{x:t,y:e+n/2}}}_phaseName(t){const e=this._phase(t)?.name;if("string"!=typeof e)return;const i=e.trim();return i.length>0?i:void 0}_renderPhaseLine(t){const e=this._phase(t.key),i=this._phaseName(t.key),s=function(t){return Number.isFinite(t)?`${mt.format(t)} V`:"—"}($t(this.hass,e?.voltage)),n=Ut[t.key],o=Ht.x-18,r=Ht.x-12,a=(It.leftX+It.rightX)/2;let l;if("c"===t.key){const e=this._wireEnd(t.termX,t.termY,"left");l=`M 14 ${t.y} L ${e.x} ${e.y}`}else if("a"===t.key){const e=this._wireEnd(t.termX,t.termY,"left");l=[`M 14 ${t.y}`,`L ${r} ${t.y}`,`L ${r} ${t.termY}`,`L ${e.x} ${e.y}`].join(" ")}else{const e=this._wireEnd(t.termX,t.termY,"left");l=[`M 14 ${t.y}`,`L ${a} ${t.y}`,`L ${a} ${t.termY}`,`L ${e.x} ${e.y}`].join(" ")}return W`
      <g class="phase-line">
        <path class="wire" fill="none" stroke=${n} d=${l} />
        <text class="caption" x="14" y=${t.y-10}>Napětí</text>
        ${i?W`<text class="phase-name" x="58" y=${t.y-10} fill=${n}>${i}</text>`:B}
        <text
          class="value clickable"
          x=${200}
          y=${t.y-10}
          text-anchor="middle"
          fill=${n}
          @click=${t=>this._onValueClick(e?.voltage,t)}
        >
          ${s}
        </text>
        <text class="label" x=${o} y=${t.y-10} text-anchor="end" fill=${n}>
          ${t.label}
        </text>
      </g>
    `}_renderClampRowCaptions(){return this._layoutPhaseClamps().length>0||this._filled(this._config?.neutral_current)?W`
      <g class="clamp-captions">
        <text class="caption" x="14" y=${268}>Proud</text>
        <text class="caption" x="14" y=${294}>Výkon</text>
      </g>
    `:B}_renderPhaseClamp(t){const e=this._phase(t.key),i=this._phaseName(t.key),s=$t(this.hass,e?.current),n=$t(this.hass,e?.power),o=Ut[t.key],r=t.y+25,a=this._clampWirePath(t.x,r,t.termX,t.termY,t.route,t.busY,"left");return W`
      <g class="phase-clamp">
        <path class="wire" fill="none" stroke=${o} d=${a} />
        ${i?W`<text class="phase-name" x=${t.x} y=${t.y-102} text-anchor="middle" fill=${o}>${i}</text>`:B}
        ${this._filled(e?.current)?W`
              <text
                class="value clickable"
                x=${t.x}
                y=${t.y-72}
                text-anchor="middle"
                fill=${o}
                @click=${t=>this._onValueClick(e?.current,t)}
              >
                ${vt(s)}
              </text>
            `:B}
        ${this._filled(e?.power)?W`
              <text
                class="value clickable"
                x=${t.x}
                y=${t.y-46}
                text-anchor="middle"
                fill=${o}
                @click=${t=>this._onValueClick(e?.power,t)}
              >
                ${xt(n)}
              </text>
            `:B}
        ${this._ctIcon(t.x,t.y,t.label,this._filled(e?.current)?Math.abs(s):0,o,"left")}
      </g>
    `}_clampWirePath(t,e,i,s,n,o,r){if("side"===n){const n=this._wireEnd(i,s,r);return[`M ${t} ${e}`,`L ${t} ${s}`,`L ${n.x} ${n.y}`].join(" ")}const a=o??s+80,l=i+It.tw/2+36,c=this._wireEnd(i,s,"right");return[`M ${t} ${e}`,`L ${t} ${a}`,`L ${l} ${a}`,`L ${l} ${s}`,`L ${c.x} ${c.y}`].join(" ")}_renderNeutralClamp(){const t=this._config?.neutral_current;if(!this._filled(t))return B;const e=$t(this.hass,t),i=Bt.y+25,s=this._clampWirePath(Bt.x,i,Bt.termX,Bt.termY,"side",void 0,"right");return W`
      <g class="neutral-clamp">
        <path class="wire" fill="none" stroke=${Vt} d=${s} />
        <text class="caption" x=${Bt.x} y=${Bt.y-72} text-anchor="middle">Proud</text>
        <text
          class="value clickable"
          x=${Bt.x}
          y=${Bt.y-46}
          text-anchor="middle"
          fill=${Vt}
          @click=${e=>this._onValueClick(t,e)}
        >
          ${vt(e)}
        </text>
        ${this._ctIcon(Bt.x,Bt.y,"TN",Math.abs(e),Vt)}
      </g>
    `}_ctIcon(t,e,i,s,n,o="bottom"){const r=function(t){if(t<.02)return 0;const e=2.8-2.4*Math.min(1,t/32);return Math.round(4*e)/4}(s),a=25,l=15,c=-66*Math.PI/180,h=246*Math.PI/180,d=a+l*Math.cos(c),p=a+l*Math.sin(c),u=a+l*Math.cos(h),f=a+l*Math.sin(h),_=`M ${d.toFixed(2)} ${p.toFixed(2)} A 15 15 0 1 1 ${u.toFixed(2)} ${f.toFixed(2)}`,$="left"===o?W`<text class="label" x=${-6} y=${29} text-anchor="end" fill=${n}>${i}</text>`:W`<text class="label" x=${a} y=${66} text-anchor="middle" fill=${n}>${i}</text>`;return W`
      <g class="ct-clamp" transform="translate(${t-a}, ${e-a})">
        <rect class="ct-body" x="1" y="1" width=${48} height=${48} rx="7" stroke=${n} />
        <path class="ct-ring" fill="none" stroke=${n} d=${_} />
        <circle
          class="ct-dot ${r>0?"pulse":""}"
          cx=${a}
          cy=${a}
          r="3.5"
          fill=${n}
          style=${r>0?`--pulse-dur:${r}s`:""}
        />
        ${$}
      </g>
    `}};Zt.styles=[Pt,r`
      .led-count {
        filter: drop-shadow(0 0 4px #ff5252);
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
    `],t([ft({attribute:!1})],Zt.prototype,"hass",void 0),t([_t()],Zt.prototype,"_config",void 0),Zt=t([dt("shelly-3em-diagram-card")],Zt),window.customCards=window.customCards||[],window.customCards.push({type:"shelly-3em-diagram-card",name:"Shelly 3EM Diagram Card",description:"Live diagram Shelly Pro 3EM — napětí, proud a výkon po fázích.",preview:!0,documentationURL:"https://github.com/elvisek2020/fve-shelly-card"}),console.info("%c SHELLY-3EM-DIAGRAM-CARD %c v0.4.1 ","background:#0f1419;color:#4fc3f7;font-weight:bold","background:#4fc3f7;color:#0f1419;font-weight:bold");const qt={entity:{domain:"sensor"}},Kt={text:{}},Gt=[{name:"entity",selector:{entity:{domain:"binary_sensor"}},custom_label:"Stav vstupu",custom_helper:"Typicky binary_sensor …_vstup_0 (SW1) nebo …_vstup_1 (SW2). Bez něj se vstup nezobrazí."},{name:"name",selector:Kt,custom_label:"Název vstupu",custom_helper:"Volitelné — např. Vypínač u dveří."}],Jt=[{name:"title",selector:Kt},{name:"output",type:"expandable",flatten:!0,expanded:!0,title:"Výstup relé (I / O)",icon:"mdi:electric-switch",schema:[{name:"switch",required:!0,selector:{entity:{domain:["switch","light","input_boolean"]}}},{name:"name",selector:Kt},{name:"confirm",selector:{boolean:{}}}]},{name:"input_1",type:"expandable",title:"Vstup SW1",icon:"mdi:numeric-1-box-outline",schema:Gt},{name:"input_2",type:"expandable",title:"Vstup SW2",icon:"mdi:numeric-2-box-outline",schema:Gt},{name:"device",type:"expandable",flatten:!0,title:"Zařízení",icon:"mdi:restart",schema:[{name:"temperature",selector:qt},{name:"firmware_update",selector:{entity:{domain:"update"}}},{name:"wifi_signal",selector:qt},{name:"lan_link_speed",selector:qt},{name:"reset_button",selector:{entity:{domain:"button"}}}]}],Qt={title:"Titulek karty",switch:"Výstup (switch.*)",name:"Název zátěže",confirm:"Potvrzovat přepnutí",temperature:"Teplota zařízení",firmware_update:"Firmware (update.*)",wifi_signal:"Síla Wi-Fi signálu",lan_link_speed:"Rychlost LAN linky",reset_button:"Restart (button.*)"},te={title:"Zobrazí se uprostřed nahoře na kartě. Bez něj se použije název entity výstupu.",switch:"Relé Shelly Pro 1 (typicky switch.<zařízení>). Klik na tlačítko nebo kontakt ho přepne.",name:"Volitelné — co je na výstupu O připojené (např. Čerpadlo).",confirm:"Před zapnutím i vypnutím se zobrazí potvrzovací dialog.",temperature:"Volitelné — typicky sensor …_teplota (v HA bývá vypnutý, zapni ho v nastavení entity).",firmware_update:"Volitelné — když je dostupná nová verze, ukáže se v headeru.",wifi_signal:"Volitelné — typicky sensor …_sila_signalu. LED Wi-Fi svítí, hover ukáže sílu.",lan_link_speed:"Volitelné — rychlost LAN linky. LED LAN svítí, hover ukáže rychlost.",reset_button:"Shelly button entita (typicky …_restartovat). Klik na Reset nejdřív zobrazí potvrzení, pak zavolá button.press."};let ee=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>t.custom_label??Qt[t.name]??t.name,this._computeHelper=t=>t.custom_helper??te[t.name]}setConfig(t){this._config=t}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Jt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._changed}
      ></ha-form>
    `:F``}_changed(t){t.stopPropagation();const e=t.detail.value;this._config=e,kt(this,"config-changed",{config:e})}};ee.styles=r`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `,t([ft({attribute:!1})],ee.prototype,"hass",void 0),t([_t()],ee.prototype,"_config",void 0),ee=t([dt("shelly-pro1-diagram-card-editor")],ee);const ie={title:"DUB-0ZD-FVE-AC-IN",switch:"switch.dub_0zd_fve_ac_in",input_1:{entity:"binary_sensor.dub_0zd_fve_ac_in_vstup_0"},input_2:{entity:"binary_sensor.dub_0zd_fve_ac_in_vstup_1"},firmware_update:"update.dub_0zd_fve_ac_in_firmware",reset_button:"button.dub_0zd_fve_ac_in_restartovat"},se="#c4783a",ne="#42a5f5",oe="#69f0ae",re="rgba(255, 255, 255, 0.26)",ae=680,le=520,ce={x:380,y:24,w:128,h:470},he={leftX:ce.x+36,rightX:ce.x+92,topY:ce.y+32,inY:ce.y+82,ioY:ce.y+ce.h-32,tw:42,th:36},de=ce.y+ce.h-82,pe={x:190,y:290,r:52},ue={x:600,y:300,r:22},fe=[{key:"input_1",label:"SW1",y:he.topY+36,termX:he.rightX},{key:"input_2",label:"SW2",y:he.topY+72,termX:he.leftX}];let _e=class extends ct{static getStubConfig(){return{...ie,input_1:{...ie.input_1},input_2:{...ie.input_2}}}static async getConfigElement(){return document.createElement("shelly-pro1-diagram-card-editor")}setConfig(t){if(!t)throw new Error("Missing configuration");this._config={...t}}getCardSize(){return 8}getGridOptions(){return{columns:12,rows:6,min_rows:4}}disconnectedCallback(){super.disconnectedCallback(),this._clearPending()}updated(){this._pending&&this._switchState()===this._pending&&this._clearPending()}_filled(t){return"string"==typeof t&&t.trim().length>0}_switchState(){const t=this._config?.switch;return this._filled(t)?this.hass?.states[t]?.state:void 0}_outputState(){if(this._pending)return"pending";const t=this._switchState();return"on"===t||"off"===t?t:"unavailable"}_input(t){return this._config?.[t]}_clearPending(){this._pendingTimer&&window.clearTimeout(this._pendingTimer),this._pendingTimer=void 0,this._pending=void 0}_loadName(){const t=this._config?.name?.trim();return t||void 0}_onValueClick(t,e){e.stopPropagation(),At(this,t)}_onKey(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e(t))}async _onToggle(t){t.stopPropagation();const e=this._config?.switch;if(!this._filled(e)||!this.hass?.callService||this._pending)return;const i=this._switchState();if("on"!==i&&"off"!==i)return;const s="on"===i?"off":"on";if(this._config?.confirm){const t=this._loadName()??"výstup";if(!await Et({title:"on"===s?`Zapnout ${t}?`:`Vypnout ${t}?`,message:"on"===s?"Relé Shelly Pro 1 sepne a zátěž na výstupu O dostane napětí.":"Relé Shelly Pro 1 rozepne a zátěž na výstupu O přijde o napětí.",confirmLabel:"on"===s?"Zapnout":"Vypnout",accent:"on"===s?oe:"#ff8a65"}))return}this._pending=s,this._pendingTimer=window.setTimeout(()=>this._clearPending(),8e3);const n=e.split(".")[0];try{await this.hass.callService(n,"on"===s?"turn_on":"turn_off",{entity_id:e})}catch(t){throw this._clearPending(),t}}async _onResetClick(t){t.stopPropagation();const e=this._config?.reset_button;if(!this._filled(e)||!this.hass?.callService)return;await Et({title:"Restartovat Shelly Pro 1?",message:"Zařízení se restartuje. Relé se po startu vrátí do stavu podle nastavení Shelly. Opravdu pokračovat?",confirmLabel:"Restartovat",accent:"#ff8a65"})&&await this.hass.callService("button","press",{entity_id:e})}render(){if(!this._config)return F`<ha-card><div class="warn">Chybí konfigurace karty.</div></ha-card>`;if(!this._filled(this._config.switch))return F`<ha-card><div class="warn">Vyplň entitu výstupu (switch).</div></ha-card>`;const t=this.hass?.states[this._config.switch],e=this._config.title??t?.attributes.friendly_name??"Shelly Pro 1",i=this._filled(this._config.temperature)?wt(this.hass,this._config.temperature):null,s=this._config.firmware_update,n=this._filled(s)&&"on"===this.hass?.states[s]?.state;return F`
      <ha-card>
        <div class="header">
          <div class="header-main">
            <div class="title">${e}</div>
          </div>
          ${i||n?F`<div class="totals">
                ${i?F`<button
                      class="value-btn"
                      type="button"
                      @click=${t=>this._onValueClick(this._config.temperature,t)}
                    >
                      <span class="caption">Teplota</span>
                      <span class="num">${i}</span>
                    </button>`:B}
                ${n?F`<button
                      class="value-btn"
                      type="button"
                      @click=${t=>this._onValueClick(s,t)}
                    >
                      <span class="caption">Firmware</span>
                      <span class="num fw">Aktualizace</span>
                    </button>`:B}
              </div>`:B}
        </div>
        <div class="diagram">${this._renderSvg()}</div>
      </ha-card>
    `}_renderSvg(){const{x:t,y:e,w:i,h:s}=ce,n=e+116,o=e+s-116,r=this._outputState(),a="on"===r||"pending"===r&&"on"===this._pending;return F`
      <svg
        viewBox="0 0 ${ae} ${le}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Shelly Pro 1 diagram"
      >
        ${W`<rect class="meter" x=${t} y=${e} width=${i} height=${s} rx="3" />`}
        ${W`<line class="meter-div" x1=${t} y1=${n} x2=${t+i} y2=${n} />`}
        ${W`<line class="meter-div" x1=${t} y1=${o} x2=${t+i} y2=${o} />`}

        ${this._renderSupply()}
        ${fe.map(t=>this._renderInputLine(t))}
        ${this._renderOutputWires(a)}
        ${this._renderToggle(r)}
        ${this._renderLoad(a)}
        ${this._renderContact(a,r)}

        ${this._renderStatusPanel(t+i/2,n+20,r)}

        <!-- Svorky až po vodičích — text nepřekryje linka -->
        ${this._terminal(he.leftX,he.topY,"L",se)}
        ${this._terminal(he.rightX,he.topY,"N",ne)}
        ${this._terminal(he.leftX,he.inY,"SW2",this._inputColor("input_2"))}
        ${this._terminal(he.rightX,he.inY,"SW1",this._inputColor("input_1"))}
        ${this._terminal(he.leftX,he.ioY,"I",se)}
        ${this._terminal(he.rightX,he.ioY,"O",a?se:re)}
      </svg>
    `}_renderSupply(){const t=this._wireEnd(he.leftX,he.topY,"left"),e=this._wireEnd(he.rightX,he.topY,"right"),i=ae-12,s=he.topY-10;return W`
      <g class="supply">
        <path class="wire" stroke=${se} d=${`M 14 ${he.topY} L ${t.x} ${t.y}`} />
        <text class="caption" x="14" y=${s}>Napájení</text>
        <text class="label" x=${ce.x-18} y=${s} text-anchor="end" fill=${se}>L</text>
        <path class="wire" stroke=${ne} d=${`M ${i} ${he.topY} L ${e.x} ${e.y}`} />
        <text class="label" x=${e.x+22} y=${s} fill=${ne}>N</text>
        <text class="phase-name" x=${i} y=${s} text-anchor="end" fill=${ne}>
          Nulový vodič
        </text>
      </g>
    `}_inputOn(t){const e=this._input(t)?.entity;return this._filled(e)&&"on"===this.hass?.states[e]?.state}_inputColor(t){return this._filled(this._input(t)?.entity)?this._inputOn(t)?"#ffd740":"rgba(255, 255, 255, 0.55)":re}_renderInputLine(t){const e=this._input(t.key);if(!this._filled(e?.entity))return B;const i=e.entity,s=this.hass?.states[i]?.state,n="on"===s,o=this._inputColor(t.key),r=n?"Zapnuto":"off"===s?"Vypnuto":"—",a=this._wireEnd(t.termX,he.inY,"left"),l=(he.leftX+he.rightX)/2,c=ce.x-12,h=t.termX===he.rightX?l:c,d=[`M 14 ${t.y}`,`L ${h} ${t.y}`,`L ${h} ${he.inY}`,`L ${a.x} ${a.y}`].join(" "),p=e?.name?.trim();return W`
      <g class="input-line">
        <path class="wire" stroke=${o} d=${d} />
        <text class="caption" x="14" y=${t.y-10}>Vstup</text>
        ${p?W`<text class="phase-name" x="50" y=${t.y-10} fill=${o}>${p}</text>`:B}
        <text
          class="value clickable"
          x="200"
          y=${t.y-10}
          text-anchor="middle"
          fill=${o}
          @click=${t=>this._onValueClick(i,t)}
        >
          ${r}
        </text>
        <text class="label" x=${ce.x-18} y=${t.y-10} text-anchor="end" fill=${o}>
          ${t.label}
        </text>
      </g>
    `}_renderOutputWires(t){const e=this._wireEnd(he.leftX,he.ioY,"left"),i=this._wireEnd(he.rightX,he.ioY,"right"),s=he.ioY-10,n=[`M ${i.x} ${i.y}`,`L ${ue.x} ${he.ioY}`,`L ${ue.x} ${ue.y+ue.r}`].join(" "),o=t?se:re;return W`
      <g class="output-wires">
        <path class="wire" stroke=${se} d=${`M 14 ${he.ioY} L ${e.x} ${e.y}`} />
        <text class="caption" x="14" y=${s}>Přívod kontaktu</text>
        <text class="label" x=${ce.x-18} y=${s} text-anchor="end" fill=${se}>I</text>
        <path class="wire ${t?"":"off"}" stroke=${o} d=${n} />
        ${t?W`<path class="wire flow" stroke=${oe} d=${n} />`:B}
        <text class="label" x=${i.x+22} y=${s} fill=${o}>O</text>
      </g>
    `}_renderToggle(t){const{x:e,y:i,r:s}=pe,n="unavailable"!==t,o="on"===t,r="on"===t?"Zapnuto":"off"===t?"Vypnuto":"pending"===t?"on"===this._pending?"Zapínám…":"Vypínám…":"Nedostupné",a=20,l=-55*Math.PI/180,c=235*Math.PI/180,h=`M ${(e+a*Math.cos(l)).toFixed(2)} ${(i+a*Math.sin(l)).toFixed(2)} A 20 20 0 1 1 ${(e+a*Math.cos(c)).toFixed(2)} ${(i+a*Math.sin(c)).toFixed(2)}`,d=t=>{this._onToggle(t)};return W`
      <g
        class="toggle ${t}"
        role=${n?"switch":B}
        aria-checked=${n?String(o):B}
        aria-label=${this._loadName()??"Výstup"}
        tabindex=${n?0:B}
        @click=${n?d:B}
        @keydown=${n?t=>this._onKey(t,d):B}
      >
        <text class="caption" x=${e} y=${i-s-18} text-anchor="middle">Výstup relé</text>
        <circle class="toggle-ring" cx=${e} cy=${i} r=${s} />
        <circle class="toggle-core" cx=${e} cy=${i} r=${s-10} />
        <path class="toggle-icon" d=${h} />
        <line class="toggle-icon" x1=${e} y1=${i-a-6} x2=${e} y2=${i-4} />
        <text class="toggle-state" x=${e} y=${i+s+28} text-anchor="middle">${r}</text>
      </g>
    `}_renderLoad(t){const{x:e,y:i,r:s}=ue,n=s*Math.SQRT1_2,o=t?oe:re,r=this._loadName();return W`
      <g
        class="load ${t?"on":""}"
        style=${`--load-color: ${o}`}
        @click=${t=>this._onValueClick(this._config?.switch,t)}
      >
        <text class="caption" x=${e} y=${i-s-(r?34:14)} text-anchor="middle">Zátěž</text>
        ${r?W`<text class="phase-name" x=${e} y=${i-s-14} text-anchor="middle" fill=${o}>${r}</text>`:B}
        <circle class="load-body" cx=${e} cy=${i} r=${s} stroke=${o} />
        <path
          class="load-x"
          stroke=${o}
          d=${`M ${e-n} ${i-n} L ${e+n} ${i+n} M ${e+n} ${i-n} L ${e-n} ${i+n}`}
        />
      </g>
    `}_renderContact(t,e){const i=he.ioY-he.th/2,s=he.leftX,n=he.rightX,o=t?{x:n,y:de}:{x:n-8,y:de-22},r="unavailable"!==e;return W`
      <g
        class="contact ${r?"live":""} ${"pending"===e?"pending":""}"
        @click=${r?t=>{this._onToggle(t)}:B}
      >
        <rect class="contact-hit" x=${s-20} y=${de-34} width=${n-s+40} height=${i-de+34} />
        <path class="wire" stroke=${se} d=${`M ${s} ${i} L ${s} ${de}`} />
        <path class="wire" stroke=${t?se:re} d=${`M ${n} ${i} L ${n} ${de}`} />
        <line class="contact-blade" x1=${s} y1=${de} x2=${o.x} y2=${o.y} stroke=${t?se:"rgba(255, 255, 255, 0.6)"} />
        <circle class="contact-pivot" cx=${s} cy=${de} r="3.5" fill=${se} />
        <circle class="contact-pivot" cx=${n} cy=${de} r="3" fill=${t?se:re} />
        <text class="caption" x=${(s+n)/2} y=${de+22} text-anchor="middle">Relé</text>
      </g>
    `}_renderStatusPanel(t,e,i){const s="unavailable"!==i,n=this._filled(this._config?.wifi_signal),o=this._filled(this._config?.lan_link_speed),r=[{name:"Power",color:"#ff5252",active:s},{name:"Out",color:oe,active:"on"===i,title:"on"===i?"Výstup zapnutý":void 0},{name:"Wi-Fi",color:"#ffd740",active:n,title:n?`Wi-Fi: ${wt(this.hass,this._config?.wifi_signal)}`:void 0},{name:"LAN",color:"#69f0ae",active:o,title:o?`LAN: ${wt(this.hass,this._config?.lan_link_speed)}`:void 0}],a=e+32*(r.length-1),l=a+56,c=(a+l)/2+6,h=l+28,d=this._filled(this._config?.reset_button),p=t=>{this._onResetClick(t)};return W`
      <g class="status-panel">
        ${r.map((i,s)=>{const n=e+32*s,o=n-4,r=t+42;return i.active?W`
            <text class="led-label" x=${t-44} y=${n}>${i.name}</text>
            <circle
              class="led lit"
              cx=${r}
              cy=${o}
              r="6.5"
              fill=${i.color}
              stroke=${i.color}
              style=${`--led-glow: ${i.color}`}
            >
              ${i.title?W`<title>${i.title}</title>`:B}
            </circle>
          `:W`
              <text class="led-label dim" x=${t-44} y=${n}>${i.name}</text>
              <circle class="led off" cx=${r} cy=${o} r="6.5" />
            `})}
        <text class="shelly-brand" x=${t} y=${c} text-anchor="middle">Shelly</text>
        <g
          class="reset-group ${d?"live":""}"
          role=${d?"button":B}
          tabindex=${d?0:B}
          @click=${d?p:B}
          @keydown=${d?t=>this._onKey(t,p):B}
        >
          <circle class="reset-btn" cx=${t} cy=${h} r=${28} />
          <text class="reset-label" x=${t} y=${h+5} text-anchor="middle">Reset</text>
        </g>
      </g>
    `}_terminal(t,e,i,s){const{tw:n,th:o}=he;return W`
      <rect class="term" x=${t-n/2} y=${e-o/2} width=${n} height=${o} rx="2" stroke=${s} />
      <text class="term-label" x=${t} y=${e+5} text-anchor="middle" fill=${s}>${i}</text>
    `}_wireEnd(t,e,i){const s=he.tw/2;return{x:"left"===i?t-s:t+s,y:e}}};_e.styles=[Pt,r`
      .wire.off {
        stroke-dasharray: 4 5;
      }

      .wire.flow {
        stroke-dasharray: 5 13;
        stroke-linecap: round;
        animation: wire-flow 1.1s linear infinite;
        filter: drop-shadow(0 0 3px #69f0ae);
      }

      @keyframes wire-flow {
        to {
          stroke-dashoffset: -18;
        }
      }

      .num.fw {
        color: #ffd740;
      }

      .toggle {
        outline: none;
      }

      .toggle.on,
      .toggle.off {
        cursor: pointer;
      }

      .toggle-ring {
        fill: transparent;
        stroke: rgba(255, 255, 255, 0.22);
        stroke-width: 2;
        pointer-events: all;
        transition: stroke 0.25s ease;
      }

      .toggle-core {
        fill: rgba(30, 136, 229, 0.08);
        stroke: var(--shelly-blue);
        stroke-width: 1.6;
        transition:
          fill 0.25s ease,
          stroke 0.25s ease;
      }

      .toggle-icon {
        fill: none;
        stroke: rgba(255, 255, 255, 0.55);
        stroke-width: 3.2;
        stroke-linecap: round;
        pointer-events: none;
        transition: stroke 0.25s ease;
      }

      .toggle-state {
        fill: rgba(255, 255, 255, 0.6);
        font-size: 15px;
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        font-weight: 650;
        letter-spacing: 0.02em;
      }

      .toggle.on .toggle-ring {
        stroke: #69f0ae;
        filter: drop-shadow(0 0 8px rgba(105, 240, 174, 0.55));
      }

      .toggle.on .toggle-core {
        fill: rgba(105, 240, 174, 0.14);
        stroke: #69f0ae;
      }

      .toggle.on .toggle-icon {
        stroke: #69f0ae;
      }

      .toggle.on .toggle-state {
        fill: #69f0ae;
      }

      .toggle.pending .toggle-ring {
        stroke: var(--diagram-accent);
        stroke-dasharray: 10 8;
        animation: toggle-spin 1.2s linear infinite;
        transform-origin: center;
        transform-box: fill-box;
      }

      .toggle.pending .toggle-state {
        fill: var(--diagram-accent);
      }

      .toggle.unavailable {
        opacity: 0.45;
      }

      .toggle.off:hover .toggle-core,
      .toggle.off:focus-visible .toggle-core {
        stroke: var(--diagram-accent);
        fill: rgba(79, 195, 247, 0.12);
      }

      .toggle.on:hover .toggle-core,
      .toggle.on:focus-visible .toggle-core {
        fill: rgba(105, 240, 174, 0.24);
      }

      @keyframes toggle-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .load {
        cursor: pointer;
      }

      .load-body {
        fill: rgba(15, 20, 25, 0.92);
        stroke-width: 2;
      }

      .load-x {
        stroke-width: 2;
        stroke-linecap: round;
      }

      .load.on .load-body {
        fill: rgba(105, 240, 174, 0.12);
        filter: drop-shadow(0 0 8px var(--load-color));
      }

      .contact-hit {
        fill: transparent;
      }

      .contact.live {
        cursor: pointer;
      }

      .contact-blade {
        stroke-width: 3;
        stroke-linecap: round;
        transition: all 0.2s ease;
      }

      .contact.live:hover .contact-blade {
        filter: drop-shadow(0 0 4px #4fc3f7);
      }

      .contact.pending .contact-blade {
        animation: contact-blink 0.6s ease-in-out infinite alternate;
      }

      @keyframes contact-blink {
        to {
          opacity: 0.35;
        }
      }
    `],t([ft({attribute:!1})],_e.prototype,"hass",void 0),t([_t()],_e.prototype,"_config",void 0),t([_t()],_e.prototype,"_pending",void 0),_e=t([dt("shelly-pro1-diagram-card")],_e),window.customCards=window.customCards||[],window.customCards.push({type:"shelly-pro1-diagram-card",name:"Shelly Pro 1 Diagram Card",description:"Diagram Shelly Pro 1 — ovládání relé, stav vstupů SW1/SW2 a restart.",preview:!0,documentationURL:"https://github.com/elvisek2020/fve-shelly-card"}),console.info("%c SHELLY-PRO1-DIAGRAM-CARD %c v0.4.1 ","background:#0f1419;color:#69f0ae;font-weight:bold","background:#69f0ae;color:#0f1419;font-weight:bold");
