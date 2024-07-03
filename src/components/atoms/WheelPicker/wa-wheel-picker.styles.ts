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

  .BeatPicker {
    position:relative
  }

  .BeatPicker:after,
  .BeatPicker:before {
    content:" ";
    height:calc(50% - 1.5rem);
    pointer-events:none;
    position:absolute;
    width:100%
  }

  .BeatPicker:before{
    background:linear-gradient(180deg, var(--color-white) 25%,transparent)
  }

  .BeatPicker:after{
    background:linear-gradient(0deg, var(--color-white) 25%,transparent);
    bottom:0
  }

  .BeatPicker__beats{
    font-family: Arial;
    font-size:2rem;
    font-weight:lighter;
    max-block-size:15rem;
    overflow-y:auto;
    scroll-snap-type:y mandatory;
    scrollbar-width:none
  }

  .BeatPicker__beats::-webkit-scrollbar{
    display:none
  }
    
  .BeatPicker__item{
    align-items:center;
    display:flex;
    height:3rem;
    scroll-snap-align:center
  }

  .BeatPicker__item:first-of-type{
    margin-top:6rem
  }

  .BeatPicker__item:nth-last-child(2){
    margin-bottom:6rem
  }

  .BeatPicker__aim{
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

  .-focus .BeatPicker__aim{
    display:block
  }

  .BeatPicker__aim:after,
  .BeatPicker__aim:before{
    background: var(--color-white);
    content:" ";
    height:2.5rem;
    position:absolute;
    top:.25rem;
    width:.125rem
  }

  .BeatPicker__aim:before{
    left:-.125rem
  }
    
  .BeatPicker__aim:after{
    right:-.125rem
  }

  .BeatPicker__aim {
    display: flex;
    left: unset;
  }

  .BeatPicker__beats {
    width: 3.5rem;
  }

  .BeatPicker__item {
    justify-content: center;
    position: relative;
    width: 3rem;
    z-index: 999;
  }

  .BeatPicker::before,
  .BeatPicker::after {
    z-index: 9999;
  }

  :host(:focus-within) .BeatPicker {
    outline: 1px solid var(--chrome-outline);
    box-shadow: 0 0 0 2px var(--chrome-box-shadow);
  }

  label,
  .warning {
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