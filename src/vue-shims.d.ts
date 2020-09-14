// declare module 'vue/types/vue' {
//   interface Vue {
//     $page: any
//   }
// }

declare module '*.vue' {
  import Vue from 'vue'
  interface V extends Vue {
    $page: any
  }
  export default Vue
}
