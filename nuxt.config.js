module.exports = {
  head: {
    titleTemplate: "Nuxt HN | %s",
    meta: [
      {
        property: "og:image",
        content:
          "https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png"
      },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:site", content: "@nuxt_js" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: {
    color: "#59cc93"
  },
  loadingIndicator: {
    name: "rectangle-bounce",
    color: "white",
    background: "#188269"
  },
  manifest: {
    name: "Nuxt Hacker News",
    description: "HackerNews clone built with Nuxt.js",
    theme_color: "#188269"
  },
  modules: ["@nuxtjs/pwa", "@nuxtjs/component-cache", "@nuxtjs/axios"],
  axios: {
    proxy: true
  },
  proxy: {
    "/api": {
      target: "https://api.hnpwa.com/v0/",
      pathRewrite: { "^/api/": "" }
    }
  },
  plugins: ["~/plugins/filters"],
  render: {
    static: {
      maxAge: "1y",
      setHeaders(res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", "public, max-age=0")
        }
      }
    }
  }
}
