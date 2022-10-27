// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/index.css"],
  ssr: false,
  runtimeConfig: {
    public: {
      //test 0x00947399022413181ca4398b2DBf159d8318e63C  main 0xA7dc943340e54c7d6805B05f863381B5907FCCD0
      ca: "0x33612D7fA7D30b4baE02894d11688F47dF44D7fB",
    },
  },
  typescript: {
    tsConfig: "tsconfig.json",
  },
  server: {
    port: 3000,
    host: "0",
  },
});
