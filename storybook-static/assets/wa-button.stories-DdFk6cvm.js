import{x as D}from"./lit-element-DP4StiEM.js";import"./wa-button-DmrMqlEx.js";import"./property-8mcyX-AS.js";const C={title:"Atoms/Button",parameters:{layout:"centered"},argTypes:{disabled:{control:"boolean"},type:{control:{type:"select"},options:["button","submit","reset"]},label:{control:"text"}},render:({disabled:W,label:n,type:S})=>D`<wa-button
      .disabled=${W}
      .type=${S}
      .label=${n}
      @onClick=${()=>alert("Custom event fired")}
      >${n}</wa-button
    >`},t={name:"Button with default label",args:{disabled:!1,type:"button"}},e={name:"Button with custom label",args:{disabled:!1,type:"button",label:"custom label"}},a={name:"Button Disabled",args:{disabled:!0,type:"button",label:"button disabled"}},s={name:"Button with type submit",args:{disabled:!1,type:"submit",label:"button with type submit"}},o={name:"Button with type reset",args:{disabled:!1,type:"reset",label:"button with type reset"}};var r,l,u;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: 'Button with default label',
  args: {
    disabled: false,
    type: 'button'
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var i,b,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Button with custom label',
  args: {
    disabled: false,
    type: 'button',
    label: 'custom label'
  }
}`,...(d=(b=e.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var m,p,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Button Disabled',
  args: {
    disabled: true,
    type: 'button',
    label: 'button disabled'
  }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var y,B,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Button with type submit',
  args: {
    disabled: false,
    type: 'submit',
    label: 'button with type submit'
  }
}`,...(h=(B=s.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};var g,f,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Button with type reset',
  args: {
    disabled: false,
    type: 'reset',
    label: 'button with type reset'
  }
}`,...(w=(f=o.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};const L=["ButtonWithDefaultLabel","ButtonWithCustomLabel","ButtonDisabled","ButtonWithTypeSubmit","ButtonWithTypeReset"];export{a as ButtonDisabled,e as ButtonWithCustomLabel,t as ButtonWithDefaultLabel,o as ButtonWithTypeReset,s as ButtonWithTypeSubmit,L as __namedExportsOrder,C as default};
