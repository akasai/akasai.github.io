<template>
  <Layout>
    <article class="post__wrapper">
      <aside class="left">
        <!-- ads 좌측 -->
        <!--        <Adsense ins-class="left-ads" data-ad-client="ca-pub-7791595479585064" data-ad-slot="5250685461"-->
        <!--                 data-full-width-responsive="yes"/>-->
      </aside>
      <section class="post">
        <section class="post__title">
          <h3 id="category">{{getCategory($page.post.category, $page.post.sub_category)}}</h3>
          <h1 id="title">{{$page.post.title}}</h1>
          <h4 id="series" v-if="$page.post.series_name">{{getSeriesTitle($page.post.series_name,
            $page.post.series_num)}}</h4>
          <span class="post__title-info">
            <ul>
              <li>
                <User class="icon"/> akasai
              </li>
              <li>
                 <Clock class="icon"/>{{$page.post.date}}
                  {{edited($page.post)}} · {{$page.post.timeToRead}} min read
              </li>
            </ul>
          </span>
          <Tag :tagList="$page.post.tags" :useIcon="true"/>
        </section>
        <Series v-if="$page.series.edges.length > 1" :series="$page.series" :cur_series_num="$page.post.series"/>
        <!-- ads 상단 -->
        <!--        <Adsense ins-class="top-ads" data-ad-client="ca-pub-7791595479585064" data-ad-slot="1631172523"-->
        <!--                 data-full-width-responsive="yes"/>-->
        <section class="post__content">
          <article v-html="$page.post.content"></article>
        </section>
        <!-- ads 하단 -->
        <!--        <Adsense ins-class="bottom-ads" data-ad-client="ca-pub-7791595479585064" data-ad-slot="6759499833"-->
        <!--                 data-full-width-responsive="yes"/>-->
        <Related v-if="$page.related.edges.length" :related="$page.related" :category="$page.post.category"/>
        <Comment/>
      </section>
      <aside class="right">
        <RightBar :headings="$page.post.headings"/>
      </aside>
    </article>
  </Layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Comment from '~/components/Comment.vue'
  import Related from '~/components/Related.vue'
  import RightBar from '~/components/RightBar.vue'
  import Series from '~/components/Series.vue'
  import Tag from '~/components/Tag.vue'
  import Clock from '../assets/svg/clock.svg'
  import Tags from '../assets/svg/tags.svg'
  import User from '../assets/svg/user.svg'

  class V extends Vue {
    $page: any
  }

  @Component<V>({
    name: 'Post',
    components: {
      Related,
      Series,
      RightBar,
      Comment,
      User,
      Clock,
      Tags,
      Tag,
    },
    metaInfo() {
      const tags = this.$page.post.tags.map((tag: any) => tag.title).join(',')
      const text = (this.$page.post.content || '')
        .replace(new RegExp('<(/)?([a-zA-Z0-9]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>', 'ig'), '')
        .replace(new RegExp('\\s+|\n', 'ig'), ' ')

      return {
        title: this.$page.post.title,
        meta: [
          { name: 'description', content: `${String(text).slice(0, 150)}...`, vmid: 'description' },
          { name: 'keywords', content: tags || '' },
          { property: 'og:title', content: `${this.$page.post.title} | devlog.akasai` },
          { property: 'og:description', content: `${String(text).slice(0, 150)}...` },
        ],
      }
    },
  })
  export default class Post extends V {
    constructor() {
      super()
    }

    getCategory(main: string, sub: string): string {
      return `${main}${sub ? ` / ${sub}` : ''}`
    }

    getSeriesTitle(name: string, num: number): string {
      return name ? `${name} #${num}` : ''
    }

    edited(post: { date: string, update_date: string }): string {
      const { date, update_date } = post
      if (!update_date) return ''
      return date !== update_date ? '(edited)' : ''
    }
  }
</script>

<page-query>
  query Post ($path: String!, $category: String!, $series_name: String!, $series_num: Int) {
  post: post (path: $path) {
  id
  category
  sub_category
  title
  series_name
  series_num
  content
  tags {
  title
  path
  }
  date (format: "MMM DD dd, YYYY" locale: "ko-KR")
  update_date (format: "MMM DD dd, YYYY" locale: "ko-KR")
  timeToRead
  headings {
  depth
  value
  anchor
  }
  }
  related: allPost(limit: 8 filter: {path: {ne: $path} category: {regex: $category}}) {
  edges {
  node {
  title
  category
  description
  path
  date (format: "YYYY.MM.DD" locale: "ko-KR")
  }
  }
  }
  series: allPost(filter: {series_name: {eq: $series_name} series_num: {ne: $series_num}} sortBy: "series_num" order:
  ASC) {
  edges {
  node {
  title
  series_num
  path
  date (format: "YYYY.MM.DD" locale: "ko-KR")
  }
  }
  }
  }
</page-query>

<style lang="scss">
  @import '../assets/scss/markup';

  .post__wrapper {
    display: flex;

    .post {
      width: 100%;
      max-width: var(--width-size);
      margin: 8.5rem auto 0 auto;

      &__title {
        padding: 20px 0;
        margin-bottom: 30px;
        border-bottom: 1px solid var(--app-main-border-color);

        h3#category {
          margin: 0 0 5px 7px;
          font-size: 2rem;
          color: var(--category-font-color);
        }

        h1#title {
          font-size: 4rem;
          color: var(--title-font-color);
          margin-bottom: 8px;
          display: inline-block;
        }

        h4#series {
          &:before {
            content: '|';
            margin: 0 7px;
          }

          font-size: 2rem;
          display: inline-block;
          margin: 5px 0;
          color: var(--series-font-color);
        }

        &-info {
          font-size: 1.3rem;
          color: var(--info-font-color);
          margin-bottom: 8px;
          display: block;

          ul {
            margin-top: 10px;

            li {
              margin-right: 20px;

              .icon {
                width: 1.3rem;
                vertical-align: text-bottom;
                margin-right: 5px;
              }
            }
          }
        }
      }

      .top-ads, .bottom-ads {
        height: 200px;
        width: 100%;
      }

      &__content {
        font-size: 1.7rem;
        border-bottom: 1px solid var(--app-main-border-color);

        a {
          font-weight: bold;
        }
      }
    }

    .right, .left {
      padding: 0 10px;
      margin: 8.5rem 10px 0 10px;
      flex: 1;
    }

    .left-ads {
      width: 200px;
      margin: auto;
    }
  }

  @media all and (max-width: 1200px) {
    .right, .left {
      display: none;
    }
  }
</style>
