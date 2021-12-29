import {
  Clap,
  Comment,
  Main,
  Navigator,
  PostBio,
  PostContents,
  PostHeader,
  PostTagList,
  PostWrapper,
  SEO
} from '@components'
import { PageContext, PageProps, PostQueryResponse } from '@constant'
import Layout from '@layout'
import { graphql } from 'gatsby'
import 'katex/dist/katex.min.css'
import React from 'react'

import '../styles/markup.scss'

const PostTemplate: React.FC<PageProps<PostQueryResponse, PageContext>> = React.memo(({ pageContext, data }) => {
  const { series_name, category, next, previous } = pageContext
  const { site, post, series, related } = data
  const { siteMetadata: { siteUrl, comment } } = site
  const { id, html, excerpt, timeToRead, fields: { slug }, frontmatter: { title, tags, series_num, date } } = post

  const headerData = { category, title, date, timeToRead, url: `${siteUrl}${slug.replace(/\/$/g,'')}` }
  const postMeta = {
    title,
    description: excerpt,
    slug: slug.replace(/\/$/g,''), //.replace(/[^\w\d-]/g, ''),
    tags,
    created_at: date
  }

  return (
    <Layout>
      <SEO postMeta={postMeta} isBlogPost/>
      <Main>
        <PostWrapper>
          <PostHeader data={headerData}/>
          <hr/>
          <PostContents html={html}/>
          <PostTagList tagList={tags}/>
          <Clap slug={slug}/>
          {/*<RelatedPost category={category} relatedList={related.nodes}/>*/}
          <hr/>
          <PostBio/>
          {/*/!* TODO: share*!/*/}
          <hr/>
          <Navigator next={next} previous={previous}/>
          <Comment repo={comment.utterances}/>
        </PostWrapper>
      </Main>
    </Layout>
  )
})


export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String! $slug: String! $category: String) {
    site {
      siteMetadata {
        siteUrl
        comment {
          utterances
        }
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 128)
      timeToRead
      html
      fields {
        slug
      }
      frontmatter {
        title
        series_num
        date(formatString: "MMM DD. YYYY")
        tags
      }
      headings {
        value
        depth
        id
      }
    }

    related: allMarkdownRemark(
      filter: {id: {ne: $id} frontmatter: {category: {eq: $category}}}
      limit: 8
    ) {
      nodes {
         fields {
           slug
         }
         frontmatter {
          title
          date(formatString: "MMM DD. YYYY")
        }
      }
    }
  }
`

// {
// !!series.nodes.length &&
// <Series seriesName={series_name} curSeriesNum={series_num} seriesList={series.nodes}/>
// }

// series: allMarkdownRemark(
//   filter: {frontmatter: {series_name: {eq: $series_name ne: ""}}}
// sort: {order: ASC, fields: frontmatter___series_num}
// ) {
//   nodes {
//     fields {
//       slug
//     }
//     frontmatter {
//       title
//       series_name
//       series_num
//       date(formatString: "MMM DD. YYYY")
//     }
//   }
// }
