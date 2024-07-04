import{s as L,x as b}from"./lit-element-DP4StiEM.js";import{n as g,t as C}from"./property-8mcyX-AS.js";import{a as S,e as E}from"./query-__j_ZMY6.js";import"./wa-button-DmrMqlEx.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let y;function _(t){return(o,r)=>S(o,r,{get(){return(this.renderRoot??y??(y=document.createDocumentFragment())).querySelectorAll(t)}})}var D=Object.defineProperty,T=Object.getOwnPropertyDescriptor,l=(t,o,r,a)=>{for(var e=a>1?void 0:a?T(o,r):o,n=t.length-1,d;n>=0;n--)(d=t[n])&&(e=(a?d(o,r,e):d(e))||e);return a&&e&&D(o,r,e),e};let s=class extends L{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this.setupTextFields(),this.setupButtonEvent()})}disconnectedCallback(){super.disconnectedCallback(),this.tearDownButtonEvent()}updated(t){t.has("buttonLabel")&&this.updateButtonLabelState(this.buttonLabel)}setupTextFields(){if(this.textFields.length===0&&this.formElement){const t=document.createElement("wa-text-field");this.formElement.insertBefore(t,this.formElement.firstChild)}}setupButtonEvent(){this.submitButton&&this.submitButton.addEventListener("customClick",this.handleSubmit.bind(this))}tearDownButtonEvent(){this.submitButton&&this.submitButton.removeEventListener("customClick",this.handleSubmit.bind(this))}handleSubmit(t){t.preventDefault();const o=Array.from(this.textFields).map(a=>{var n;const e=(n=a.shadowRoot)==null?void 0:n.querySelector("input");return e?e.value:""}),r=new CustomEvent("formSubmit",{detail:{values:o},bubbles:!0,composed:!0});this.dispatchEvent(r)}updateButtonLabelState(t){this.submitButton&&this.submitButton.setAttribute("label",t)}createRenderRoot(){return this}render(){return b`
      <form part="form">
        <slot></slot>
        <wa-button type="submit"></wa-button>
      </form>
    `}};l([g({type:String,reflect:!0})],s.prototype,"buttonLabel",2);l([E("form")],s.prototype,"formElement",2);l([E("wa-button")],s.prototype,"submitButton",2);l([_("wa-text-field")],s.prototype,"textFields",2);s=l([C("wa-form")],s);const R={title:"Molecules/Form",parameters:{layout:"centered"},argTypes:{buttonLabel:{control:"text"}},render:({buttonLabel:t})=>b`<wa-form .buttonLabel="${t}"></wa-form>`},i={name:"Form default"},u={name:"Form with custom button",args:{buttonLabel:"custom button label"}},m={name:"Form with more textfields",render:t=>b`
    <wa-form .buttonLabel=${t.buttonLabel}>
      <wa-text-field label="Field 1"></wa-text-field>
      <wa-text-field label="Field 2"></wa-text-field>
      <wa-text-field label="Field 3"></wa-text-field>
    </wa-form>
  `};var c,f,p;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Form default'
}`,...(p=(f=i.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var h,w,F;u.parameters={...u.parameters,docs:{...(h=u.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Form with custom button",
  args: {
    buttonLabel: "custom button label"
  }
}`,...(F=(w=u.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var x,v,B;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Form with more textfields',
  render: args => html\`
    <wa-form .buttonLabel=\${args.buttonLabel}>
      <wa-text-field label="Field 1"></wa-text-field>
      <wa-text-field label="Field 2"></wa-text-field>
      <wa-text-field label="Field 3"></wa-text-field>
    </wa-form>
  \`
}`,...(B=(v=m.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};const A=["FormDefault","FormWithCustomButton","FormWithMoreTextFields"];export{i as FormDefault,u as FormWithCustomButton,m as FormWithMoreTextFields,A as __namedExportsOrder,R as default};
