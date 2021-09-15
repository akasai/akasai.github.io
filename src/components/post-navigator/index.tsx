import { NaviNode } from '@constant'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface NaviProps {
  next: NaviNode | null
  previous: NaviNode | null
}

const NavigationWrapper = styled.section`
  width: 100%;
  margin: 0 0 2rem 0;
`

const NaviUl = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0 0.5rem;

  li {
    width: 47%;
  }
`

const NavContent = styled.nav`
  flex: 10;

  & > * {
    display: block;
  }
`

const NavLink = styled(Link)`
  color: var(--title-font-color);
  font-size: 1.7rem;
  padding: 10px 15px;
  border-radius: 3px;
  border: 1px solid var(--app-main-border-color);
  height: 6.5rem;
  display: flex;
  
  &:hover {
    border-bottom-color: var(--app-main-border-color);;
  }
`

const Icon = styled.span`
  flex: 1;
  margin: auto !important;
  text-align: center;
`

const NextContents = styled(NavContent)`
  text-align: left;
`

const PrevContents = styled(NavContent)`
  text-align: right;
`

const Label = styled.span`
  font-size: 1.1rem;
  color: var(--info-font-color);
`

const Title = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 300px;
  margin: 0;
  font-weight: 700;
  padding: 0 5px;

  @media only screen and (max-width: 768px) {
    width: auto !important;
    max-width: 120px !important;
    font-size: 1.5rem;
  }
`

export const Navigator: React.FC<NaviProps> = ({ next, previous }: NaviProps) => {
  return (
    <NavigationWrapper>
      <NaviUl>
        <li>
          {previous && (
            <NavLink to={previous.fields.slug}>
              <Icon>≪</Icon>
              <PrevContents>
                <Label>previous</Label>
                <Title>{previous.frontmatter.title}</Title>
              </PrevContents>
            </NavLink>
          )}
        </li>
        <li>
          {next && (
            <NavLink to={next.fields.slug}>
              <NextContents>
                <Label>next</Label>
                <Title>{next.frontmatter.title}</Title>
              </NextContents>
              <Icon>≫</Icon>
            </NavLink>
          )}
        </li>
      </NaviUl>
    </NavigationWrapper>
  )
}
