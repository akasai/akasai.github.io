<template>
  <Layout>
    <Profile :metaData="$page.metadata"/>
    <section class="posts">
<!--      <PostList v-for="year in years" :key="year" :year="year"/>-->
      <PostItem :key="post.node.id" v-for="post in $page.allPost.edges" :post="post.node"/>
    </section>
  </Layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import PostList from '~/components/PostList.vue'
  import PostItem from '~/components/PostItem.vue'
  import Profile from '~/layouts/Profile.vue'

  @Component({
    name: 'Index',
    components: {
      Profile,
      PostList,
      PostItem
    },
  })
  export default class Index extends Vue {
    constructor () {
      super()
    }

    // get years () {
    //   const years = {}
    //   const posts = this.$page.allPost.edges
    //   posts.map((post) => {
    //     const year = post.node.date.split(' ')[2]
    //     years[year] = ''
    //   })
    //   return Object.keys(years).sort((a, b) => b - a)
    // }
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
