import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  external: [
    'vuex',
    'vue'
  ],
  format: [
    'cjs',
    "esm"
  ]
})