import { VueConstructor } from 'vue'
import { MetaInfo } from 'vue-meta'
import VueRouter from 'vue-router'
import Layout from '~/layouts/Layout.vue'
import 'prismjs/themes/prism.css'

export interface ClientContext {
  appOptions: object;
  router: VueRouter;
  head: MetaInfo;
}

export type ClientApiConstructor = (Vue: VueConstructor, context: ClientContext) => void;

const client: ClientApiConstructor = (Vue, { router, head }) => {
  Vue.component('Layout', Layout)
  // head.title = 'My Awesome Gridsome Project'
}

export default client
