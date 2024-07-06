import{s as A,x as P}from"./lit-element-DP4StiEM.js";import{n,t as E}from"./property-8mcyX-AS.js";import{o as R}from"./if-defined-BovDaYmS.js";var j=Object.defineProperty,B=Object.getOwnPropertyDescriptor,c=(t,a,r,o)=>{for(var e=o>1?void 0:o?B(a,r):a,h=t.length-1,f;h>=0;h--)(f=t[h])&&(e=(o?f(a,r,e):f(e))||e);return o&&e&&j(a,r,e),e};let s=class extends A{constructor(){super(...arguments),this.focused=!1}handleChange(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked}))}handleFocus(){this.focused=!this.focused}createRenderRoot(){return this}render(){const t=this.currentId||"default-id",a=this.name||"default-name",r=this.checked||!1,o=this.label||"default radio label";return P`
      <label id="${t}">
        <input
          type="radio"
          id="${R(t)}"
          value="${R(t)}"
          name="${R(a)}"
          ?checked="${r}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          aria-checked="${r}"
        />
        <span>${o}</span>
      </label>
    `}};c([n({type:String,reflect:!0})],s.prototype,"currentId",2);c([n({type:String,reflect:!0})],s.prototype,"name",2);c([n({type:Boolean,reflect:!0})],s.prototype,"checked",2);c([n({type:Boolean,reflect:!0})],s.prototype,"focused",2);c([n({type:String,reflect:!0})],s.prototype,"label",2);s=c([E("wa-radio")],s);const G={title:"Atoms/Radio",parameters:{layout:"centered"},argTypes:{currentId:{control:"text"},name:{control:"text"},checked:{control:"boolean"},focused:{control:"boolean"},label:{control:"text"}},render:({currentId:t,name:a,checked:r,focused:o,label:e})=>P`<wa-radio
      .currentId=${t}
      .name="${a}"
      .checked="${r}"
      .focused="${o}"
      .label="${e}"
    ></wa-radio>`},d={name:"Radio with default id, name and label"},i={name:"Radio with custom id",args:{currentId:"custom-id"}},u={name:"Radio with custom name",args:{name:"custom-name"}},m={name:"Radio with custom label",args:{label:"Custom Label"}},l={name:"Radio with focused input",args:{focused:!0}},p={name:"Radio with selected input",args:{checked:!0,focused:!0}};var g,b,w;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Radio with default id, name and label'
}`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var I,$,y;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Radio with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(y=($=i.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};var W,C,S;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Radio with custom name',
  args: {
    name: 'custom-name'
  }
}`,...(S=(C=u.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var v,_,x;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Radio with custom label',
  args: {
    label: 'Custom Label'
  }
}`,...(x=(_=m.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};var k,L,N;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: 'Radio with focused input',
  args: {
    focused: true
  }
}`,...(N=(L=l.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var O,D,F;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: 'Radio with selected input',
  args: {
    checked: true,
    focused: true
  }
}`,...(F=(D=p.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};const H=["RadioWithDefaultIdNameAndLabel","RadioWithCustomId","RadioWithCustomName","RadioWithCustomLabel","RadioWithFocusedInput","RadioWithSelectedInput"];export{i as RadioWithCustomId,m as RadioWithCustomLabel,u as RadioWithCustomName,d as RadioWithDefaultIdNameAndLabel,l as RadioWithFocusedInput,p as RadioWithSelectedInput,H as __namedExportsOrder,G as default};
