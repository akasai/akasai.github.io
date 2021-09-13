import { PreviewQueryResponse } from '@constant'
import { ReactNode } from 'react'

export interface ChildrenProps {
  children: ReactNode
}

export interface PageProps<T = any, K = any> {
  data: T
  pageContext: K
}

export interface Edge<Node = any> {
  node: Node
}

export interface NaviNode {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

export interface SeriesNode {
  fields: {
    slug: string
  }
  frontmatter: SeriesValue
}

export interface SeriesValue {
  date: string
  series_name: string
  series_num: number
  title: string
}

export interface RelatedNode {
  fields: {
    slug: string
  }
  frontmatter: Related
}

export interface Related {
  title: string
  date: string
}

export type Post = Edge<PreviewQueryResponse>
