import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    noDiscovery: true, // Disable automatic discovery of dependencies
    include: [], // Make sure no dependencies are pre-bundled
  },
})
