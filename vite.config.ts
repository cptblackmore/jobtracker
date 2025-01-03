import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), tsconfigPaths()],
  server: {
    proxy: {
      '/superjob': { // Локальный префикс для запросов
        target: 'https://api.superjob.ru', // Базовый адрес API
        changeOrigin: true, // Меняет Origin запроса на целевой адрес
        rewrite: (path) => { console.log(path); return path.replace(/^\/superjob/, '')}, // Убирает префикс /api
        secure: true, // Используем HTTPS
      },
      '/hh': {
        target: 'https://api.hh.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hh/, ''),
        secure: true
      }
    },
  }
})
