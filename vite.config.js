import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // GARANTE CAMINHOS RELATIVOS CORRETOS
  root: './',
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: resolve(__dirname, 'html/index.html'),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});