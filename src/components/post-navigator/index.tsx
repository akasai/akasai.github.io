import { NaviNode } from '@constant'
import { Link } from 'gatsby'
import React from 'react'

import './index.scss'

interface NaviProps {
  next: NaviNode | null
  previous: NaviNode | null
}

export const Navigator: React.FC<NaviProps> = ({ next, previous }: NaviProps) => {
  return (
    <section className="navi__wrapper">
      <ul className="navi__wrapper_content">
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              <span>≪</span>
              <article className="prev">
                <span>previous</span>
                <span>
                  {previous.frontmatter.title}
                </span>
              </article>
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              <article className="next">
                <span>next</span>
                <span>
                  {next.frontmatter.title}
                </span>
              </article>
              <span>≫</span>
            </Link>
          )}
        </li>
      </ul>
    </section>
  )
}
