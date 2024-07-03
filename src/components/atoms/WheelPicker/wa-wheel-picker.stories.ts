import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-wheel-picker';

export default {
  title: 'Atoms/Wheel Picker',
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  render: ({ currentId, label, name, warningId, warningText }) =>
    html`<wa-wheel-picker
      .currentId="${currentId}"
      .label="${label}"
      .name="${name}"
      .warningId="${warningId}"
      .warningText="${warningText}"
    ></wa-wheel-picker>`,
} as Meta;

export const WheelPickerDefault: StoryObj = {
  name: 'Wheel Picker Default',
};

/*
- fix MIN e MAX prop
- Clean up the whole class
- Change the classnames of the component


RESOURCES:
- https://v10.carbondesignsystem.com/components/number-input/accessibility/
- https://designsystem.backbase.com/web-components/input-number/web#_interactive-demo
- https://carbondesignsystem.com/components/number-input/accessibility/ 

Future Feat: Aim is editable.
*/
