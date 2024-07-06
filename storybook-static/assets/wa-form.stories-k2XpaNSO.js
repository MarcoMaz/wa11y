import{s as S,x as l}from"./lit-element-DP4StiEM.js";import{n as g,t as y}from"./property-8mcyX-AS.js";import{a as C,e as L}from"./query-__j_ZMY6.js";import"./wa-button-BTBISenH.js";import"./wa-text-field-kZHAfCgc.js";import"./if-defined-BovDaYmS.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let E;function D(t){return(r,a)=>C(r,a,{get(){return(this.renderRoot??E??(E=document.createDocumentFragment())).querySelectorAll(t)}})}var _=Object.defineProperty,$=Object.getOwnPropertyDescriptor,s=(t,r,a,o)=>{for(var e=o>1?void 0:o?$(r,a):r,d=t.length-1,b;d>=0;d--)(b=t[d])&&(e=(o?b(r,a,e):b(e))||e);return o&&e&&_(r,a,e),e};let n=class extends S{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this.setupButtonEvent()})}disconnectedCallback(){super.disconnectedCallback(),this.tearDownButtonEvent()}updated(t){t.has("buttonLabel")&&this.updateButtonLabelState(this.buttonLabel)}setupButtonEvent(){this.submitButton&&this.submitButton.addEventListener("customClick",this.handleSubmit.bind(this))}tearDownButtonEvent(){this.submitButton&&this.submitButton.removeEventListener("customClick",this.handleSubmit.bind(this))}updateButtonLabelState(t){this.submitButton&&this.submitButton.setAttribute("label",t)}handleSubmit(t){t.preventDefault();const r=Array.from(this.textFields).map(o=>{const e=o.querySelector("input");return e?e.value:""}),a=new CustomEvent("formSubmit",{detail:{values:r},bubbles:!0,composed:!0});this.dispatchEvent(a)}renderTextFields(){return this.children.length===0?l`<wa-text-field label="Default Field"></wa-text-field>`:l`${Array.from(this.children)}`}createRenderRoot(){return this}render(){return l`
      <form @submit="${this.handleSubmit}">
        ${this.renderTextFields()}
        <wa-button type="submit"></wa-button>
      </form>
    `}};s([g({type:String,reflect:!0})],n.prototype,"buttonLabel",2);s([L("form")],n.prototype,"formElement",2);s([L("wa-button")],n.prototype,"submitButton",2);s([D("wa-text-field")],n.prototype,"textFields",2);n=s([y("wa-form")],n);const M={title:"Molecules/Form",parameters:{layout:"centered"},argTypes:{buttonLabel:{control:"text"}},render:({buttonLabel:t})=>l`<wa-form .buttonLabel="${t}"></wa-form>`},i={name:"Form default"},u={name:"Form with custom button",args:{buttonLabel:"custom button label"}},m={name:"Form with more textfields",render:t=>l`
    <wa-form .buttonLabel=${t.buttonLabel}>
      <wa-text-field label="Field 1" currentId="label-1" name="label-1"></wa-text-field>
      <wa-text-field label="Field 2" currentId="label-2" name="label-2"></wa-text-field>
      <wa-text-field label="Field 3" currentId="label-3" name="label-3"></wa-text-field>
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
      <wa-text-field label="Field 1" currentId="label-1" name="label-1"></wa-text-field>
      <wa-text-field label="Field 2" currentId="label-2" name="label-2"></wa-text-field>
      <wa-text-field label="Field 3" currentId="label-3" name="label-3"></wa-text-field>
    </wa-form>
  \`
}`,...(B=(v=m.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};const R=["FormDefault","FormWithCustomButton","FormWithMoreTextFields"];export{i as FormDefault,u as FormWithCustomButton,m as FormWithMoreTextFields,R as __namedExportsOrder,M as default};
