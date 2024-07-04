import { css } from 'lit';

export const wheelPickerStyles = css`
  :host {
    --color-white: #fff;
    --wheel-picker--border-default-default: #E2E8F0;
    --wheel-picker--border-default-hover: #B0BCC8;

    --chrome-outline: #A86D5A;
    --chrome-box-shadow: #F4A26E;

    align-items: center;
    display: flex;
    flex-direction: column;
    width: fit-content;
  }

  .WheelPicker {
    position:relative
  }

  .WheelPicker:after,
  .WheelPicker:before {
    content:" ";
    height:calc(50% - 1.5rem);
    pointer-events:none;
    position:absolute;
    width:100%
  }

  .WheelPicker:before{
    background:linear-gradient(180deg, var(--color-white) 25%,transparent)
  }

  .WheelPicker:after{
    background:linear-gradient(0deg, var(--color-white) 25%,transparent);
    bottom:0
  }

  .WheelPicker__items{
    font-family: Arial;
    font-size:2rem;
    font-weight:lighter;
    max-block-size:15rem;
    overflow-y:auto;
    scroll-snap-type:y mandatory;
    scrollbar-width:none
  }

  .WheelPicker__items::-webkit-scrollbar{
    display:none
  }
    
  .WheelPicker__item{
    align-items:center;
    display:flex;
    height:3rem;
    scroll-snap-align:center
  }

  .WheelPicker__item:first-of-type{
    margin-top:6rem
  }

  .WheelPicker__item:nth-last-child(2){
    margin-bottom:6rem
  }

  .WheelPicker__aim{
    border:.125rem solid var(--wheel-picker--border-default-default);
    border-radius:.375rem;
    box-sizing:content-box;
    display:none;
    height:3rem;
    left:calc(50% - 1.5rem);
    position:absolute;
    top:calc(50% - 1.5rem);
    width:3rem
  }

  .-focus .WheelPicker__aim{
    display:block
  }

  .WheelPicker__aim:after,
  .WheelPicker__aim:before{
    background: var(--color-white);
    content:" ";
    height:2.5rem;
    position:absolute;
    top:.25rem;
    width:.125rem
  }

  .WheelPicker__aim:before{
    left:-.125rem
  }
    
  .WheelPicker__aim:after{
    right:-.125rem
  }

  .WheelPicker__aim {
    display: flex;
    left: unset;
  }

  .WheelPicker__items {
    width: 3.5rem;
  }

  .WheelPicker__item {
    justify-content: center;
    position: relative;
    width: 3rem;
    z-index: 999;
  }

  .WheelPicker::before,
  .WheelPicker::after {
    z-index: 9999;
  }

  :host(:focus-within) .WheelPicker {
    outline: 1px solid var(--chrome-outline);
    box-shadow: 0 0 0 2px var(--chrome-box-shadow);
  }

  label,
  .WheelPicker__warning {
    font-family: arial;
    font-size: 1rem;
    padding: 0.5rem;
  }

  input {
    opacity: 0;
    position: absolute;
    width: 0;
  }
`