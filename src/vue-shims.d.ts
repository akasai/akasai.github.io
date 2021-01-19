declare module '*.vue' {
  import Vue from 'vue'
  interface V extends Vue {
    $page: any
  }
  export default Vue
}

interface Window {
  adsbygoogle: {[key: string]: unknown}[]
}
