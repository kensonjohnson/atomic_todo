"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[639],{645:()=>{function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function t(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}var n=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")},e.exports=t.default}));const i=e(t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){(0,o.default)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===d(e)&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))};var i,o=(i=n)&&i.__esModule?i:{default:i};function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}e.exports=t.default})));let o;const d=new Uint8Array(16);function c(){if(!o&&(o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!o))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(d)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));var r={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function a(e,t,n){if(r.randomUUID&&!t&&!e)return r.randomUUID();const i=(e=e||{}).random||(e.rng||c)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=i[e];return t}return function(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}(i)}class l{constructor(e="New Item"){this._id=a(),this._dateCreated=new Date,this.description="Click to add description",this.priority=1,this.completed=!1,this.open=!1,this.title=e}get dateCreated(){return i(this._dateCreated)}get id(){return this._id}}const u=document.querySelector("[data-list-items]"),p=document.querySelector("[data-list-title]"),m=document.querySelector("[data-delete-list]");function f(e){u.innerHTML="";const t=e.list;t.size>0&&t.forEach((e=>{y(e,t)})),p.innerText=e.name}function y(e,t){const n=document.createElement("div");n.classList.add("list-item"),n.setAttribute("id",e.id),u.appendChild(n);const i=document.createElement("div");i.classList.add("list-item-title"),n.appendChild(i);const o=document.createElement("input");o.type="checkbox",o.checked=e.completed,i.appendChild(o);const d=document.createElement("span");d.classList.add("custom-checkbox"),d.addEventListener("click",(()=>{o.checked=!o.checked,c.classList.toggle("completed"),o.checked?e.completed=!0:e.completed=!1})),i.appendChild(d);const c=document.createElement("label");c.classList.add("list-item-label","clickable"),e.completed&&c.classList.add("completed"),c.onclick=()=>{"list-item-label clickable"===c.className&&(c.contentEditable="true","New Item"===c.innerText&&(c.innerText=""),c.focus()),c.onblur=()=>{c.contentEditable="false",""===c.innerText&&(c.innerText="New Item"),e.title=c.innerText}},i.appendChild(c);const s=document.createTextNode(e.title);c.appendChild(s);const r=document.createElement("div");r.classList.add("list-item-icon"),e.open&&r.classList.add("expanded"),r.setAttribute("tabindex","0"),r.addEventListener("click",(t=>{e.open=!e.open,e.open?(r.classList.add("expanded"),a.classList.add("show"),c.classList.add("clickable")):(r.classList.remove("expanded"),a.classList.remove("show"),c.classList.remove("clickable")),l.blur()})),i.appendChild(r);const a=document.createElement("div");a.classList.add("expanded-list-content"),e.open&&a.classList.add("show"),n.appendChild(a);const l=document.createElement("div");l.classList.add("list-item-description"),l.innerHTML=e.description,l.onclick=()=>{l.contentEditable="true","Click to add description"===l.innerText&&(l.innerText=""),l.focus()},l.onblur=()=>{l.contentEditable="false",""===l.innerText&&(l.innerText="Click to add description"),e.description=l.innerText},a.appendChild(l);const p=document.createElement("div");p.classList.add("list-item-actions"),a.appendChild(p);const m=document.createElement("button");m.classList.add("list-item-delete-button"),m.onclick=()=>{t.delete(e.id),u.removeChild(n)},p.appendChild(m);const f=document.createElement("div");function y(){f.classList.value="list-item-flag",0===e.priority&&f.classList.add("flag-low-priority"),1===e.priority&&f.classList.add("flag-normal-priority"),2===e.priority&&f.classList.add("flag-high-priority")}f.classList.add("list-item-flag"),y(),f.setAttribute("tabindex","0"),p.appendChild(f);const h=document.createElement("select");h.name=e.id+"-select",h.onchange=()=>{e.priority=parseInt(h.value),y()};const b=document.createElement("option");b.value="0",0===e.priority&&(b.selected=!0),b.innerText="Low",h.add(b);const g=document.createElement("option");g.value="1",1===e.priority&&(g.selected=!0),g.innerText="Normal",h.add(g);const v=document.createElement("option");v.value="2",2===e.priority&&(v.selected=!0),v.innerText="High",h.add(v),f.appendChild(h)}const h=[];let b=new Map;const g=document.querySelector("[data-list-group-container]"),v=document.querySelector("[data-add-list-input]"),L=document.querySelector("[data-add-list]"),E=document.querySelector("[data-add-list-item-input]"),w=document.querySelector("[data-add-list-item-button]"),x=document.querySelector("[data-clear-tasks]"),k=document.querySelector("[data-delete-list]");function S(e="New List"){const t={id:a(),name:e,list:new Map};h.push(t);const n=function(e){document.querySelectorAll(".group-item").forEach((e=>{e.classList.remove("active-group-item")}));const t=document.createElement("div");return t.classList.add("group-item","active-group-item"),t.setAttribute("tabindex","0"),t.innerText=e.name,t.id=e.id,m.setAttribute("data-delete-list",t.id),f(e),t}(t);n.addEventListener("click",(()=>{var e;e=t,document.querySelectorAll(".group-item").forEach((t=>{t.classList.remove("active-group-item"),t.id===e.id&&t.classList.add("active-group-item")})),f(e),m.setAttribute("data-delete-list",e.id),b=t.list})),g.appendChild(n),k.setAttribute("data-delete-list",t.id),b=t.list,f(t)}if(L.addEventListener("click",(e=>{e.preventDefault(),""===v.value?S():(S(v.value),v.value="")})),k.addEventListener("click",(e=>{if(confirm("Are you sure?\nThis action cannot be undone.")){const e=k.dataset.deleteList;console.log(e),function(e){u.innerHTML="",e&&document.getElementById(e)?.remove()}(e);const t=h.findIndex((t=>t.id===e));t>=0&&t<h.length&&h.splice(t,1)}if(0===h.length)S();else{const e=h[0];f(e),k.setAttribute("data-delete-list",e.id)}})),w.addEventListener("click",(e=>{e.preventDefault();const t=E.value;E.value="";const n=""===t?new l:new l(t);y(n,b),b.set(n.id,n)})),x.addEventListener("click",(()=>{b.forEach((e=>{!function(e){if(e.completed){const t=document.getElementById(e.id);u.removeChild(t)}}(e),b.delete(e.id)}))})),0===h.length){S("Grocery List");const e=new l("Eggs");b.set(e.id,e);const t=new l("Sprite");t.completed=!0,b.set(t.id,t);const n=new l("Steak");n.open=!0,b.set(n.id,n),f(h[0])}}},e=>{e(e.s=645)}]);
//# sourceMappingURL=index.index.js.map