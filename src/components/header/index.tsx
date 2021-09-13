import { Menu, ThemeToggle } from '@components'
import { HeaderQueryResponse } from '@constant'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const HeadDiv = styled.header`
  width: 100%;
  background-color: var(--app-header-bg-color);
  z-index: 32;
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  padding: 0.75rem 1.5rem 0.5rem;
  box-shadow: 0 3px 5px 0 var(--app-header-border-color);
  justify-content: space-between;
  position: fixed;
  transition: opacity 0.1s ease-out;
  opacity: 0.77;
  backdrop-filter: blur(22px);

  @media only screen and (max-width: 768px) {
  }
`

const HeadRight = styled.span`
  display: inherit;
`

const HeadLeft = styled.span`
  h1 {
    color: #cdd9e5;
    font-size: 13.5px;
    font-weight: 200;
  }
`

export const Header: React.FC = () => {
  const { site: { siteMetadata } } = useStaticQuery<HeaderQueryResponse>(headerQuery)
  return (
    <HeadDiv>
      <HeadLeft>
        <Link to={'/'}>
          <h1>{siteMetadata.site_name}</h1>
        </Link>
      </HeadLeft>
      <HeadRight>
        <ThemeToggle/>
        {/*<Menu/>*/}
      </HeadRight>
    </HeadDiv>
  )
}

const headerQuery = graphql`
  query HeaderQuery { 
    site { 
      siteMetadata { 
        site_name 
      }
    }
  } 
`
