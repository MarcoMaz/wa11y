import { describe, expect, it, vi } from 'vitest';
import './wa-text-field';
import { createTestComponent } from '../../../test/create-component';

describe('wa-text-field', () => {
  it('renders correctly', async () => {
    const { component: waTextField, sanitizeText } =
      await createTestComponent<HTMLInputElement>('wa-text-field');
    // const innerLabel = innerElement as HTMLLabelElement;
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
});
