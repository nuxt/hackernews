# Nuxt3 Hacker News

Hacker News clone built with [Nuxt3](https://v3.nuxtjs.org).

<p align="center">
  <a href="https://hn.nuxtjs.org" target="_blank">
    <img width="1090" src="https://user-images.githubusercontent.com/904724/58875721-97382400-86cc-11e9-94c6-af21544817bb.png">
    <br>
    Live Demo
  </a>
</p>

## Deploy

- Universal: https://hn.nuxtjs.org

> Hosted on [Vercel](https://vercel.com/): `npm run build`

- Single Page: https://hn-spa.nuxtjs.org

> Hosted on [Netlify](https://www.netlify.com): `npm run build-spa`

## Performance

- Lighthouse [100/100](https://pagespeed.web.dev/report?url=https%3A%2F%2Fhackernews-git-nuxt3-nuxt-js.vercel.app%2Fnews%2F1) (Slow 4G / Mobile Moto G4)
  - Interactive: 1.4s
  - Total Blocking Time: 30ms

## Features

- Server Side Rendering
- Vite-based hot module replacement (HMR) dev environment
- Deploys anywhere with zero config (Vercel, Netlify, Cloudflare, etc.) powered by [Nitro](https://github.com/unjs/nitro)
- Code Splitting
- Prefetch/Preload JS + DNS + Data

## Build Setup

**Requires Node.js 14+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production (universal)
npm run build

# serve in production mode (universal)
npm start

# build for production (spa)
npm run build-spa

# serve in production mode (spa)
npm run start-spa # or upload .output/public/ directory

# validate code with ESLint (with Prettier)
npm run lint

# validate and fix with ESLint (with Prettier)
npm run lintfix
```

## Links

For the Nuxt 2 version, check out the [`nuxt2` branch](https://github.com/nuxt/hackernews/tree/nuxt2)

## License

MIT

## Credits 

This repository is originally ported from [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
