import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Node.js path module for resolving directories

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
    // Automatically resolve these extensions in imports
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});