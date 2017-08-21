<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~assets/logo.png" alt="logo">
        </router-link>
        <router-link to="/top">Top</router-link>
        <router-link to="/new">New</router-link>
        <router-link to="/show">Show</router-link>
        <router-link to="/ask">Ask</router-link>
        <router-link to="/job">Jobs</router-link>
        <a class="github" href="https://github.com/nuxt/hackernews" target="_blank" rel="noopener">
          Built with Nuxt.js
        </a>
      </nav>
    </header>
    <nuxt nuxt-child-key="none"></nuxt>
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        // We use $route.path since we don't use query parameters
        { rel: 'canonical', href: `https://hn.nuxtjs.org${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus">
  body
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size 15px
    background-color lighten(#eceef1, 30%)
    margin 0
    padding 0
    color #34495e
    overflow-y scroll

  a
    color #34495e
    text-decoration none

  .header
    background-color #188269
    z-index 999
    height 55px
    .inner
      max-width 800px
      box-sizing border-box
      margin 0px auto
      padding 15px 5px
    a
      color #fff
      line-height 24px
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      margin-right 1.8em
      &:hover
        color #fff
      &.router-link-active, &.nuxt-link-active
        color #fff
        font-weight 400
      &:nth-child(6)
        margin-right 0
    .github
      color #fff
      font-size .9em
      margin 0
      float right

  .logo
    width 24px
    margin-right 10px
    display inline-block
    vertical-align middle

  .view
    max-width 800px
    margin 0 auto
    position relative

  .appear-active
    transition opacity .4s ease
  .page-enter-active, .page-leave-active
    transition all .2s ease
  .appear, .page-enter, .page-leave-active
    opacity 0

  @media (max-width 860px)
    .header .inner
      padding 15px 30px

  @media (max-width 600px)
    .header
      .inner
        padding 15px
      a
        margin-right 1em
      .github
        display none
</style>
