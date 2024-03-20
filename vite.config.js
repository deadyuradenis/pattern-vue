import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {
  fileURLToPath,
  URL
} from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// TODO: настроить билд картинок и других ресурсов
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  mode: isProduction ? 'production' : 'development',
  base: '/',
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],

      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    port: 7777
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': path.resolve(__dirname, 'src/components'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      //
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@media': path.resolve(__dirname, 'src/assets/media'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      //
      '@router': path.resolve(__dirname, 'src/router'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@theme/globals/index.scss";
        `,
      },
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'core/js/[name]-[hash].js',
        entryFileNames: 'core/js/[name]-[hash].js',

        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg|ico)$/.test(name ?? '')){
            return 'assets/media/[name]-[hash][extname]';
          }

          if (/\.(ttf|woff|woff2|otf)$/.test(name ?? '')){
            return 'assets/fonts/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'core/css/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    }
  },
})

