<template>
  <main class="layout" role="main">
    <Header :siteName="`devlog.akasai`" :show="showNavbar"/>
    <slot/>
    <div class="footer">
      <div class="footer-links">
        Built with <a target="_blank" class="link" href="//gridsome.org">Gridsome</a> Edited By
        <a target="_blank" class="link" href="https://github.com/akasai">akasai</a> /
        <a target="_blank" href="/sitemap.xml">Sitemap</a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Header from './Header.vue'

  @Component({
    name: 'Layout',
    components: {
      Header,
    },
    metaInfo() {
      return {
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: `akasai's 기술블로그`, vmid: 'description' },
          { name: 'author', content: 'akasai' },

          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: `https://akasai.github.io${this.$route.path}` },
          {
            property: 'og:image',
            content: `https://res.cloudinary.com/akasai/image/upload/v1600232989/cover_1_pmz69m.png`,
          },

          { property: 'og:description', content: `akasai's 기술블로그` },
          { property: 'og:site_name', content: 'devlog.akasai' },
          { property: 'og:locale', content: 'ko_KR' },
        ],
      }
    },
  })
  export default class Layout extends Vue {
    showNavbar: boolean
    lastScrollPosition: number

    constructor() {
      super()
      this.showNavbar = true
      this.lastScrollPosition = 0
    }

    mounted() {
      window.addEventListener('scroll', this.onScroll)
    }

    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    }

    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) return
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) return

      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  }
</script>

<style lang="scss">
  :root {
    --app-background-color: #FFFFFF;
    --app-font-color: black;
    --app-header-color: rgb(223, 224, 227);
    --profile-bg-color: rgb(241, 242, 243);
    --profile-img-border-color: rgb(211, 212, 213);
    --title-color: rgb(126, 187, 235);
    --category-color: rgba(46, 102, 163, 0.78);
    --post-list-text-color: rgb(175, 176, 177);
    --main-border-color: rgba(145, 146, 146, 0.35);
    --tag-bg-color: rgba(211, 212, 213, 0.62);
    --related-content-color: rgba(211, 212, 213, 0.61);
    --reference-link-color: #87adb4;
    --code-color: #f5f2f0;
    --code-text-color: black;
    --code-shadow-color: #b4b1af;
  }

  [theme="dark"] {
    --app-background-color: #091A28;
    --app-font-color: white;
    --app-header-color: rgb(39, 40, 43);
    --profile-bg-color: rgba(19, 48, 75, 0.88);
    --profile-img-border-color: rgb(32, 62, 106);
    --title-color: rgb(32, 201, 151);
    --category-color: rgba(46, 102, 163, 0.78);
    --post-list-text-color: rgb(175, 176, 177);
    --main-border-color: rgb(44, 45, 45);
    --tag-bg-color: rgba(32, 62, 106, 0.53);
    --related-content-color: #092638;
    --reference-link-color: #87adb4;
    --code-color: #2f2c2b;
    --code-text-color: #b0b0b0;
    --code-shadow-color: #4b4847;
  }

  h1 {
    margin: 0;
  }

  body {
    background-color: var(--app-background-color);
    color: var(--app-font-color);
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    font-size: 1.1em;
  }

  .layout {
    max-width: 760px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: .8em;
  }

  .footer a {
    color: gray;
  }

  .footer-links a {
    margin: 0 4px;
  }

  a {
    color: rgb(32, 201, 151);
    text-decoration: none;
  }

  a:hover {
    border-bottom-color: currentColor;
    color: #686868;
  }

  @media only screen and (max-width: 500px) {
    .footer {
      flex-direction: column;
    }

    .header {
      h1 {
        font-size: 1em;
      }
    }
  }
</style>
