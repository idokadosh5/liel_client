import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    disabled: true, // Disables the optimizer completely
    // or
    // disabled: 'dev', // Disables optimizer only during development
  },
})

