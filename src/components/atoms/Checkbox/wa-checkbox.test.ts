import { describe, expect, it, vi } from 'vitest';
import './wa-checkbox';
import { createTestComponent } from '../../../test/create-component';

describe('wa-checkbox', () => {
  it('renders correctly', async () => {
		const {
			component: waCheckbox,
			innerElement,
			sanitizeText,
		} = await createTestComponent<HTMLInputElement>('wa-checkbox', 'input');
    const innerInput = innerElement as HTMLInputElement;

    const onClick = vi.fn();

    // checks it has type "button"
    // expect(waCheckbox.type).toBe('button');
    expect(innerInput.type).toBe('checkbox');

    // checks it has the default label
    expect(sanitizeText(waCheckbox)).toContain('default checkbox label');
    expect(sanitizeText(innerInput)).toBe('');

    // checks that the onClick works
    waCheckbox.addEventListener('click', onClick);
    innerInput.click();
    expect(onClick).toHaveBeenCalled();
  });
});
