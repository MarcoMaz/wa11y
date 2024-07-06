import{x as _}from"./lit-element-DP4StiEM.js";import"./wa-text-field-kZHAfCgc.js";import"./property-8mcyX-AS.js";import"./if-defined-BovDaYmS.js";const R={title:"Atoms/Text Field",parameters:{layout:"centered"},argTypes:{currentId:{control:"text"},name:{control:"text"},label:{control:"text"},placeholder:{control:"text"},required:{control:"boolean"}},render:({currentId:W,name:I,label:S,placeholder:$,required:D})=>_`<wa-text-field
      .currentId="${W}"
      .name="${I}"
      .label="${S}"
      .placeholder="${$}"
      .required="${D}"
    ></wa-text-field>`},e={name:"Text Field Default"},t={name:"Text Field with custom id",args:{currentId:"custom-id"}},r={name:"Text Field with custom name",args:{name:"custom-name"}},a={name:"Text Field with custom label",args:{label:"Custom label"}},o={name:"Text Field with custom placeholder",args:{placeholder:"Custom placeholder"}},s={name:"Text Field required",args:{required:!0}};var l,d,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: 'Text Field Default'
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var c,i,n;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Text Field with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var u,p,x;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: 'Text Field with custom name',
  args: {
    name: 'custom-name'
  }
}`,...(x=(p=r.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var T,h,F;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Text Field with custom label',
  args: {
    label: 'Custom label'
  }
}`,...(F=(h=a.parameters)==null?void 0:h.docs)==null?void 0:F.source}}};var g,C,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Text Field with custom placeholder',
  args: {
    placeholder: 'Custom placeholder'
  }
}`,...(b=(C=o.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var w,f,q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: 'Text Field required',
  args: {
    required: true
  }
}`,...(q=(f=s.parameters)==null?void 0:f.docs)==null?void 0:q.source}}};const A=["TextFieldDefault","TextFieldWithCustomId","TextFieldWithCustomName","TextFieldWithCustomLabel","TextFieldWithCustomPlaceholder","TextFieldRequired"];export{e as TextFieldDefault,s as TextFieldRequired,t as TextFieldWithCustomId,a as TextFieldWithCustomLabel,r as TextFieldWithCustomName,o as TextFieldWithCustomPlaceholder,A as __namedExportsOrder,R as default};
