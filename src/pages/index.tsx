import { Main, PostListWrapper } from '@components'
import { SEO } from '@components/seo'
import { Edge, PreviewQueryResponse } from '@constant'
import Layout from '@layout'
import { graphql } from 'gatsby'
import React from 'react'

interface MainProps {
  data: {
    post: {
      edges: Edge<PreviewQueryResponse>[]
    }
  }
}

const App: React.FC<MainProps> = ({ data }) => {
  const { post } = data
  return (
    <Layout>
      <SEO/>
      <Main>
        <PostListWrapper rawPost={post.edges}/>
      </Main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    post: allMarkdownRemark (
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 128)
          frontmatter {
            category
            sub_category
            title
            tags
            date(formatString: "MMM DD. YYYY")
          }
          timeToRead
        }
      }
    }
  }
`

export default App
/*
allMarkdownRemark(
  sort: { fields: [frontmatter___date], order: DESC }
filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
) {
  edges {
    node {
      excerpt(pruneLength: 200, truncate: true)
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        category
        draft
      }
    }
  }
}*/
