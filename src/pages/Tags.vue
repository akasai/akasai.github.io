<template>
  <Layout>
    <section class="tags">
      <h1 id="title">Tags</h1>
      <!-- ads 상단 -->
      <Adsense :ad-class="'top-ads'" :ad-slot="3964851503"/>
      <section class="tags__content">
        <!--        <Tag :tagList="list($static.tags.edges)" :size="'large'"/>-->
        <Tag :tagList="$static.tags.edges.map(({node}) => node)" :size="'large'"/>
      </section>
    </section>
  </Layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Adsense from '../components/Adsense.vue'
  import Tag from '../components/Tag.vue'

  class V extends Vue {
    $static: any
  }

  @Component<V>({
    name: 'Tags',
    components: {
      Adsense,
      Tag,
    },
    metaInfo() {
      const tags = this.$static.tags.edges.map((node: any) => node.title).join(',')
      return {
        title: 'Tags',
        meta: [
          { name: 'description', content: String(tags).slice(0, 320), vmid: 'description' },
          { name: 'keywords', content: tags || '' },
          { property: 'og:title', content: 'Tags | devlog.akasai' },
          { property: 'og:description', content: String(tags).slice(0, 320) },
        ],
      }
    },
  })
  export default class Tags extends V {
    constructor() {
      super()
    }

    // list(data: any[]) {
    //   data.forEach(({ node }) => {
    //     node.count = node.belongsTo.edges.length
    //     delete node.belongsTo
    //   })
    //
    //   return data.map(({ node }) => node).sort((a, b) => b.count - a.count)
    // }
  }
</script>

<static-query>
  query {
  tags: allTag {
  edges {
  node {
  title
  path
  belongsTo {
  edges {
  node {
  id
  }
  }
  }
  }
  }
  }
  }
</static-query>

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
      margin: 20px 0;
    }

    &__content {
      min-height: 500px;

      ul {
        display: inline-block;
        width: 100%;

        li {
          font-size: 1.5rem;
          width: auto;
          max-width: none;
          display: inline-block;
          margin-right: 6px;
          margin-bottom: 5px;
          padding: 5px 9px;
          border-radius: 3px;
          border: 1px solid var(--tag-bg-color);
          cursor: pointer;

          &:hover {
            background: var(--tag-bg-color);
            transition: color 0.35s ease-in-out;
          }

          * {
            color: var(--app-font-color);
          }
        }
      }
    }
  }
</style>
