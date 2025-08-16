import { describe, expect, it, vi } from 'vitest';
import './wa-radio';
import { createTestComponent } from '../../../test/create-component';
import { WaRadioProps } from './wa-radio';

describe('wa-radio', () => {
  it('renders correctly', async () => {
    const {
      component: waRadio,
      innerElement,
      sanitizeText,
    } = await createTestComponent<WaRadioProps>('wa-radio', 'label');
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waRadio.querySelector('input') as HTMLInputElement;
    const span = waRadio.querySelector('span') as HTMLSpanElement;

    const onChange = vi.fn();

    // checks all the proper elements are present
    expect(innerLabel).toBeDefined();
    expect(input).not.toBeNull();
    expect(span).not.toBeNull();

    if (input && span) {
      expect(innerLabel.contains(input)).toBe(true);
      expect(innerLabel.contains(span)).toBe(true);
    }

    // - - - Label
    expect(innerLabel.htmlFor).toBe('default-id');

    // - - - Input
    expect(input?.type).toBe('radio');
    expect(input?.name).toBe('default-name');
    expect(input?.id).toBe('default-id');
    expect(input?.id).toBe(innerLabel.htmlFor);

    // - - - Span
    expect(sanitizeText(span)).toContain('default radio content');

    // checks that the onChange works
    waRadio.addEventListener('click', onChange);
    innerLabel.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts the "id" prop', async () => {
    const { component: waRadio, innerElement } =
      await createTestComponent<WaRadioProps>('wa-radio', 'label', {
        currentId: 'custom id',
      });
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waRadio.querySelector('input') as HTMLInputElement;

    expect(waRadio.currentId).toBe('custom id');
    expect(innerLabel.htmlFor).toBe('custom id');
    expect(input?.id).toBe('custom id');
  });

  it('accepts the "name" prop', async () => {
    const { component: waRadio } = await createTestComponent<WaRadioProps>(
      'wa-radio',
      'label',
      {
        name: 'custom name',
      }
    );
    const input = waRadio.querySelector('input') as HTMLInputElement;

    expect(waRadio.name).toBe('custom name');
    expect(input?.name).toBe('custom name');
  });

  it('accepts the "contentText" prop', async () => {
    const { component: waRadio, sanitizeText } =
      await createTestComponent<WaRadioProps>('wa-radio', 'label', {
        contentText: 'custom content',
      });
    const span = waRadio.querySelector('span') as HTMLSpanElement;

    expect(waRadio.contentText).toBe('custom content');
    expect(sanitizeText(span)).toBe('custom content');
  });
});
