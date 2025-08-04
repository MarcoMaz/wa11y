import { describe, expect, it, vi } from 'vitest';
import './wa-checkbox';
import { createTestComponent } from '../../../test/create-component';
import { WaCheckboxProps } from './wa-checkbox';

describe('wa-checkbox', () => {
  it('renders correctly', async () => {
    const {
      component: waCheckbox,
      innerElement,
      sanitizeText,
    } = await createTestComponent<HTMLInputElement>('wa-checkbox', 'label');
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waCheckbox.querySelector('input') as HTMLInputElement;
    const span = waCheckbox.querySelector('span') as HTMLSpanElement;

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
    expect(sanitizeText(span)).toContain('default checkbox content');

    // checks that the onChange works
    waCheckbox.addEventListener('click', onChange);
    innerLabel.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts the "id" prop', async () => {
    const { component, innerElement } =
      await createTestComponent<HTMLButtonElement>('wa-checkbox', 'label', {
        currentId: 'custom id',
      });
    const waCheckbox = component as unknown as WaCheckboxProps;
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waCheckbox.querySelector('input') as HTMLInputElement;

    expect(waCheckbox.currentId).toBe('custom id');
    expect(innerLabel.htmlFor).toBe('custom id');
    expect(input?.id).toBe('custom id');
  });

  it('accepts the "name" prop', async () => {
    const { component } = await createTestComponent<HTMLButtonElement>(
      'wa-checkbox',
      'label',
      {
        name: 'custom name',
      }
    );
    const waCheckbox = component as unknown as WaCheckboxProps;
    const input = waCheckbox.querySelector('input') as HTMLInputElement;

    expect(waCheckbox.name).toBe('custom name');
    expect(input?.name).toBe('custom name');
  });

  it('accepts the "contentText" prop', async () => {
    const { component, sanitizeText } =
      await createTestComponent<HTMLButtonElement>('wa-checkbox', 'label', {
        contentText: 'custom content',
      });
    const waCheckbox = component as unknown as WaCheckboxProps;
    const span = waCheckbox.querySelector('span') as HTMLSpanElement;

    expect(waCheckbox.contentText).toBe('custom content');
    expect(sanitizeText(span)).toBe('custom content');
  });
});
