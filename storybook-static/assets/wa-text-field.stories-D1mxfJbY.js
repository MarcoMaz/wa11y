import{s as N,x as O}from"./lit-element-DP4StiEM.js";import{n,t as j}from"./property-8mcyX-AS.js";import{o as c}from"./if-defined-BovDaYmS.js";var R=Object.defineProperty,A=Object.getOwnPropertyDescriptor,s=(r,t,a,o)=>{for(var e=o>1?void 0:o?A(t,a):t,x=r.length-1,g;x>=0;x--)(g=r[x])&&(e=(o?g(t,a,e):g(e))||e);return o&&e&&R(t,a,e),e};let l=class extends N{constructor(){super(...arguments),this.required=!1}handleChange(r){const t=r.target;this.dispatchEvent(new CustomEvent("change",{detail:{value:t.value}}))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.handleChange)}disconnectedCallback(){this.removeEventListener("change",this.handleChange),super.disconnectedCallback()}render(){const r=this.currentId||"default-id",t=this.name||"default-name",a=this.label||"Default label",o=this.placeholder||"Search for the docs...",e=this.label?void 0:a;return O`
      <label for="${r}" part="label">${a}</label>
      <input
        type="text"
        placeholder="${c(o)}"
        id="${c(r)}"
        name="${c(t)}"
        ?required="${this.required}"
        @change="${this.handleChange}"
        aria-label="${c(e)}"
        part="input"
      />
    `}};s([n({type:String,reflect:!0})],l.prototype,"currentId",2);s([n({type:String,reflect:!0})],l.prototype,"name",2);s([n({type:String,reflect:!0})],l.prototype,"label",2);s([n({type:String,reflect:!0})],l.prototype,"placeholder",2);s([n({type:Boolean,reflect:!0})],l.prototype,"required",2);l=s([j("wa-text-field")],l);const H={title:"Atoms/Text Field",parameters:{layout:"centered"},argTypes:{currentId:{control:"text"},name:{control:"text"},label:{control:"text"},placeholder:{control:"text"},required:{control:"boolean"}},render:({currentId:r,name:t,label:a,placeholder:o,required:e})=>O`<wa-text-field
      .currentId="${r}"
      .name="${t}"
      .label="${a}"
      .placeholder="${o}"
      .required="${e}"
    ></wa-text-field>`},d={name:"Text Field Default"},i={name:"Text Field with custom id",args:{currentId:"custom-id"}},u={name:"Text Field with custom name",args:{name:"custom-name"}},m={name:"Text Field with custom label",args:{label:"Custom label"}},p={name:"Text Field with custom placeholder",args:{placeholder:"Custom placeholder"}},h={name:"Text Field required",args:{required:!0}};var T,b,f;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Text Field Default'
}`,...(f=(b=d.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var F,C,w;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Text Field with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(w=(C=i.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var v,y,$;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Text Field with custom name',
  args: {
    name: 'custom-name'
  }
}`,...($=(y=u.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var q,S,I;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Text Field with custom label',
  args: {
    label: 'Custom label'
  }
}`,...(I=(S=m.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var W,_,D;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Text Field with custom placeholder',
  args: {
    placeholder: 'Custom placeholder'
  }
}`,...(D=(_=p.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var P,L,E;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Text Field required',
  args: {
    required: true
  }
}`,...(E=(L=h.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};const J=["TextFieldDefault","TextFieldWithCustomId","TextFieldWithCustomName","TextFieldWithCustomLabel","TextFieldWithCustomPlaceholder","TextFieldRequired"];export{d as TextFieldDefault,h as TextFieldRequired,i as TextFieldWithCustomId,m as TextFieldWithCustomLabel,u as TextFieldWithCustomName,p as TextFieldWithCustomPlaceholder,J as __namedExportsOrder,H as default};
