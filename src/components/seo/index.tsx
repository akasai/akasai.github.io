import { SEOResponse } from '@constant'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import SchemaOrg from './SchemaOrg'

interface SEOProps {
  postMeta?: {
    title: string
    description: string
    slug: string
    main_image?: string
    tags: string[]
    created_at: string
  }
  isBlogPost?: boolean
}

export const SEO: React.FC<SEOProps> = ({ postMeta = {}, isBlogPost = false }) => {
  const { site: { siteMetadata: seo } } = useStaticQuery<SEOResponse>(seoQuery)
  const title = isBlogPost ? `${postMeta.title} | ${seo.site_name}` : seo.site_name
  const description = postMeta.description || seo.site_description
  const url = postMeta.slug ? `${seo.siteUrl}/${postMeta.slug}/` : seo.siteUrl
  const profileImage = `${seo.siteUrl}/${seo.profile_url}`
  const image = postMeta.main_image ? `${seo.siteUrl}${postMeta.main_image}` : seo.site_image
  const keywords = postMeta.tags ? postMeta.tags.join(',') : 'web,blog,tech,node-js,typescript,backend'
  const datePublished = postMeta ? postMeta.created_at : undefined

  return (
    <React.Fragment>
      <Helmet>
        {/*General tags*/}
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="author" content={seo.nickname}/>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="image" content={image}/>
        <link rel="canonical" href={url}/>
        <meta name="viewport"
              content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"/>

        {/* OpenGraph tags */}
        <meta property="og:article:author" content={seo.nickname}/>
        <meta property="og:url" content={url}/>
        {isBlogPost ? <meta property="og:type" content="article"/> : null}
        <meta property="og:site_name" content={seo.site_name}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={image}/>
        {/*  <meta property="fb:app_id" content={seo.social.fbAppID} />*/}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content={seo.nickname}/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={image}/>
      </Helmet>
      <SchemaOrg
        isBlogPost={isBlogPost}
        title={title}
        defaultTitle={seo.site_name}
        url={url}
        author={seo.nickname}
        profileImage={profileImage}
        description={description}
        image={image}
        siteUrl={seo.siteUrl}
        datePublished={datePublished}
      />
      {/*<Scripts/>*/}
    </React.Fragment>
  )
}

const seoQuery = graphql`
query seoQuery {
  site {
    siteMetadata {
      nickname
      profile_url
      site_name
      site_description
      siteUrl
      site_image
    }
  }
}
`



