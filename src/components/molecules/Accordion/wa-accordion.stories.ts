import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-accordion';

export default {
  title: 'Molecules/Accordion',
  parameters: {
    layout: 'centered',
  },
  args: {
    collapseOthers: false,
  },
  argTypes: {
    collapseOthers: {
      control: 'boolean',
    },
  },
  render: ({ collapseOthers }) => html`<wa-accordion
    .collapseOthers=${collapseOthers}
  >
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
  args: {
    collapseOthers: false,
  },

  name: 'Accordion Default',
};

export const AccordionCollapseOthers: StoryObj = {
  name: 'Accordion Collapse Others',
  args: {
    collapseOthers: true,
  },
};

export const AccordionWithAddon: StoryObj = {
  name: 'Accordion with Addon',
  render: ({ collapseOthers }) => html`<wa-accordion
    .collapseOthers=${collapseOthers}
  >
    <template data-addon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    </template>

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
};
