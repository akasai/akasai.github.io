<template>
  <Layout>
    <Profile :metaData="$page.metadata"/>
    <section class="posts">
      <PostItem :key="post.node.id" v-for="post in loadedPosts" :post="post.node"/>
    </section>
    <ClientOnly>
      <infinite-loading @infinite="infiniteHandler" spinner="spiral">
        <span slot="no-more">👨‍💻</span>
      </infinite-loading>
    </ClientOnly>
  </Layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import PostItem from '~/components/PostItem.vue'
  import Profile from '~/components/Profile.vue'

  class V extends Vue {
    $page: any
    $fetch: any
  }

  @Component<V>({
    name: 'Index',
    components: {
      Profile,
      PostItem
    },
    metaInfo() {
      return {
        title: 'Home',
        meta: [
          { property: 'og:title', content: 'devlog.akasai' },
        ]
      }
    }
  })
  export default class Index extends V {
    private loadedPosts: any[]
    private currentPage: number
    private readonly adsSlot: any

    constructor () {
      super()
      this.loadedPosts = []
      this.currentPage = 1
      this.adsSlot = {
        node: {
          id: `ads-${Date.now()}`
        }
      }
    }

    created(): void {
      this.loadedPosts.push(this.adsSlot, ...this.$page.allPost.edges)
    }

    async infiniteHandler($state: any): Promise<void> {
      if (this.currentPage + 1 > this.$page.allPost.pageInfo.totalPages) {
        $state.complete()
      } else {
        const { data } = await this.$fetch(`/${this.currentPage + 1}`)
        if (data.allPost.edges.length) {
          this.currentPage = data.allPost.pageInfo.currentPage
          this.loadedPosts.push(this.adsSlot, ...data.allPost.edges)
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    }
  }
</script>

<page-query>
query ($page: Int) {
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
      hackerrank
      leetcode
      instagram
    }
  }
  allPost(perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        category
        series
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

  .fade-enter-active, .fade-leave-active {
    transition: ease opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
