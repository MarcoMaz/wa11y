import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'wa-button': resolve(__dirname, 'src/components/atoms/Button/wa-button.ts'),
        'wa-input-checkbox': resolve(__dirname, 'src/components/atoms/InputCheckbox/wa-input-checkbox.ts'),
        'wa-radio': resolve(__dirname, 'src/components/atoms/Radio/wa-radio.ts'),
        'wa-text-field': resolve(__dirname, 'src/components/atoms/TextField/wa-text-field.ts'),
        'wa-wheel-picker': resolve(__dirname, 'src/components/atoms/WheelPicker/wa-wheel-picker.ts'),
        'wa-form': resolve(__dirname, 'src/components/molecules/Form/wa-form.ts'),
      },
      name: 'wa11y',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es'], // Only ES format
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  plugins: [dts()],
});
