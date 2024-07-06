import{s as E,x as A}from"./lit-element-DP4StiEM.js";import{n,t as j}from"./property-8mcyX-AS.js";import{o as x}from"./if-defined-BovDaYmS.js";var B=Object.defineProperty,R=Object.getOwnPropertyDescriptor,s=(c,t,o,r)=>{for(var e=r>1?void 0:r?R(t,o):t,p=c.length-1,b;p>=0;p--)(b=c[p])&&(e=(r?b(t,o,e):b(e))||e);return r&&e&&B(t,o,e),e};let a=class extends E{constructor(){super(...arguments),this.focused=!1}handleChange(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked}))}handleFocus(){this.focused=!this.focused}createRenderRoot(){return this}render(){const c=this.currentId||"default-id",t=this.name||"default-name",o=this.checked||!1,r=this.label||"default checkbox label";return A`
      <label id="${c}">
        <input
          type="checkbox"
          id="${x(c)}"
          name="${x(t)}"
          ?checked="${o}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          aria-checked="${o}"
        />
        <span>${r}</span>
      </label>
    `}};s([n({type:String,reflect:!0})],a.prototype,"currentId",2);s([n({type:String,reflect:!0})],a.prototype,"name",2);s([n({type:Boolean,reflect:!0})],a.prototype,"checked",2);s([n({type:Boolean,reflect:!0})],a.prototype,"focused",2);s([n({type:String,reflect:!0})],a.prototype,"label",2);a=s([j("wa-checkbox")],a);const G={title:"Atoms/Checkbox",parameters:{layout:"centered"},argTypes:{currentId:{control:"text"},name:{control:"text"},checked:{control:"boolean"},focused:{control:"boolean"},label:{control:"text"}},render:({currentId:c,name:t,checked:o,focused:r,label:e})=>A` <wa-checkbox
      .currentId="${c}"
      .name="${t}"
      .checked="${o}"
      .focused="${r}"
      .label="${e}"
    ></wa-checkbox>`},u={name:"Checkbox with default id, name and label"},h={name:"Checkbox with custom id",args:{currentId:"custom-id"}},d={name:"Checkbox with custom name",args:{name:"custom-name"}},l={name:"Checkbox with custom label",args:{label:"Custom Label"}},m={name:"Checkbox with focused input",args:{focused:!0}},i={name:"Checkbox with selected input",args:{checked:!0,focused:!0},parameters:{a11y:{config:{rules:[{id:"color-contrast",selector:"*:not(span)"}]}}}};var k,C,f;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: 'Checkbox with default id, name and label'
}`,...(f=(C=u.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var g,w,y;h.parameters={...h.parameters,docs:{...(g=h.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Checkbox with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(y=(w=h.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var I,W,$;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Checkbox with custom name',
  args: {
    name: 'custom-name'
  }
}`,...($=(W=d.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var S,_,v;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Checkbox with custom label',
  args: {
    label: 'Custom Label'
  }
}`,...(v=(_=l.parameters)==null?void 0:_.docs)==null?void 0:v.source}}};var L,N,O;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Checkbox with focused input',
  args: {
    focused: true
  }
}`,...(O=(N=m.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var D,F,P;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(P=(F=i.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};const H=["CheckboxWithDefaultIdNameAndLabel","CheckboxWithCustomId","CheckboxWithCustomName","CheckboxWithCustomLabel","CheckboxWithFocusedInput","CheckboxWithSelectedInput"];export{h as CheckboxWithCustomId,l as CheckboxWithCustomLabel,d as CheckboxWithCustomName,u as CheckboxWithDefaultIdNameAndLabel,m as CheckboxWithFocusedInput,i as CheckboxWithSelectedInput,H as __namedExportsOrder,G as default};
