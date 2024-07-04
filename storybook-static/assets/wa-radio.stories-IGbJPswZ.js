import{s as A,x as g}from"./lit-element-DP4StiEM.js";import{n as p,t as E}from"./property-8mcyX-AS.js";import{o as R}from"./if-defined-BovDaYmS.js";var T=Object.defineProperty,j=Object.getOwnPropertyDescriptor,n=(e,a,t,o)=>{for(var r=o>1?void 0:o?j(a,t):a,h=e.length-1,f;h>=0;h--)(f=e[h])&&(r=(o?f(a,t,r):f(r))||r);return o&&r&&T(a,t,r),r};let s=class extends A{constructor(){super(...arguments),this.focused=!1}handleChange(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked}))}handleFocus(){this.focused=!this.focused}render(){const e=this.currentId||"default-id",a=this.name||"default-name",t=this.checked||!1;return g`
      <label id="${e}" part="label">
        <input
          type="radio"
          id="${R(e)}"
          value="${R(e)}"
          name="${R(a)}"
          ?checked="${t}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          aria-checked="${t}"
          part="input"
        />
        <span part="span">
          <slot>default text</slot>
        </span>
      </label>
    `}};n([p({type:String,reflect:!0})],s.prototype,"currentId",2);n([p({type:String,reflect:!0})],s.prototype,"name",2);n([p({type:Boolean,reflect:!0})],s.prototype,"checked",2);n([p({type:Boolean,reflect:!0})],s.prototype,"focused",2);s=n([E("wa-radio")],s);const G={title:"Atoms/Radio",parameters:{layout:"centered"},argTypes:{currentId:{control:"text"},name:{control:"text"},checked:{control:"boolean"},focused:{control:"boolean"}},render:({currentId:e,name:a,checked:t,focused:o})=>g`<wa-radio
      .currentId=${e}
      .name="${a}"
      .checked="${t}"
      .focused="${o}"
    ></wa-radio>`},c={name:"Radio with default id, name and label"},d={name:"Radio with custom id",args:{currentId:"custom-id"}},i={name:"Radio with custom name",args:{name:"custom-name"}},u={name:"Radio with custom label",args:{label:"Custom Label"},argTypes:{label:{control:"text"}},render:({label:e})=>g`<wa-radio>${e}</wa-radio>`},m={name:"Radio with focused input",args:{focused:!0}},l={name:"Radio with selected input",args:{checked:!0,focused:!0}};var b,w,I;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Radio with default id, name and label'
}`,...(I=(w=c.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var $,y,W;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: 'Radio with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(W=(y=d.parameters)==null?void 0:y.docs)==null?void 0:W.source}}};var C,S,v;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Radio with custom name',
  args: {
    name: 'custom-name'
  }
}`,...(v=(S=i.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var x,_,k;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Radio with custom label',
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
  }) => html\`<wa-radio>\${label}</wa-radio>\`
}`,...(k=(_=u.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var L,N,O;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Radio with focused input',
  args: {
    focused: true
  }
}`,...(O=(N=m.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var D,F,P;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Radio with selected input',
  args: {
    checked: true,
    focused: true
  }
}`,...(P=(F=l.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};const H=["RadioWithDefaultIdNameAndLabel","RadioWithCustomId","RadioWithCustomName","RadioWithCustomLabel","RadioWithFocusedInput","RadioWithSelectedInput"];export{d as RadioWithCustomId,u as RadioWithCustomLabel,i as RadioWithCustomName,c as RadioWithDefaultIdNameAndLabel,m as RadioWithFocusedInput,l as RadioWithSelectedInput,H as __namedExportsOrder,G as default};
