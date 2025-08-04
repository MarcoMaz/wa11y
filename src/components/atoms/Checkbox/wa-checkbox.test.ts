import { describe, expect, it, vi } from 'vitest';
import './wa-checkbox';
import { createTestComponent } from '../../../test/create-component';

describe('wa-checkbox', () => {
  it('renders correctly', async () => {
    const {
      component: waCheckbox,
      innerElement,
      sanitizeText,
    } = await createTestComponent<HTMLInputElement>('wa-checkbox', 'label');
    const innerLabel = innerElement as HTMLLabelElement;
    const input = waCheckbox.querySelector('input');
    const span = waCheckbox.querySelector('span');

    // console.log('innerLabel', innerLabel?.outerHTML);
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
});
