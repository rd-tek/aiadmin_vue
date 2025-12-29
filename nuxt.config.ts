// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-27',
  devtools: { enabled: false },
  devServer: {
    host: process.env.NUXT_HOST || '192.168.10.222',
    port: Number(process.env.NUXT_PORT || 3000),
    hot: true,
  },
  css: [
    '@/assets/scss/base/common.scss',
    '@/assets/scss/base/reset.scss',
    '@/assets/scss/base/variables.scss',
    '@/assets/scss/base/animation.scss',
    '@/assets/scss/base/fonts.scss',
    '@vuepic/vue-datepicker/dist/main.css',
  ],
  app: {
    baseURL: '/',
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
        awaitWriteFinish: {
          stabilityThreshold: 500,
          pollInterval: 100
        }
      }
    }
  },
  modules: ['@pinia/nuxt', // ✅ 정확한 모듈명
  'pinia-plugin-persistedstate/nuxt', '@nuxt/image'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://your-api-server.com',
      recaptchaSitekey: process.env.RECAPTCHA_SITEKEY,
      s3BucketUrl: process.env.NUXT_PUBLIC_S3_BUCKET_URL || "https://aiadmin.thegolf.com",
      kakaoMapKey: process.env.NUXT_PUBLIC_KAKAO_KEY,
    },
  },
})
