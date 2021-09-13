import { FooterQueryResponse } from '@constant'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const _Footer = styled.footer`
  font-size: 1.4rem;
  text-align: center;
  border-top: 1px solid var(--app-header-border-color);
  min-width: var(--app-min-width);
  padding-top: 30px;
  margin-bottom: 50px;

  a {
    margin: 0 4px;
    color: gray;
  }
`

export const Footer: React.FC = () => {
  const { site: { siteMetadata } } = useStaticQuery<FooterQueryResponse>(footerQuery)
  return (
    <_Footer>
      <span>
        © 2021 <a target="_blank" className="link" href={siteMetadata.link.github}>{siteMetadata.nickname}</a>,
        Built with <a target="_blank" className="link" href="https://www.gatsbyjs.com">Gatsby</a> -
        <a target="_blank" href="/sitemap.xml">Sitemap</a> │
        <a target="_blank" href="/rss.xml">RSS</a>
      </span>
    </_Footer>
  )
}

const footerQuery = graphql`
  query footerQuery {
    site {
      siteMetadata {
        nickname
        link {
          github
        }
      }
    }
  }
`
