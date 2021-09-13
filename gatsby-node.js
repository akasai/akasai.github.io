const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const redirects = require('./redirect.json')

exports.onCreateWebpackConfig = function ({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@constant': path.resolve(__dirname, 'src/constant'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@layout': path.resolve(__dirname, 'src/layout'),
        '@assets': path.resolve(__dirname, 'contents/assets'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    }
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({ node, name: `slug`, value })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const isPermanent = true
  const redirectInBrowser = true
  redirects.forEach(({ from: fromPath, to: toPath }) =>
    createRedirect({ fromPath, toPath, isPermanent, redirectInBrowser })
  )

  const component = path.resolve(__dirname, './src/template/post.tsx')
  const { data, error } = await graphql(`{
        allMarkdownRemark (
          filter: { frontmatter: { draft: { ne: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields { slug }
              frontmatter { category series_name }
            }
            previous {
              fields { slug }
              frontmatter { title }
            }
            next {
              fields { slug }
              frontmatter { title }
            }
          }
        }
      }`)

  if (error) throw error

  data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component,
      context: {
        id: node.id,
        slug: node.fields.slug,
        series_name: node.frontmatter.series_name,
        category: node.frontmatter.category,
        previous: next,
        next: previous
      }
    })
  })
}
