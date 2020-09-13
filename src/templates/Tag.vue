<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom">
      # {{ $page.tag.title }}
    </h1>

    <div class="posts">
      <PostCard v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
  </Layout>
</template>

<page-query>
  query Tag ($id: ID!) {
    tag (id: $id) {
      belongsTo {
        edges {
          node {
            ...on Post {
              title
              path
              date (format: "D. MMMM YYYY")
              timeToRead
              description
              content
            }
          }
        }
      }
    }
  }
</page-query>

<script>
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    name: 'Tag'
  })
  export default class Tag extends Vue {
    constructor () {
      super()
    }
  }
</script>

<style lang="scss">
</style>
