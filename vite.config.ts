import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'wa11y',
      fileName: (format) => `wa11y.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: /^lit/,
    },
  },
  plugins: [dts()],
});
