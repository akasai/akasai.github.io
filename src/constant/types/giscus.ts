import { BOOLEAN_STRING, GISCUS_THEME } from '@constant'

export interface CommentProps {
  data: {
    giscus: Repo
    repo_id: string
    category_id: string
  }
}

export type GiscusConfig = {
  src: 'https://giscus.app/client.js'
  'data-repo': Repo
  'data-repo-id': string
  'data-category': Category
  'data-category-id': string
  'data-mapping': Mapping
  'data-reactions-enabled': BOOLEAN_STRING
  'data-emit-metadata': BOOLEAN_STRING
  'data-theme': GISCUS_THEME
  'data-lang': 'ko'
  crossorigin: 'anonymous'
}

export type Repo = `${string}/${string}`

type Category = 'General'

type Mapping = 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'pathname'

// type BooleanString = '0' | '1'

// type Theme =
// | 'light'
// | 'dark_dimmed'
// | 'dark'
// | 'dark_high_contrast'
// | 'preferred_color_scheme'
// | 'transparent_dark'
// | `https://${string}`
