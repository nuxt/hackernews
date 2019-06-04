# Nuxt.js Hacker News

HackerNews clone built with [Nuxt.js](https://nuxtjs.org).

<p align="center">
  <a href="https://hn.nuxtjs.org" target="_blank">
    <img width="1090" alt="Screenshot 2019-06-04 at 13 27 51" src="https://user-images.githubusercontent.com/904724/58875721-97382400-86cc-11e9-94c6-af21544817bb.png">
    <br>
    Live Demo
  </a>
</p>

## Modes

- Universal: https://hn.nuxtjs.org

> Hosted on [Now 2](https://zeit.co): `npm run build` + `now.json`

- Single Page: https://hn-spa.nuxtjs.org

> Hosted on [Netlify](https://www.netlify.com): `npm run build-spa` + `dist/` directory

## Performance

- Lighthouse [100/100](https://cdn.rawgit.com/Atinux/e2f424e6794babc00d2158406b0ab37d/raw/4de834145881697ea83292b381df5f591f1ed2f5/lighthouse-result-nuxt.html) - [Webpagetest](https://www.webpagetest.org/lighthouse.php?test=170620_PG_a2a9feaf4ace07a61b2c6c2a171b1c79&run=1)
- Interactive (Faster 3G) [3.5s](https://www.webpagetest.org/result/170620_PG_a2a9feaf4ace07a61b2c6c2a171b1c79)
- Interactive (Emerging Markets) [3.8s](https://www.webpagetest.org/result/170620_B1_0b83d61272c77c16c3f3f1f16fb72d2e)

## Features

- Server Side Rendering
- Code Splitting
- Single-file Vue Components
- Real-time List Updates with FLIP Animation
- Prefetch/Preload JS + DNS + Data
- Critical Path CSS
- PWA experience using [PWA Module](https://pwa.nuxtjs.org) with almost _zero config_
- PRPL
- Hot reloading dev environment integrated with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- Hosted on [Now 2](https://zeit.co/)

## Build Setup

**Requires Node.js 8+**

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
npm run start-spa # or upload dist/ directory

# validate code with ESLint (with Prettier)
npm run lint

# validate andf fix with ESLint (with Prettier)
npm run lintfix
```

## Links

For the communiy typescript fork please see [nuxt-community/hackernews-nuxt-ts](https://github.com/nuxt-community/hackernews-nuxt-ts)

## License

MIT

## Credits 

This repository is originally ported from [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
