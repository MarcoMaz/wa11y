import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'wa-button': resolve(__dirname, 'src/components/atoms/Button/wa-button.ts'),
        'wa-input-checkbox': resolve(__dirname, 'src/components/atoms/InputCheckbox/wa-input-checkbox.ts'),
        'wa-input-radio': resolve(__dirname, 'src/components/atoms/InputRadio/wa-input-radio.ts'),
        'wa-input-text': resolve(__dirname, 'src/components/atoms/InputText/wa-input-text.ts'),
        'wa-wheel-picker': resolve(__dirname, 'src/components/atoms/WheelPicker/wa-wheel-picker.ts'),
        'wa-accordion': resolve(__dirname, 'src/components/molecules/Accordion/wa-accordion.ts'),
        'wa-carousel': resolve(__dirname, 'src/components/molecules/Carousel/wa-carousel.ts'),
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
