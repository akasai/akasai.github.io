<template>
  <Layout>
    <RightBar :headings="$page.post.headings"/>
    <section class="post">
      <section class="post__title">
        <h3>{{$page.post.category}}</h3>
        <h1>{{$page.post.title}}</h1>
        <span class="post__title-info">
          <ul>
            <li>
              <User class="icon"/> akasai
            </li>
            <li>
              <Clock class="icon"/>{{$page.post.date}}  {{edited($page.post)}} · <i>{{$page.post.timeToRead}} min read</i>
            </li>
          </ul>
        </span>
        <section class="post__title-tag" v-if="$page.post.tags.length">
          <Tags class="icon"/>
          <ul>
            <li v-for="tag in $page.post.tags">
              <g-link :to="tag.path">
                {{tag.title}}
              </g-link>
            </li>
          </ul>
        </section>
      </section>
      <section class="post__content">
        <article v-html="$page.post.content"></article>
      </section>
    </section>
    <Related :related="$page.related" :category="$page.post.category"/>
    <Comment/>
  </Layout>
</template>

<script lang="ts">
  import User from '../assets/svg/user.svg'
  import Clock from '../assets/svg/clock.svg'
  import Tags from '../assets/svg/tags.svg'
  import { Component, Vue } from 'vue-property-decorator'
  import RightBar from '~/components/RightBar.vue'
  import Related from '~/components/Related.vue'
  import Comment from '~/components/Comment.vue'

  class V extends Vue {
    $page: any
  }

  @Component<V>({
    name: 'Post',
    components: {
      Related,
      RightBar,
      Comment,
      User,
      Clock,
      Tags,
    },
    metaInfo() {
      const tags = this.$page.post.tags.map((tag: any) => tag.title).join(',')
      let text = this.$page.post.content || ''
      text = text.replace(new RegExp('<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>', 'ig'), '')
      text = text.replace(new RegExp('\s+|\n', 'ig'), ' ')

      return {
        title: this.$page.post.title,
        meta: [
          { name: 'description', content: String(text).slice(0, 320), vmid: 'description' },
          { name: 'keywords', content: tags || '' },
          { property: 'og:title', content: `${this.$page.post.title} | devlog.akasai` },
          { property: 'og:description', content: String(text).slice(0, 320) },
        ],
      }
    },
  })
  export default class Post extends V {

    constructor() {
      super()
    }

    edited(post: { date: string, update_date: string }): string {
      const { date, update_date } = post
      if (!update_date) return ''
      return date !== update_date ? '(edited)' : ''
    }
  }
</script>

<page-query>
  query Post ($path: String!, $category: String!) {
  post: post (path: $path) {
  id
  title
  category
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
  related: allPost(limit: 10 filter: {category: {regex: $category}}) {
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
  }
</page-query>

<style lang="scss">
  ul {
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  .post {
    margin-top: 4rem;
    padding-top: 1rem;

    &__title {
      margin-top: 20px;
      border-bottom: 1px solid var(--main-border-color);
      padding-bottom: 20px;

      h3 {
        margin: 0 0 5px 0;
        font-size: 1.5rem;
        color: var(--category-color);
      }

      h1 {
        font-size: 2.5rem;
      }

      &-info {
        font-size: 0.8rem;

        ul {
          margin-top: 10px;
          color: var(--post-list-text-color);

          li {
            margin-right: 20px;

            .icon {
              width: 15px;
              vertical-align: text-bottom;
              margin-right: 5px;
            }
          }
        }
      }

      &-tag {
        font-size: 0.7rem;
        margin-top: 10px;

        svg {
          width: 15px;
          vertical-align: text-bottom;
        }

        ul {
          width: 90%;
          margin-left: 8px;
        }

        ul > li {
          color: var(--app-font-color);
          font-size: 0.9rem;
          margin-right: 4px;
          padding: 3px 8px;
          border-radius: 3px;
          background: var(--tag-bg-color);

          * {
            color: var(--app-font-color);
          }
        }
      }
    }

    &__content {
      margin-top: 30px;
      border-bottom: 1px solid var(--main-border-color);

      .article-date {
        color: var(--app-font-color);
        margin-top: 0;
        font-size: .8em;
      }

      blockquote {
        padding: 0 20px;
        margin: 0 0 20px;
        font-size: 1rem;
        border-left: 5px solid #eee;
      }

      h2 {
        color: #3871bf;
      }

      table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
      }

      th {
        vertical-align: bottom;
        border-bottom: 2px solid #ddd;
      }

      td {
        border-top: 1px solid #ddd;
        padding: 8px;
        line-height: 1.42857143;
        vertical-align: top;
      }

      tr:nth-child(odd) td {
        background-color: #f9f9f9;
      }

      img {
        width: 80%;
        display: block;
        margin: 10px auto;
      }

      code[class*="language-text"] {
        padding: 3px 8px;
        white-space: pre-line;
        word-break: break-all;
      }

      code[class*="language-"], pre[class*="language-"] {
        color: var(--code-text-color);
        background: var(--code-color);
        text-shadow: 0 1px var(--code-shadow-color);
        font-size: 0.8rem;

        .operator {
          background: none;
        }
      }

      .reference {
        display: inline-block;
        margin: 0;
        padding: 0;

        * {
          color: var(--reference-link-color);
        }

        a:before {
          content: '🔗';
          margin-right: 10px;
        }
      }
    }
  }

  @media all and (max-width: 400px) {
    code[class*="language-"], pre[class*="language-"] {
      white-space: pre !important;
      font-size: 0.8rem;
    }
  }
</style>
