import { describe, expect, it, vi } from 'vitest';
import './wa-text-field';
import { createTestComponent } from '../../../test/create-component';
import { WaTextFieldProps } from './wa-text-field';

describe('wa-text-field', () => {
  it('renders correctly', async () => {
    const { component: waTextField, sanitizeText } =
      await createTestComponent<WaTextFieldProps>('wa-text-field');
    const label = waTextField.querySelector('label') as HTMLLabelElement;
    const input = waTextField.querySelector('input') as HTMLInputElement;

    const onChange = vi.fn();

    // checks all the proper elements are present
    expect(label).toBeDefined();
    expect(input).not.toBeNull();

    // - - - Label
    expect(label.htmlFor).toBe('default-id');
    expect(sanitizeText(label)).toContain('default text field content');

    // - - - Input
    expect(input?.type).toBe('text');
    expect(input?.name).toBe('default-name');
    expect(input?.id).toBe('default-id');
    expect(input?.id).toBe(label.htmlFor);
    expect(input.placeholder).toBe('default text field placeholder');

    // checks that the onChange works
    waTextField.addEventListener('click', onChange);
    label.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts the "id" prop', async () => {
    const { component: waTextField } =
      await createTestComponent<WaTextFieldProps>('wa-text-field', undefined, {
        currentId: 'custom id',
      });

    const label = waTextField.querySelector('label') as HTMLLabelElement;
    const input = waTextField.querySelector('input') as HTMLInputElement;

    expect(waTextField.currentId).toBe('custom id');
    expect(label.htmlFor).toBe('custom id');
    expect(input?.id).toBe('custom id');
  });

  it('accepts the "name" prop', async () => {
    const { component: waTextField } =
      await createTestComponent<WaTextFieldProps>('wa-text-field', undefined, {
        name: 'custom name',
      });
    const input = waTextField.querySelector('input') as HTMLInputElement;

    expect(waTextField.name).toBe('custom name');
    expect(input?.name).toBe('custom name');
  });

  it('accepts the "contentText" prop', async () => {
    const { component: waTextField, sanitizeText } =
      await createTestComponent<WaTextFieldProps>('wa-text-field', undefined, {
        contentText: 'custom content text',
      });
    const label = waTextField.querySelector('label') as HTMLLabelElement;

    expect(waTextField.contentText).toBe('custom content text');
    expect(sanitizeText(label)).toBe('custom content text');
  });
});
