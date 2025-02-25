import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
})

console.log('Fetching from:', `${API_BASE_URL}/api/v1/events/getEvent`);
        
        const response = await fetch(`${API_BASE_URL}/api/v1/events/getEvent`);
