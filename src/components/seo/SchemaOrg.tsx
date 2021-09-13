import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  author: string
  siteUrl: string
  datePublished: string | undefined
  defaultTitle: string
  description: string
  image: string
  profileImage: string
  isBlogPost: boolean
  title: string
  url: string
}

export default React.memo<Partial<Props>>((obj) => {
  const { author, siteUrl, datePublished, defaultTitle, description, image, profileImage, isBlogPost, title, url } = obj

  const baseSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: defaultTitle,
    },
  ]

  const schema = isBlogPost ? [
    ...baseSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': url,
            name: title,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      url,
      name: title,
      alternateName: defaultTitle,
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      description,
      author: {
        '@type': 'Person',
        name: author,
        image: profileImage,
        url: 'https://github.com/akasai'
      },
      publisher: {
        '@type': 'Person',
        name: author,
        image: profileImage
      },
      mainEntityOfPage: {
        '@type': 'WebSite',
        '@id': siteUrl,
      },
      datePublished,
    },
  ] : baseSchema
  return (
    <Helmet>
      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
})
