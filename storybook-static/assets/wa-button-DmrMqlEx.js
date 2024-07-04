import{s as p,x as d}from"./lit-element-DP4StiEM.js";import{n as c,t as b}from"./property-8mcyX-AS.js";var u=Object.defineProperty,h=Object.getOwnPropertyDescriptor,s=(e,n,o,r)=>{for(var t=r>1?void 0:r?h(n,o):n,a=e.length-1,i;a>=0;a--)(i=e[a])&&(t=(r?i(n,o,t):i(t))||t);return r&&t&&u(n,o,t),t};let l=class extends p{constructor(){super(...arguments),this.disabled=!1,this.type="button"}handleClick(){this.dispatchEvent(new CustomEvent("onClick"))}connectedCallback(){super.connectedCallback(),this.addEventListener("onClick",this.handleClick)}disconnectedCallback(){this.removeEventListener("onClick",this.handleClick),super.disconnectedCallback()}render(){const e=this.label||"default button label";return d`
      <button
        ?disabled="${this.disabled}"
        type="${this.type}"
        .label=${e}
        @click="${this.handleClick}"
        part="button"
      >
        ${e}
      </button>
    `}};s([c({type:Boolean,reflect:!0})],l.prototype,"disabled",2);s([c({type:String})],l.prototype,"type",2);s([c({type:String,reflect:!0})],l.prototype,"label",2);l=s([b("wa-button")],l);
