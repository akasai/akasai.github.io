import { NaviNode, RelatedNode, SeriesNode } from '@constant'
import { Repo } from '@constant/types'
import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks'

export interface SEOResponse {
  site: {
    siteMetadata: {
      nickname: string
      profile_url: string
      site_name: string
      site_description: string
      siteUrl: string
      site_image: string
    }
  }
}

export interface HeaderQueryResponse {
  site: {
    siteMetadata: {
      site_name: string
    }
  }
}

export interface FooterQueryResponse {
  site: {
    siteMetadata: {
      nickname: string
      link: {
        github: string
      }
    }
  }
}

export interface BioQueryResponse {
  avatar: ImageDataLike
  site: {
    siteMetadata: MetaData
  }
}

interface MetaData {
  nickname: string
  name: string
  mail: string
  location: string
  description: string
  skills: string[]
  link: {
    [key: string]: string
  }
}

export interface PreviewQueryResponse {
  id: string
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    category: string
    sub_category: string
    title: string
    tags: string[]
    date: string
  }
  timeToRead: number
}

export interface PageContext {
  id: string
  series_name: string
  category: string
  slug: string
  next: NaviNode | null
  previous: NaviNode | null
}

export interface PostQueryResponse {
  site: {
    siteMetadata: {
      siteUrl: string
      comment: {
        giscus: Repo
        repo_id: string
        category_id: string
      }
    }
  }
  post: {
    id: string
    excerpt: string
    timeToRead: number
    html: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      tags: string[]
      date: string
      series_num: number
    }
    headings: {
      value: string
      depth: number
      id: string
    }[]
  }
  series: {
    nodes: SeriesNode[]
  }
  related: {
    nodes: RelatedNode[]
  }
}
