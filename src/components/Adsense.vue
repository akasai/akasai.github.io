<template>
  <ins
      class="adsbygoogle"
      :class="adClass"
      :style="adStyle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="adResponsive"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Adsense',
})
export default class Adsense extends Vue {
  @Prop() adSlot!: string
  @Prop() adClass!: string
  private readonly adStyle!: string
  private readonly adClient!: string
  private readonly adFormat!: string
  private readonly adResponsive!: string

  constructor() {
    super()
    this.adStyle = 'display: block'
    this.adClient = 'ca-pub-7791595479585064'
    this.adFormat = 'auto'
    this.adResponsive = 'true'
  }

  mounted(): void {
    this.showAd()
  }

  showAd(): void {
    this.$nextTick(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error(e)
      }
    })
  }
}
</script>
