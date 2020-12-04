<template>
  <Layout>
    <section class="tags">
      <h1 id="title"> # {{ $page.tag.title }} </h1>
      <!-- ads 상단 -->
      <Adsense ins-class="top-ads" data-ad-client="ca-pub-7791595479585064" data-ad-slot="1631172523"
               data-full-width-responsive="yes"/>
      <section class="posts">
        <article v-if="!$page.tag.belongsTo.edges.length" class="no-result">⚠️ No Contents</article>
        <PostItem v-else v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
      </section>
    </section>
  </Layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import PostItem from '~/components/PostItem.vue'

  class V extends Vue {
    $page: any
  }

  @Component<V>({
    name: 'Tag',
    components: {
      PostItem,
    },
    metaInfo() {
      return {
        title: `# ${this.$page.tag.title}`,
        meta: [
          { property: 'og:title', content: `#${this.$page.tag.title} | devlog.akasai` },
          { name: 'keywords', content: this.$page.tag.title },
        ],
      }
    },
  })
  export default class Tag extends V {
    constructor() {
      super()
    }
  }
</script>

<page-query>
  query Tag ($id: ID!) {
  tag (id: $id) {
  title
  belongsTo {
  edges {
  node {
  ...on Post {
  id
  title
  category
  timeToRead
  description
  tags {
  title
  }
  date (format: "MMM DD dd, YYYY" locale: "ko-KR")
  path
  }
  }
  }
  }
  }
  }
</page-query>

<style lang="scss">
  .tags {
    width: 100%;
    max-width: var(--width-size);
    margin: 8.5rem auto 0 auto;

    .top-ads {
      height: 200px;
      margin: 30px 0;
    }

    h1#title {
      font-size: 2.5rem;
      margin: 0 !important;
      text-align: center;
    }

    .posts {
      min-height: 500px;
      margin-top: 20px;
    }
  }
</style>
