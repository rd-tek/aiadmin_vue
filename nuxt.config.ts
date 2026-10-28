// AI검토 3차:토너먼트/이벤트포함마무리 (2026-10-27)
// 2026-10-28 AI검토 4차: 클릭만 되는 칸(div·li 등 @click)에 키보드 접근을 붙이는 템플릿 컴파일 변환 (짝: plugins/click-a11y.client.js)
import { xgClickA11y } from './xg-click-a11y.mjs'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-27',
  devtools: { enabled: false },
  devServer: {
    host: process.env.NUXT_HOST || '192.168.10.222',
    port: Number(process.env.NUXT_PORT || 9000),
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
    // 2026-10-26: 페이지 언어 기본값(접근성 html-has-lang)
    head: { link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }, { rel: "icon", type: "image/png", sizes: "100x100", href: "/favicon.png" }], /* 2026-10-29: 파비콘 = 한국 서비스(kr_12) 앱과 같은 X-GOLF X(favicon.ico·favicon.png 원본 그대로). 이전: Nuxt 기본 로고 */ htmlAttrs: { lang: 'ko' }, meta: [{ name: 'theme-color', content: '#ffffff' }] }, // 2026-10-28 AI검토 4차: theme-color = 모바일 상단 색
  },
  vite: {
    vue: { template: { compilerOptions: { nodeTransforms: [xgClickA11y] } } }, // 2026-10-28 AI검토 4차
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://aiadminapi.thegolf.com',
      recaptchaSitekey: process.env.RECAPTCHA_SITEKEY,
      s3BucketUrl: process.env.NUXT_PUBLIC_S3_BUCKET_URL || "https://aiadmin.thegolf.com",
      kakaoMapKey: process.env.NUXT_PUBLIC_KAKAO_KEY,
    },
  },
})
