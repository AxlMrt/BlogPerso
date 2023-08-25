import { defineConfig } from 'vitest/config'

export default defineConfig({
 test: {
    include: ['src/**/*.test.ts']
  },
  resolve: {
    alias: {
      auth: '/src/controller/auth.controller.ts',
      user: '/src/controller/user.controller.ts',
      book: '/src/controller/book.controller.ts',
      lib: '/src/prisma/lib'
    }
  }
});