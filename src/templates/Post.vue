<template>
  <Layout>
    <section class="post-wrapper">
      <h1 class="article-title">{{$page.post.title}}</h1>
      <p class="article-date"> Posted {{$page.post.date}} by akasai · <i>{{$page.post.timeToRead}} min read</i></p>
      <!--tool tip 추가-->
      <!-- lastmod -->
      <!--      {%- capture filename -%}-->
      <!--      {{ page.url | split: "/" | last }}-->
      <!--      {%- endcapture -%}-->

      <!--      {% for item in site.data.updates %}-->
      <!--      {% assign encode_filename = item.filename | url_encode %}-->
      <!--      {% if filename == encode_filename %}-->
      <!--      {% assign lastmod = item.lastmod %}-->
      <!--      {% break %}-->
      <!--      {% endif %}-->
      <!--      {% endfor %}-->

      <!--      {% if lastmod %}-->
      <!--      <div>-->
      <!--        Updated-->
      <!--        {% include timeago.html date=lastmod class="lastmod" tooltip=true %}-->
      <!--      </div>-->
      <!--      {% endif %}-->
      <!-- page views -->
      <!--      {% if site.google_analytics.pv.enabled %}-->
      <!--      <div>-->
      <!--        <span id="pv" class="pageviews"><i class="fas fa-spinner fa-spin fa-fw"></i></span>-->
      <!--        views-->
      <!--      </div>-->
      <!--      {% endif %}-->
      <article v-html="$page.post.content"></article>
    </section>
  </Layout>
</template>

<script>
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    name: 'Post'
  })
  export default class Post extends Vue {
    constructor () {
      super()
    }
  }
</script>

<page-query>
query Post ($path: String!) {
  metadata {
    siteName
    siteDescription
  }
   post: post (path: $path) {
    id
    title
    content
    date (format: "D MMMM YYYY")
    timeToRead
  }
}
</page-query>

<style lang="scss">
  .post-wrapper {
    margin-top: 4rem;
    padding-top: 1rem;

    .article-title {
      margin-bottom: 0;
    }

    .article-date {
      color: var(--app-font-color);
      margin-top: 0;
      font-size: .8em;
    }

    blockquote {
      padding: 10px 20px;
      margin: 0 0 20px;
      font-size: 17.5px;
      border-left: 5px solid #eee;
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
  }
</style>
