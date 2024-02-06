import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd())
  console.log( "BACKEND_API_URL" , env.VITE_APP_API_URL);
  return {
    plugins: [vue()],
  }
})
