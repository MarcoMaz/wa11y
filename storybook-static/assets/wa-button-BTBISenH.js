import{s as u,x as b}from"./lit-element-DP4StiEM.js";import{n as i,t as c}from"./property-8mcyX-AS.js";var d=Object.defineProperty,h=Object.getOwnPropertyDescriptor,s=(e,l,n,o)=>{for(var t=o>1?void 0:o?h(l,n):l,p=e.length-1,a;p>=0;p--)(a=e[p])&&(t=(o?a(l,n,t):a(t))||t);return o&&t&&d(l,n,t),t};let r=class extends u{constructor(){super(...arguments),this.disabled=!1,this.type="button"}handleClick(){this.dispatchEvent(new CustomEvent("onClick"))}createRenderRoot(){return this}render(){const e=this.label||"default button label";return b`
      <button
        ?disabled="${this.disabled}"
        type="${this.type}"
        .label=${e}
        @click="${this.handleClick}"
      >
        ${e}
      </button>
    `}};s([i({type:Boolean,reflect:!0})],r.prototype,"disabled",2);s([i({type:String})],r.prototype,"type",2);s([i({type:String,reflect:!0})],r.prototype,"label",2);r=s([c("wa-button")],r);
