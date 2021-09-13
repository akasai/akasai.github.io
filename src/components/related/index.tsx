import { Related, RelatedNode } from '@constant'
import { Link } from 'gatsby'
import React from 'react'

import './index.scss'

interface RelatedProps {
  category: string
  relatedList: RelatedNode[]
}

export const RelatedPost: React.FC<RelatedProps> = ({ category, relatedList }: RelatedProps) => {
  const randomList = (relatedList || []).sort(() => Math.random() - Math.random())
    .slice(0, 3)

  return (
    <section className="related">
      <h3 id="title">{category ? `"${category}"` : ``} Related Articles</h3>
      <article className="related__wrapper">
        <ul>
          {randomList.map(({ fields: { slug }, frontmatter }, idx) => {
            return (
              <li key={idx}>
                <Link to={slug}>
                  <RelatedContent data={frontmatter} />
                </Link>
              </li>
            )
          })}
        </ul>
      </article>
    </section>
  )
}

const RelatedContent: React.FC<{ data: Related }> = ({ data }) => {
  const { date, title } = data
  return (
    <section className="related_content">
      <h6 id="date">{date}</h6>
      <h3 id="title">{title}</h3>
    </section>
  )
}
