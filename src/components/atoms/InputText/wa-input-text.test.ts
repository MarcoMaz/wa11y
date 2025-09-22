import { describe, expect, it, vi } from 'vitest';
import './wa-input-text';
import { createTestComponent } from '../../../test/create-component';
import { WaInputTextProps } from './wa-input-text';

describe('wa-input-text', () => {
  it('renders correctly', async () => {
    const { component: waInputText, sanitizeText } =
      await createTestComponent<WaInputTextProps>('wa-input-text');
    const label = waInputText.querySelector('label') as HTMLLabelElement;
    const input = waInputText.querySelector('input') as HTMLInputElement;

    const onChange = vi.fn();

    // checks all the proper elements are present
    expect(label).toBeDefined();
    expect(input).not.toBeNull();

    // - - - Label
    expect(label.htmlFor).toBe('default-id');
    expect(sanitizeText(label)).toContain('default input text content');

    // - - - Input
    expect(input?.type).toBe('text');
    expect(input?.name).toBe('default-name');
    expect(input?.id).toBe('default-id');
    expect(input?.id).toBe(label.htmlFor);
    expect(input.placeholder).toBe('default input text placeholder');

    // checks that the onChange works
    waInputText.addEventListener('click', onChange);
    label.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts the "id" prop', async () => {
    const { component: waInputText } =
      await createTestComponent<WaInputTextProps>('wa-input-text', undefined, {
        currentId: 'custom id',
      });

    const label = waInputText.querySelector('label') as HTMLLabelElement;
    const input = waInputText.querySelector('input') as HTMLInputElement;

    expect(waInputText.currentId).toBe('custom id');
    expect(label.htmlFor).toBe('custom id');
    expect(input?.id).toBe('custom id');
  });

  it('accepts the "name" prop', async () => {
    const { component: waInputText } =
      await createTestComponent<WaInputTextProps>('wa-input-text', undefined, {
        name: 'custom name',
      });
    const input = waInputText.querySelector('input') as HTMLInputElement;

    expect(waInputText.name).toBe('custom name');
    expect(input?.name).toBe('custom name');
  });

  it('accepts the "contentText" prop', async () => {
    const { component: waInputText, sanitizeText } =
      await createTestComponent<WaInputTextProps>('wa-input-text', undefined, {
        contentText: 'custom content text',
      });
    const label = waInputText.querySelector('label') as HTMLLabelElement;

    expect(waInputText.contentText).toBe('custom content text');
    expect(sanitizeText(label)).toBe('custom content text');
  });

  it('accepts the "placeholder" prop', async () => {
    const { component: waInputText } =
      await createTestComponent<WaInputTextProps>('wa-input-text', undefined, {
        placeholder: 'custom placeholder',
      });
    const input = waInputText.querySelector('input') as HTMLInputElement;

    expect(waInputText.placeholder).toBe('custom placeholder');
    expect(input.placeholder).toBe('custom placeholder');
  });

  it("accepts the 'isRequired' prop", async () => {
    const { component: waInputText } =
      await createTestComponent<WaInputTextProps>('wa-input-text', undefined, {
        isRequired: 'true',
      });
    const input = waInputText.querySelector('input') as HTMLInputElement;

    expect(waInputText.isRequired).toBe(true);
    expect(input?.getAttribute('aria-required')).toBe('true');
  });
});
