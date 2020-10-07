import 'prismjs/themes/prism.css'
import { VueConstructor } from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import Meta, { MetaInfo } from 'vue-meta'
import VueRouter from 'vue-router'
import Layout from '~/layouts/Layout.vue'

export interface ClientContext {
  appOptions: object;
  router: VueRouter;
  head: MetaInfo;
}

export type ClientApiConstructor = (Vue: VueConstructor, context: ClientContext) => void;

const client: ClientApiConstructor = (Vue, { router, head }) => {
  Vue.use(Meta)
  Vue.use(InfiniteLoading)
  Vue.component('Layout', Layout)
}

export default client
