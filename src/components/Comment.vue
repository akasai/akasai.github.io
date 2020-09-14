<template>
  <div id="comment"></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Comment',
  })
  export default class Comment extends Vue {
    private readonly utterances: any

    constructor() {
      super()

      this.utterances = document.createElement('script')
      this.utterances.type = 'text/javascript'
      this.utterances.async = true
      this.utterances.crossOrigin = 'anonymous'
      this.utterances.src = 'https://utteranc.es/client.js'
    }

    mounted(): void {
      const mode = localStorage.getItem('theme')

      this.utterances.setAttribute('theme', mode === 'dark' ? 'dark-blue' : 'github-light')
      this.utterances.setAttribute('issue-term', 'url')
      this.utterances.setAttribute('label', '🗣:speech_balloon:')
      this.utterances.setAttribute('repo', 'akasai/akasai.github.io')
      document.getElementById('comment')?.appendChild(this.utterances);
    }
  }
</script>

<style lang="scss">
  #comment {
    width: 100%;
  }
</style>
