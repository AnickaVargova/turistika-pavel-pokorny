import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    port: 8081,
    host: true
  },

  preview: {
    port: 8081
  },

  build: {
    // Production optimizations
    sourcemap: false, // Disable source maps in production for smaller bundle
    
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for Vue and Vue Router
          'vue-vendor': ['vue', 'vue-router'],
        }
      }
    },

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    }
  },

  // CSS optimization
  css: {
    devSourcemap: false
  }
})

