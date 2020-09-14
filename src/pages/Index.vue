<template>
  <Layout>
    <Profile :metaData="$page.metadata"/>
    <section class="posts">
      <PostItem :key="post.node.id" v-for="post in $page.allPost.edges" :post="post.node"/>
    </section>
  </Layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import PostItem from '~/components/PostItem.vue'
  import Profile from '~/components/Profile.vue'

  @Component({
    name: 'Index',
    components: {
      Profile,
      PostItem
    },
  })
  export default class Index extends Vue {
    constructor () {
      super()
    }
  }
</script>

<page-query>
query {
  metadata {
    siteName
    siteDescription
    nickname
    name
    mail
    description
    location
    skills
    link {
      github
      instagram
      hackerrank
    }
  }
  allPost(filter: { date: { gte: "2020" }}) {
    totalCount
    edges {
      node {
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
</page-query>

<style lang="scss">
  .posts {
    padding-top: 1rem;
  }
</style>
