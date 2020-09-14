<template>
  <Layout>
    <section class="tags">
    <h1> # {{ $page.tag.title }} </h1>
    <section class="posts">
      <article v-if="!$page.tag.belongsTo.edges.length" class="no-result">⚠️ No Contents</article>
      <PostItem v-else v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
    </section>
    </section>
  </Layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import PostItem from '~/components/PostItem.vue'

  @Component({
    name: 'Tag',
    components: {
      PostItem
    }
  })
  export default class Tag extends Vue {
    constructor () {
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
    padding-top: 8rem;

    h1 {
      text-align: center;
    }

    .posts {
      min-height: 500px;
      margin-top: 20px;
    }
  }
</style>
