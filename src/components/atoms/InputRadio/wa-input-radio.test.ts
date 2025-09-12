import { describe, expect, it, vi } from 'vitest';
import './wa-input-radio';
import { createTestComponent } from '../../../test/create-component';
import { WaInputRadioProps } from './wa-input-radio';

describe('wa-input-radio', () => {
  it('renders correctly', async () => {
    const {
      component: waInputRadio,
      innerElement,
      sanitizeText,
    } = await createTestComponent<WaInputRadioProps>('wa-input-radio', 'label');
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waInputRadio.querySelector('input') as HTMLInputElement;
    const span = waInputRadio.querySelector('span') as HTMLSpanElement;

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
    expect(sanitizeText(span)).toContain('default input radio content');

    // checks that the onChange works
    waInputRadio.addEventListener('click', onChange);
    innerLabel.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts the "id" prop', async () => {
    const { component: waInputRadio, innerElement } =
      await createTestComponent<WaInputRadioProps>('wa-input-radio', 'label', {
        currentId: 'custom id',
      });
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waInputRadio.querySelector('input') as HTMLInputElement;

    expect(waInputRadio.currentId).toBe('custom id');
    expect(innerLabel.htmlFor).toBe('custom id');
    expect(input?.id).toBe('custom id');
  });

  it('accepts the "name" prop', async () => {
    const { component: waInputRadio } =
      await createTestComponent<WaInputRadioProps>('wa-input-radio', 'label', {
        name: 'custom name',
      });
    const input = waInputRadio.querySelector('input') as HTMLInputElement;

    expect(waInputRadio.name).toBe('custom name');
    expect(input?.name).toBe('custom name');
  });

  it('accepts the "contentText" prop', async () => {
    const { component: waInputRadio, sanitizeText } =
      await createTestComponent<WaInputRadioProps>('wa-input-radio', 'label', {
        contentText: 'custom content',
      });
    const span = waInputRadio.querySelector('span') as HTMLSpanElement;

    expect(waInputRadio.contentText).toBe('custom content');
    expect(sanitizeText(span)).toBe('custom content');
  });
});
