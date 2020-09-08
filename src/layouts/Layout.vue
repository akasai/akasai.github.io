<template>
  <main class="layout" role="main">
    <Header :siteName="$page.metadata.siteName"/>
    <slot/>
    <div class="footer">
      <div>
        <p>
        </p>
      </div>
      <div class="footer-links">
        Built with <a target="_blank" class="link" href="//gridsome.org">Gridsome</a> /
        <a target="_blank" href="/sitemap.xml">Sitemap</a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Header from '../components/Header.vue'

  @Component({
    name: 'Layout',
    components: {
      Header,
    },
  })
  export default class Layout extends Vue {
  }
</script>

<style lang="scss">
  :root {
    --app-background-color: #FFFFFF;
    --app-font-color: black;
    --app-header-color: rgb(223, 224, 227);
    --title-color: rgb(126, 187, 235);
    --post-list-text-color: rgb(175, 176, 177);
    --main-border-color: rgb(44, 45, 45);
  }

  [theme="dark"] {
    --app-background-color: #091A28;
    --app-font-color: white;
    --app-header-color: rgb(39, 40, 43);
    --title-color: rgb(32, 201, 151);
    --post-list-text-color: rgb(175, 176, 177);
    --main-border-color: rgb(44, 45, 45);
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
    font-size: .8em;
  }

  .footer a {
    color: gray;
  }

  .footer-links a {
    margin: 0 4px;
  }

  a {
    /*border-bottom: 1px solid currentColor;*/
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
