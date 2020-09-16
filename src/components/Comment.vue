<template>
  <div id="comment"></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Comment',
  })
  export default class Comment extends Vue {
    constructor() {
      super()
    }

    mounted(): void {
      const utterances = document.createElement('script')
      utterances.type = 'text/javascript'
      utterances.async = true
      utterances.crossOrigin = 'anonymous'
      utterances.src = 'https://utteranc.es/client.js'

      const mode = localStorage.getItem('theme')

      utterances.setAttribute('theme', mode === 'dark' ? 'dark-blue' : 'github-light')
      utterances.setAttribute('issue-term', 'title')
      utterances.setAttribute('label', '🗣:speech_balloon:')
      utterances.setAttribute('repo', 'akasai/akasai.github.io')
      document.getElementById('comment')?.appendChild(utterances);
    }
  }
</script>

<style lang="scss">
  #comment {
    width: 100%;
  }
</style>
