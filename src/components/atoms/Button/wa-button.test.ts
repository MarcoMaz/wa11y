import { describe, expect, it, vi } from 'vitest';
import './wa-button';
import { createTestComponent } from '../../../test/create-component';
import { WaButtonProps } from './wa-button';

describe('wa-button', () => {
  it('renders correctly', async () => {
    const {
      component: waButton,
      innerElement,
      sanitizeText,
    } = await createTestComponent<WaButtonProps>('wa-button', 'button');
    const innerButton = innerElement as HTMLButtonElement;

    const onClick = vi.fn();

    // checks it has type "button"
    expect(waButton.type).toBe('button');
    expect(innerButton.type).toBe('button');

    // checks it has the default label
    expect(sanitizeText(waButton)).toContain('default button label');
    expect(sanitizeText(innerButton)).toBe('default button label');

    // checks that the onClick works
    waButton.addEventListener('click', onClick);
    innerButton.click();
    expect(onClick).toHaveBeenCalled();
  });

  it("accepts the 'type' prop", async () => {
    const types = ['button', 'submit', 'reset'];

    for (const typeValue of types) {
      const { component: waButton, innerElement } =
        await createTestComponent<WaButtonProps>('wa-button', 'button', {
          type: typeValue,
        });
      const innerButton = innerElement as HTMLButtonElement;

      expect(waButton.type).toBe(typeValue);
      expect(innerButton.type).toBe(typeValue);

      waButton.remove();
    }
  });

  it("accepts the 'label' prop", async () => {
    const {
      component: waButton,
      innerElement,
      sanitizeText,
    } = await createTestComponent<WaButtonProps>('wa-button', 'button', {
      label: 'custom label',
    });
    const innerButton = innerElement as HTMLButtonElement;

    expect(sanitizeText(waButton)).toBe('custom label');
    expect(sanitizeText(innerButton)).toBe('custom label');
  });

  it("accepts the 'isDisabled' prop", async () => {
    const onClick = vi.fn();

    const { component: waButton, innerElement } =
      await createTestComponent<WaButtonProps>('wa-button', 'button', {
        isDisabled: 'true',
      });
    const innerButton = innerElement as HTMLButtonElement;

    expect(waButton.isDisabled).toBe(true);
    expect(innerButton?.getAttribute('aria-disabled')).toBe('true');

    waButton.addEventListener('click', onClick);
    innerButton?.click();
    expect(onClick).not.toHaveBeenCalled();
  });
});
