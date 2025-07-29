import { describe, expect, it, vi } from 'vitest';
import './wa-button'; // registers the <wa-button> custom element

describe('wa-button', () => {
  it('renders correctly', async () => {
    const waButton = document.createElement('wa-button');
    const onClick = vi.fn();

    document.body.appendChild(waButton);
    await waButton.updateComplete;

    // checks it has type "button"
    expect(waButton.type).toBe('button');

    // checks it has the default label
    const defaultButtonLabel = waButton.textContent?.trim();
    expect(defaultButtonLabel).toContain('default button label');

    // checks that the onClick works
    waButton.addEventListener('click', onClick);
    waButton.click();
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
});

/*
4. "accepts the isDisabled prop"
- - aria-disabled is set to true
- - onClick doesn't trigger


*/
