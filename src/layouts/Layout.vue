<template>
  <main class="layout" role="main">
    <Header :siteName="`devlog.akasai`" :show="showNavbar"/>
    <slot/>
    <div class="top" :class="{'hidden': topHidden()}" @click="toTop()">Top</div>
    <div class="footer">
      <div class="footer-links">
        Built with <a target="_blank" class="link" href="//gridsome.org">Gridsome</a> Edited By
        <a target="_blank" class="link" href="https://github.com/akasai">akasai</a> /
        <a target="_blank" href="/sitemap.xml">Sitemap</a> /
        <a target="_blank" href="/feed.xml">RSS</a>
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

          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: `https://akasai.github.io${this.$route.path}` },
          {
            property: 'og:image',
            content: `https://res.cloudinary.com/akasai/image/upload/v1600232989/cover_1_pmz69m.png`,
          },

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

    toTop() {
      window.scrollTo(0, 0)
    }

    topHidden() {
      return this.lastScrollPosition < 1000
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'Gugi';
    src: url('../assets/font/Gugi-Regular.ttf') format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  :root {
    --width-size: 800px;
    --app-background-color: #FFFFFF;
    --app-font-color: black;
    --app-header-color: #FFFFFF;
    --app-header-border-color: #D3D4D5;
    --app-profile-border-color: #D3D4D5;
    --tag-bg-color: #ebebeb;
    --anchor-color: #2E66A3;
    --title-font-color: #2E66A3;
    --category-font-color: #AAA;
    --series-font-color: #7EBBEB;
    --hover-bg-color: #F1F2F3;
    --main-border-color: #919292;
    --posting-info-font-color: #AFB0B1;
    --code-box-bg-color: #F5F2F0;
    --code-text-color: black;
    --content-blockquote-bar: #BBB;
    --reference-link-color: #87ADB4;
  }

  [theme="dark"] {
    --app-background-color: #091A28;
    --app-font-color: white;
    --app-header-color: black;
    --app-header-border-color: #08121E;
    --app-profile-border-color: #2C2D2D;
    --tag-bg-color: #0b344b;
    --anchor-color: #32C997;
    --title-font-color: #32C997;
    --category-font-color: #CCC;
    --series-font-color: #33C9BA;
    --hover-bg-color: #1A2C4A;
    --main-border-color: #2C2D2D;
    --posting-info-font-color: #AFB0B1;
    --code-box-bg-color: #2F2C2B;
    --code-text-color: #B0B0B0;
    --content-blockquote-bar: #EEE;
    --reference-link-color: #87ADB4;
  }

  html {
    font-size: 10px;
  }

  a {
    color: var(--anchor-color);
    text-decoration: none;
    border-bottom: none;

    &:hover {
      border-bottom-color: currentColor;
      color: #686868;
    }
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  hr {
    border: none;
    border-bottom: 1px solid var(--main-border-color);
  }

  ul {
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: var(--app-background-color);
    color: var(--app-font-color);
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;

    .layout {
      margin: 0 auto;
      padding: 0 20px;
    }

    .top {
      display: block;
      position: sticky;
      bottom: 10%;
      z-index: 1000;
      width: 30px;
      height: 30px;
      cursor: pointer;
      left: 90%;
      background: lightgray;
      color: black;
      border-radius: 5px;
      text-align: center;
      padding: 10px 5px 5px 5px;
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }

      &.hidden {
        display: none;
      }
    }

    .footer {
      width: var(--width-size);
      margin: 3rem auto 3rem auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.4rem;

      a {
        margin: 0 4px;
        color: gray;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .footer {
      width: 100% !important;
      flex-direction: column;
    }
  }
</style>
