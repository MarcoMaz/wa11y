import{s as X,x as U}from"./lit-element-DP4StiEM.js";import{n as l,t as Z}from"./property-8mcyX-AS.js";import{e as k}from"./query-__j_ZMY6.js";import{o as I}from"./if-defined-BovDaYmS.js";var ee=Object.defineProperty,te=Object.getOwnPropertyDescriptor,a=(e,t,i,r)=>{for(var n=r>1?void 0:r?te(t,i):t,s=e.length-1,c;s>=0;s--)(c=e[s])&&(n=(r?c(t,i,n):c(n))||n);return r&&n&&ee(t,i,n),n};const G="WheelPicker",z="WheelPicker__input",J="WheelPicker__items",m="WheelPicker__item",re="WheelPicker__aim",Q="WheelPicker__warning",f="-center";let o=class extends X{firstUpdated(){this.createElements(),this.centerBeatOnLoad()}createElements(){const e=this.min!==void 0?this.min:1,t=this.max!==void 0?this.max:10,r=Array.from({length:t-e+1},(s,c)=>c+e).map(s=>`<span class="${m}">${s}</span>`).join("");this.wheelPickerItems&&(this.wheelPickerItems.innerHTML=r);const n=document.createElement("span");n.classList.add(re),this.wheelPickerItems&&this.wheelPickerItems.appendChild(n)}highlightCenterItem(e){const t=e.getBoundingClientRect(),i=window.scrollY+t.top+t.height/2,r=Array.from(e.querySelectorAll(`.${m}`)).find(n=>{const s=n.getBoundingClientRect(),c=window.scrollY+s.top,V=window.scrollY+s.bottom;return c<=i&&V>=i});e.querySelectorAll(`.${m}`).forEach(n=>n.classList.remove(f)),r&&r.classList.add(f)}centerBeatOnLoad(){const e=this.min!==void 0?this.min:1,t=this.max!==void 0?this.max:10,i=Math.floor((t-e)/2)+1,r=this.wheelPickerItems.querySelector(`.${m}:nth-of-type(${i})`);if(r){const n=r.offsetTop-this.wheelPickerItems.offsetHeight/2+r.offsetHeight/2;requestAnimationFrame(()=>{this.wheelPickerItems.scrollTop=n,this.highlightCenterItem(this.wheelPickerItems)})}}handleScroll(){this.highlightCenterItem(this.wheelPicker);const e=this.wheelPicker.querySelector(`.${m}.${f}`);if(e){const t=e.textContent;this.wheelPickerInput&&t&&(this.wheelPickerInput.value=t,this.validateInput())}}onInputChange(e){const t=e.target.valueAsNumber,i=this.wheelPickerItems.querySelector(`.${m}:nth-of-type(${t})`);if(i){const r=i.offsetTop-this.wheelPickerItems.offsetHeight/2+i.offsetHeight/2;requestAnimationFrame(()=>{this.wheelPickerItems.scrollTop=r,this.highlightCenterItem(this.wheelPickerItems),this.validateInput()})}}validateInput(){if(this.wheelPickerInput&&this.wheelPickerWarning){const e=this.wheelPickerInput.valueAsNumber,t=this.min!==void 0?this.min:1,i=this.max!==void 0?this.max:10;isNaN(e)||e<t||e>i?this.wheelPickerWarning.style.display="inline":this.wheelPickerWarning.style.display="none"}}createRenderRoot(){return this}render(){const e=this.currentId||"default-id",t=this.label||"default label",i=this.name||"defaultName",r=this.warningId||"default-warning-id",n=this.warningText||"default warning text",s=this.min||1,c=this.max||10;return U`
      <label for="${I(e)}">${t}</label>
      <input
        class="${z}"
        min="${s}"
        max="${c}"
        type="number"
        id="${I(e)}"
        name="${i}"
        @input="${this.onInputChange}"
        aria-describedby="${r}"
      />
      <div class="${G}">
        <div
          tabindex="0"
          class="${J}"
          @scroll="${this.handleScroll}"
        ></div>
      </div>
      <span class="${Q}" id="${r}"
        >${n}</span
      >
    `}};a([l({type:String,reflect:!0})],o.prototype,"currentId",2);a([l({type:String,reflect:!0})],o.prototype,"label",2);a([l({type:String,reflect:!0})],o.prototype,"name",2);a([l({type:String,reflect:!0})],o.prototype,"warningId",2);a([l({type:String,reflect:!0})],o.prototype,"warningText",2);a([l({type:Number,reflect:!0})],o.prototype,"min",2);a([l({type:Number,reflect:!0})],o.prototype,"max",2);a([k(`.${G}`)],o.prototype,"wheelPicker",2);a([k(`.${z}`)],o.prototype,"wheelPickerInput",2);a([k(`.${J}`)],o.prototype,"wheelPickerItems",2);a([k(`.${Q}`)],o.prototype,"wheelPickerWarning",2);o=a([Z("wa-wheel-picker")],o);const ae={title:"Atoms/Wheel Picker",parameters:{layout:"centered",a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]},options:{}}},argTypes:{currentId:{control:"text"},label:{control:"text"},name:{control:"text"},warningId:{control:"text"},warningText:{control:"text"},min:{control:"number"},max:{control:"number"}},render:({currentId:e,label:t,name:i,warningId:r,warningText:n,min:s,max:c})=>U`<wa-wheel-picker
      .currentId="${e}"
      .label="${t}"
      .name="${i}"
      .warningId="${r}"
      .warningText="${n}"
      .min="${s}"
      .max="${c}"
    ></wa-wheel-picker>`},h={name:"Wheel Picker Default"},u={name:"Wheel Picker with custom id",args:{currentId:"custom-id"}},p={name:"Wheel Picker with custom label",args:{label:"custom label"}},d={name:"Wheel Picker with custom name",args:{name:"custom-name"}},g={name:"Wheel Picker with custom warning id",args:{warningId:"custom-warning-id"}},P={name:"Wheel Picker with custom warning text",args:{warningText:"custom warning text"}},w={name:"Wheel Picker from 1 to 50",args:{max:50}},W={name:"Wheel Picker from 10 to 50",args:{min:10,max:50}};var x,_,C;h.parameters={...h.parameters,docs:{...(x=h.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Wheel Picker Default'
}`,...(C=(_=h.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var y,$,S;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Wheel Picker with custom id',
  args: {
    currentId: 'custom-id'
  }
}`,...(S=($=u.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var b,E,v;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Wheel Picker with custom label',
  args: {
    label: 'custom label'
  }
}`,...(v=(E=p.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var L,A,T;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Wheel Picker with custom name',
  args: {
    name: 'custom-name'
  }
}`,...(T=(A=d.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var N,R,H;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Wheel Picker with custom warning id',
  args: {
    warningId: 'custom-warning-id'
  }
}`,...(H=(R=g.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var Y,q,B;P.parameters={...P.parameters,docs:{...(Y=P.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'Wheel Picker with custom warning text',
  args: {
    warningText: 'custom warning text'
  }
}`,...(B=(q=P.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};var K,O,D;w.parameters={...w.parameters,docs:{...(K=w.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: 'Wheel Picker from 1 to 50',
  args: {
    max: 50
  }
}`,...(D=(O=w.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var F,M,j;W.parameters={...W.parameters,docs:{...(F=W.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Wheel Picker from 10 to 50',
  args: {
    min: 10,
    max: 50
  }
}`,...(j=(M=W.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};const ce=["WheelPickerDefault","WheelPickerWithCustomId","WheelPickerWithCustomLabel","WheelPickerWithCustomName","WheelPickerWithCustomWarningId","WheelPickerWithCustomWarningText","WheelPickerFrom1to50","WheelPickerFrom10to50"];export{h as WheelPickerDefault,W as WheelPickerFrom10to50,w as WheelPickerFrom1to50,u as WheelPickerWithCustomId,p as WheelPickerWithCustomLabel,d as WheelPickerWithCustomName,g as WheelPickerWithCustomWarningId,P as WheelPickerWithCustomWarningText,ce as __namedExportsOrder,ae as default};
