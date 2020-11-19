<template>
  <header class="header" :class="{ 'hidden': !show }">
    <g-link to="/"><h1>🐋 {{siteName}}</h1></g-link>
    <ClientOnly>
      <ThemeToggle/>
    </ClientOnly>
  </header>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ThemeToggle from '../components/ThemeToggle.vue'

  @Component({
    name: 'Header',
    components: {
      ThemeToggle,
    },
  })
  export default class Header extends Vue {
    @Prop() siteName!: string
    @Prop() show!: boolean

    constructor() {
      super()
    }
  }
</script>

<style lang="scss">
  header {
    background-color: var(--app-header-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    height: 6.5rem;
    padding: 0 5%;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);
    z-index: 50;
    transition: top 0.2s ease-in-out;

    h1 {
      font-size: 2.2rem;
      font-family: Gugi;
      color: var(--app-font-color);
      font-weight: bold;
    }
  }

  .hidden {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    .header {
      h1 {
        font-size: 2rem;
      }
    }
  }
</style>
