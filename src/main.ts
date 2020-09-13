import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.component('Layout', Layout)
}

export default client
