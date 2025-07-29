import { describe, expect, it, vi } from 'vitest';
import './wa-button';

const createWaButton = async () => {
  const waButton = document.createElement('wa-button');
  document.body.appendChild(waButton);
  await waButton.updateComplete;
  const innerButton = waButton.querySelector('button');

  if (!innerButton) {
    throw new Error('<button> not found inside <wa-button>');
  }

  const sanitizeText = (el: HTMLElement | null) => {
    return el?.textContent?.trim() ?? '';
  };

  return { waButton, innerButton, sanitizeText };
};

describe('wa-button', () => {
  it('renders correctly', async () => {
    const { waButton, innerButton, sanitizeText } = await createWaButton();

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
      const waButton = document.createElement('wa-button');
      waButton.setAttribute('type', typeValue);

      document.body.appendChild(waButton);
      await waButton.updateComplete;

      expect(waButton.type).toBe(typeValue);

      waButton.remove();
    }
  });

  it("accepts the 'label' prop", async () => {
    const waButton = document.createElement('wa-button');

    document.body.appendChild(waButton);

    waButton.setAttribute('label', 'custom label');
    await waButton.updateComplete;

    expect(waButton.label).toBe('custom label');
  });

  it("accepts the 'isDisabled' prop", async () => {
    const waButton = document.createElement('wa-button');
    const onClick = vi.fn();

    document.body.appendChild(waButton);

    waButton.setAttribute('isDisabled', 'true');
    await waButton.updateComplete;

    const innerButton = waButton.querySelector('button');
    expect(innerButton?.getAttribute('aria-disabled')).toBe('true');

    waButton.addEventListener('click', onClick);
    innerButton?.click();
    expect(onClick).not.toHaveBeenCalled();
  });
});
