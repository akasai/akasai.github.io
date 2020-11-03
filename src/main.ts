import 'prismjs/themes/prism.css'
import { VueConstructor } from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import Meta, { MetaInfo } from 'vue-meta'
import VueRouter from 'vue-router'
import Layout from '~/layouts/Layout.vue'
import Ads from 'vue-google-adsense'

export interface ClientContext {
  appOptions: object;
  router: VueRouter;
  head: MetaInfo;
  isClient: boolean;
}

export type ClientApiConstructor = (Vue: VueConstructor, context: ClientContext) => void;

const client: ClientApiConstructor = (Vue, { router, head, isClient }) => {
  Vue.use(Meta)
  Vue.use(InfiniteLoading)
  Vue.component('Layout', Layout)

  // https://github.com/mazipan/vue-google-adsense
  if (isClient) {
    Vue.use(require('vue-script2'))
    Vue.use(Ads.Adsense)
    // Vue.use(Ads.InArticleAdsense)
    // Vue.use(Ads.InFeedAdsense)
  }
}

export default client
