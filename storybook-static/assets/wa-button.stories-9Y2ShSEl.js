import{x as D}from"./lit-element-DP4StiEM.js";import"./wa-button-BTBISenH.js";import"./property-8mcyX-AS.js";const L={title:"Atoms/Button",parameters:{layout:"centered"},argTypes:{disabled:{control:"boolean"},type:{control:{type:"select"},options:["button","submit","reset"]},label:{control:"text"}},render:({disabled:w,label:W,type:S})=>D`<wa-button
      .disabled=${w}
      .type=${S}
      .label=${W}
      @onClick=${()=>alert("Custom event fired")}
      ></wa-button
    >`},t={name:"Button with default label",args:{disabled:!1,type:"button"}},e={name:"Button with custom label",args:{disabled:!1,type:"button",label:"custom label"}},a={name:"Button Disabled",args:{disabled:!0,type:"button",label:"button disabled"}},s={name:"Button with type submit",args:{disabled:!1,type:"submit",label:"button with type submit"}},o={name:"Button with type reset",args:{disabled:!1,type:"reset",label:"button with type reset"}};var n,r,l;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: 'Button with default label',
  args: {
    disabled: false,
    type: 'button'
  }
}`,...(l=(r=t.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var u,i,b;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: 'Button with custom label',
  args: {
    disabled: false,
    type: 'button',
    label: 'custom label'
  }
}`,...(b=(i=e.parameters)==null?void 0:i.docs)==null?void 0:b.source}}};var d,m,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Button Disabled',
  args: {
    disabled: true,
    type: 'button',
    label: 'button disabled'
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,y,B;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Button with type submit',
  args: {
    disabled: false,
    type: 'submit',
    label: 'button with type submit'
  }
}`,...(B=(y=s.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var h,g,f;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Button with type reset',
  args: {
    disabled: false,
    type: 'reset',
    label: 'button with type reset'
  }
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const $=["ButtonWithDefaultLabel","ButtonWithCustomLabel","ButtonDisabled","ButtonWithTypeSubmit","ButtonWithTypeReset"];export{a as ButtonDisabled,e as ButtonWithCustomLabel,t as ButtonWithDefaultLabel,o as ButtonWithTypeReset,s as ButtonWithTypeSubmit,$ as __namedExportsOrder,L as default};
