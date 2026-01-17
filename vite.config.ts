import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE_URL || '/GachaSystem/',
    server: {
        proxy: {
            '/api': 'http://localhost:3001',
        },
    },
})
