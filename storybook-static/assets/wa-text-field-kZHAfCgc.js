import{s as u,x as d}from"./lit-element-DP4StiEM.js";import{n as c,t as h}from"./property-8mcyX-AS.js";import{o as i}from"./if-defined-BovDaYmS.js";var f=Object.defineProperty,m=Object.getOwnPropertyDescriptor,o=(r,t,a,n)=>{for(var e=n>1?void 0:n?m(t,a):t,p=r.length-1,s;p>=0;p--)(s=r[p])&&(e=(n?s(t,a,e):s(e))||e);return n&&e&&f(t,a,e),e};let l=class extends u{constructor(){super(...arguments),this.required=!1}handleChange(r){const t=r.target;this.dispatchEvent(new CustomEvent("change",{detail:{value:t.value}}))}createRenderRoot(){return this}render(){const r=this.currentId||"default-id",t=this.name||"default-name",a=this.label||"Default label",n=this.placeholder||"Search for the docs...",e=this.label?void 0:a;return d`
      <label for="${r}">${a}</label>
      <input
        type="text"
        placeholder="${i(n)}"
        id="${i(r)}"
        name="${i(t)}"
        ?required="${this.required}"
        @change="${this.handleChange}"
        aria-label="${i(e)}"
      />
    `}};o([c({type:String,reflect:!0})],l.prototype,"currentId",2);o([c({type:String,reflect:!0})],l.prototype,"name",2);o([c({type:String,reflect:!0})],l.prototype,"label",2);o([c({type:String,reflect:!0})],l.prototype,"placeholder",2);o([c({type:Boolean,reflect:!0})],l.prototype,"required",2);l=o([h("wa-text-field")],l);
