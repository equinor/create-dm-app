import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react-swc'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  base: '/',
  plugins: [
      checker({
        typescript: true,
      }),
      react(),
      viteTsConfigPaths(),
      svgrPlugin(),
   ],
   define: {
    'process.env': process.env
  },
  server: {
    port: 3000,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests-setup.js',
  },
})