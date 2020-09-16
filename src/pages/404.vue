<template>
  <Layout>
    <section class="warning">
      <h1>🚫 Not Found 🚫</h1>
    </section>
  </Layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'NotFound',
    metaInfo() {
      return {
        title: 'Not Found',
      }
    },
  })
  export default class NotFound extends Vue {
    constructor() {
      super()
    }
  }
</script>

<style lang="scss" scoped>
  .warning {
    padding-top: 8rem;
    min-height: 500px;
  }
</style>
