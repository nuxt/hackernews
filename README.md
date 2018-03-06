# Nuxt.js Hacker News
HackerNews clone built with Nuxt.js.

<p align="center">
  <a href="https://hn.nuxtjs.org" target="_blank">
    <img src="https://user-images.githubusercontent.com/5158436/27347011-428833aa-5604-11e7-9f43-a12e576e9b18.png" width="256px">
    <br>
    Live Demo
  </a>
</p>

## Performance

- Lighthouse [100/100](https://cdn.rawgit.com/Atinux/e2f424e6794babc00d2158406b0ab37d/raw/4de834145881697ea83292b381df5f591f1ed2f5/lighthouse-result-nuxt.html) - [Webpagetest](https://www.webpagetest.org/lighthouse.php?test=170620_PG_a2a9feaf4ace07a61b2c6c2a171b1c79&run=1)
- Interactive (Faster 3G) [3.5s](https://www.webpagetest.org/result/170620_PG_a2a9feaf4ace07a61b2c6c2a171b1c79)
- Interactive (Emerging Markets) [3.8s](https://www.webpagetest.org/result/170620_B1_0b83d61272c77c16c3f3f1f16fb72d2e)

## Features

- Server Side Rendering & Caching
- Code Splitting
- Single-file Vue Components
- Real-time List Updates with FLIP Animation
- Prefetch/Preload JS + DNS + Data
- Critical Path CSS
- PWA experience using [PWA Module](https://github.com/nuxt/modules/tree/master/modules/pwa) with almost _zero config_
- PRPL
- Hot reloading dev environment integrated with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

## Build Setup

**Requires Node.js 6+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start

# validate code with ESLint (with Prettier)
npm run lint

# validate andf fix with ESLint (with Prettier)
npm run lintfix

```

## License

MIT

This repository is originally ported from [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
