<template>
  <header class="header">
    <g-link to="/"><h1>👨‍💻 {{siteName}}</h1></g-link>
    <ClientOnly>
      <ThemeToggle/>
    </ClientOnly>
  </header>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ThemeToggle from './ThemeToggle.vue'

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
    a {
      color:inherit;
      border-bottom: none;
    }
  }
</style>
