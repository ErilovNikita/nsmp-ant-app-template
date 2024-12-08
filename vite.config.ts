import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      svgLoader()
    ],
    base: "./",
    server: {
      proxy: {
          "/sd/": {
            target: env.VITE_APP_REAL_URL,
            changeOrigin: true,
            secure: false,
            ws: true
          }
        }
    }
  }
})
