import{s as E,x}from"./lit-element-DP4StiEM.js";import{n as i,t as T}from"./property-8mcyX-AS.js";import{o as k}from"./if-defined-BovDaYmS.js";var j=Object.defineProperty,B=Object.getOwnPropertyDescriptor,s=(e,t,o,r)=>{for(var c=r>1?void 0:r?B(t,o):t,p=e.length-1,b;p>=0;p--)(b=e[p])&&(c=(r?b(t,o,c):b(c))||c);return r&&c&&j(t,o,c),c};let a=class extends E{constructor(){super(...arguments),this.focused=!1}handleChange(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked}))}handleFocus(){this.focused=!this.focused}render(){const e=this.currentId||"default-id",t=this.name||"default-name",o=this.checked||!1;return x`
      <label id="${e}" part="label">
        <input
          type="checkbox"
          id="${k(e)}"
          name="${k(t)}"
          ?checked="${o}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          aria-checked="${o}"
          part="input"
        />
        <span part="span">
          <slot>default text</slot>
        </span>
      </label>
    `}};s([i({type:String,reflect:!0})],a.prototype,"currentId",2);s([i({type:String,reflect:!0})],a.prototype,"name",2);s([i({type:Boolean,reflect:!0})],a.prototype,"checked",2);s([i({type:Boolean,reflect:!0})],a.prototype,"focused",2);a=s([T("wa-checkbox")],a);const H={title:"Atoms/Checkbox",parameters:{layout:"centered"},argTypes:{currentId:{control:"text"},name:{control:"text"},checked:{control:"boolean"},focused:{control:"boolean"}},render:({currentId:e,name:t,checked:o,focused:r})=>x` <wa-checkbox
      .currentId="${e}"
      .name="${t}"
      .checked="${o}"
      .focused="${r}"
    ></wa-checkbox>`},n={name:"Checkbox with default id, name and label"},u={name:"Checkbox with custom id",args:{currentId:"custom-id"}},h={name:"Checkbox with custom name",args:{name:"custom-name"}},d={name:"Checkbox with custom label",args:{label:"Custom Label"},argTypes:{label:{control:"text"}},render:({label:e})=>x`<wa-checkbox>${e}</wa-checkbox>`},l={name:"Checkbox with focused input",args:{focused:!0}},m={name:"Checkbox with selected input",args:{checked:!0,focused:!0},parameters:{a11y:{config:{rules:[{id:"color-contrast",selector:"*:not(span)"}]}}}};var C,f,g;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Checkbox with default id, name and label'
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var w,y,I;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: 'Checkbox with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(I=(y=u.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var W,$,S;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Checkbox with custom name',
  args: {
    name: 'custom-name'
  }
}`,...(S=($=h.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var _,v,L;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: 'Checkbox with custom label',
  args: {
    label: 'Custom Label'
  },
  argTypes: {
    label: {
      control: 'text'
    }
  },
  render: ({
    label
  }) => html\`<wa-checkbox>\${label}</wa-checkbox>\`
}`,...(L=(v=d.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var N,O,D;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Checkbox with focused input',
  args: {
    focused: true
  }
}`,...(D=(O=l.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var F,P,A;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Checkbox with selected input',
  args: {
    checked: true,
    focused: true
  },
  parameters: {
    a11y: {
      config: {
        rules: [{
          id: 'color-contrast',
          selector: '*:not(span)'
        }]
      }
    }
  }
}`,...(A=(P=m.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};const J=["CheckboxWithDefaultIdNameAndLabel","CheckboxWithCustomId","CheckboxWithCustomName","CheckboxWithCustomLabel","CheckboxWithFocusedInput","CheckboxWithSelectedInput"];export{u as CheckboxWithCustomId,d as CheckboxWithCustomLabel,h as CheckboxWithCustomName,n as CheckboxWithDefaultIdNameAndLabel,l as CheckboxWithFocusedInput,m as CheckboxWithSelectedInput,J as __namedExportsOrder,H as default};
