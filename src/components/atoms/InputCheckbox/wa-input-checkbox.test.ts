import { describe, expect, it, vi } from 'vitest';
import './wa-input-checkbox';
import { createTestComponent } from '../../../test/create-component';
import { WaInputCheckboxProps } from './wa-input-checkbox';

describe('wa-input-checkbox', () => {
  it('renders correctly', async () => {
    const {
      component: waInputCheckbox,
      innerElement,
      sanitizeText,
    } = await createTestComponent<WaInputCheckboxProps>('wa-input-checkbox', 'label');
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waInputCheckbox.querySelector('input') as HTMLInputElement;
    const span = waInputCheckbox.querySelector('span') as HTMLSpanElement;

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
    expect(input?.type).toBe('checkbox');
    expect(input?.name).toBe('default-name');
    expect(input?.id).toBe('default-id');
    expect(input?.id).toBe(innerLabel.htmlFor);

    // - - - Span
    expect(sanitizeText(span)).toContain('default input checkbox content');

    // checks that the onChange works
    waInputCheckbox.addEventListener('click', onChange);
    innerLabel.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts the "id" prop', async () => {
    const { component: waInputCheckbox, innerElement } =
      await createTestComponent<WaInputCheckboxProps>('wa-input-checkbox', 'label', {
        currentId: 'custom id',
      });
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waInputCheckbox.querySelector('input') as HTMLInputElement;

    expect(waInputCheckbox.currentId).toBe('custom id');
    expect(innerLabel.htmlFor).toBe('custom id');
    expect(input?.id).toBe('custom id');
  });

  it('accepts the "name" prop', async () => {
    const { component: waInputCheckbox } =
      await createTestComponent<WaInputCheckboxProps>('wa-input-checkbox', 'label', {
        name: 'custom name',
      });
    const input = waInputCheckbox.querySelector('input') as HTMLInputElement;

    expect(waInputCheckbox.name).toBe('custom name');
    expect(input?.name).toBe('custom name');
  });

  it('accepts the "contentText" prop', async () => {
    const { component: waInputCheckbox, sanitizeText } =
      await createTestComponent<WaInputCheckboxProps>('wa-input-checkbox', 'label', {
        contentText: 'custom content',
      });
    const span = waInputCheckbox.querySelector('span') as HTMLSpanElement;

    expect(waInputCheckbox.contentText).toBe('custom content');
    expect(sanitizeText(span)).toBe('custom content');
  });
});
