import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-accordion';

export default {
  title: 'Molecules/Accordion',
  parameters: {
    layout: 'centered',
  },
  args: {},
  argTypes: {},
  render: () => html`<wa-accordion>
  <h3>RenatoDoList</h3>
  <div>
    <em>PWA</em>
    <p>Basic metronome with tempo and time signature customisation.</p>
  </div>

  <h3>Polyrhythmic Metronome</h3>
  <div>
    <em>Web App</em>
    <p>Something something…</p>
  </div>
  <h3>Something else</h3>
  <div>
    <em>sfasgf</em>
    <p>sagasgaslkjalksjg sagjlkasjglk asgkjaslg</p>
  </div>
  </wa-accordion>`,
} as Meta;

export const AccordionDefault: StoryObj = {
  name: 'Accordion Default',
};
