<template>
  <Layout>
    <Profile :metaData="$page.metadata"/>
    <section class="posts">
      <Adsense ins-class="main-ads" data-ad-client="ca-pub-7791595479585064" data-ad-slot="3964851503"
               data-full-width-responsive="yes" />
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
  import { Component, Vue } from 'vue-property-decorator'
  import PostItem from '~/components/PostItem.vue'
  import Profile from '~/layouts/Profile.vue'

  class V extends Vue {
    $page: any
    $fetch: any
  }

  @Component<V>({
    name: 'Index',
    components: {
      Profile,
      PostItem,
    },
    metaInfo() {
      return {
        title: 'Home',
        meta: [
          { property: 'og:title', content: 'devlog.akasai' },
        ],
      }
    },
  })
  export default class Index extends V {
    private loadedPosts: any[]
    private currentPage: number

    constructor() {
      super()
      this.loadedPosts = []
      this.currentPage = 1
    }

    created(): void {
      this.loadedPosts.push(...this.$page.allPost.edges)
    }

    async infiniteHandler($state: any): Promise<void> {
      if (this.currentPage + 1 > this.$page.allPost.pageInfo.totalPages) {
        $state.complete()
      } else {
        const { data } = await this.$fetch(`/${this.currentPage + 1}`)
        if (data.allPost.edges.length) {
          this.currentPage = data.allPost.pageInfo.currentPage
          this.loadedPosts.push(...data.allPost.edges)
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
  path
  category
  sub_category
  title
  series_name
  series_num
  description
  date (format: "MMM DD dd, YYYY" locale: "ko-KR")
  timeToRead
  tags {
  title
  }
  }
  }
  }
  }
</page-query>

<style lang="scss">
  .main-ads {
    height: 200px;
  }

  .posts {
    width: 100%;
    max-width: var(--width-size);
    margin: 0 auto 0 auto;
    padding-top: 1.4rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: ease opacity 0.3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
