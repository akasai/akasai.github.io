<template>
  <header class="header">
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

    constructor() {
      super()
    }
  }
</script>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    position: fixed;
    padding: 0 5%;
    top: 0;
    left: 0;
    right: 0;
    transition: top 0.2s ease-in-out;
    z-index: 50;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);
    background-color: var(--app-header-color);

    a {
      color: inherit;
      border-bottom: none;
    }
  }
</style>
