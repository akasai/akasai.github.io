<template>
  <main class="layout" role="main">
    <Header :siteName="`devlog.akasai`" :show="showNavbar"/>
    <transition name="fade" appear>
      <main>
        <slot/>
      </main>
    </transition>
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
  :root {
    --width-size: 800px;

    /* background */
    --app-bg-color: #FFFFFF;
    --app-header-bg-color: #FFFFFF;
    --app-hover-bg-color: #ecf5f9;
    --tag-bg-color: #CFD8DC;
    --code-box-bg-color: #ECEFF1;

    /* font */
    --app-font-color: #000000;
    --anchor-font-color: #039BE5;
    --anchor-hover-font-color: #4FC3F7;
    --category-font-color: #546E7A;
    --title-font-color: #37474F;
    --series-font-color: #0277BD;
    --series-hover-font-color: #B3CCD8;
    --info-font-color: #607D8B;
    --reference-font-color: #01579B;
    --reference-hover-font-color: #B3CCD8;
    --code-font-color: #000000;

    /* border */
    --app-header-border-color: #D3D4D5;
    --app-profile-border-color: #D3D4D5;
    --app-main-border-color: #ECEFF1;
    --content-blockquote-bar: #263238;
  }

  [theme="dark"] {
    /* background */
    --app-bg-color: #091A28;
    --app-header-bg-color: #000000;
    --app-hover-bg-color: #09263c;
    --tag-bg-color: #01265b;
    --code-box-bg-color: #263238;

    /* font */
    --app-font-color: #FFFFFF;
    --anchor-font-color: #29B6F6;
    --anchor-hover-font-color: #81D4FA;
    --category-font-color: #546E7A;
    --title-font-color: #ECEFF1;
    --series-font-color: #81D4FA;
    --series-hover-font-color: #29B6F6;
    --info-font-color: #90A4AE;
    --reference-font-color: #0277BD;
    --reference-hover-font-color: #ECEFF1;
    --code-font-color: #ECEFF1;

    /* border */
    --app-header-border-color: #08121E;
    --app-profile-border-color: #263238;
    --app-main-border-color: #263238;
    --content-blockquote-bar: #ECEFF1;
  }

  html {
    font-size: 10px;
  }

  a {
    color: var(--anchor-font-color);
    text-decoration: none;
    border-bottom: none;

    &:hover {
      border-bottom-color: currentColor;
      color: var(--anchor-hover-font-color);
    }
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  hr {
    border: none;
    border-bottom: 1px solid var(--app-main-border-color);
  }

  ul {
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: var(--app-bg-color);
    color: var(--app-font-color);
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;

    .layout {
      margin: 0 auto;
      padding: 0 20px;
    }

    .fade-enter-active {
      transition: opacity .5s;
    }

    .fade-enter {
      opacity: 0;
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
