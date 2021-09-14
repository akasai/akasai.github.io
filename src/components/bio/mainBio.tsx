import Github from '@assets/svg/github.svg'
import Hackerrank from '@assets/svg/hackerrank.svg'
import Instagram from '@assets/svg/instagram.svg'
import Mail from '@assets/svg/mail.svg'
import Map from '@assets/svg/map.svg'
import User from '@assets/svg/user.svg'
import { TagListSmall } from '@components'
import { BioQueryResponse } from '@constant'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

export const MainBio: React.FC = () => {
  const { avatar, site } = useStaticQuery<BioQueryResponse>(bioQuery)
  const image = getImage(avatar) as IGatsbyImageData
  const { siteMetadata } = site
  const ICON_MAP: { [key: string]: JSX.Element } = {
    'github': <Github/>,
    'hackerrank': <Hackerrank/>,
    'instagram': <Instagram/>
  }

  const linkList: JSX.Element[] = Object.entries(siteMetadata.link).map(([k, url], i) => {
    return (<ContactList key={i}><a href={url} target="_blank">{ICON_MAP[k]}</a></ContactList>)
  })

  return (
    <BioWrapper>
      <LayoutSection>
        <li>
          <ProfileImageWrapper>
            <GatsbyImage image={image} alt=""/>
          </ProfileImageWrapper>
        </li>
        <li>
          <ProfileContentWrapper>
            <h2>
              {siteMetadata.nickname}
            </h2>
            <InfoSection name={siteMetadata.name} mail={siteMetadata.mail} location={siteMetadata.location}/>
            <Description>
              {siteMetadata.description}
            </Description>
            <TagListSmall tagList={siteMetadata.skills}/>
            <ContactWrapper>
              <ul>
                {linkList}
              </ul>
            </ContactWrapper>
          </ProfileContentWrapper>
        </li>
      </LayoutSection>
    </BioWrapper>
  )
}

const InfoSection: React.FC<{ name: string, mail: string, location: string }> = (obj) => {
  const { name, mail, location } = obj
  return (
    <InfoWrapper>
      <ul>
        {/*<li>*/}
        {/*  <User/> {name}*/}
        {/*</li>*/}
        <li>
          <Mail/>
          <a href={`mailto:${mail}`}>{mail}</a>
        </li>
        <li>
          <Map/> {location}
        </li>
      </ul>
    </InfoWrapper>
  )
}

const BioWrapper = styled.article`
  margin: 5rem 1rem 2.5rem 1rem
`

const LayoutSection = styled.ul`
  display: flex;

  > li {
    display: inline-block;

    &:first-child {
      //flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
    }

    &:last-child {
      position: relative;
      padding-left: 8px;
      //flex: 2.5;
      width: 70%;
    }
  }
`

const ProfileImageWrapper = styled.section`
  display: inline-block;
  text-align: center;
  width: 100%;

  img {
    border-radius: 50%;
    width: 65% !important;
    margin: auto;
  }
`

const ProfileContentWrapper = styled.section`
  //display: inline-block;
  //margin-top: 10px;
  //width: 100%;

  h2 {
    color: var(--app-font-color);
    font-size: 3.2rem;
  }

  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 2.2rem;
    }
  }
`

const Description = styled.p`
  font-size: 1.75rem;

  @media only screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const InfoWrapper = styled.section`
  font-size: 1.3rem;
  margin: 0 0 8px 2px;
  color: var(--info-font-color);

  ul > li {
    margin-right: 15px;

    svg {
      width: 1rem;
      margin-right: 3px;
      vertical-align: middle;
    }

    a {
      color: inherit;
      padding-left: 2px;
    }
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const ContactWrapper = styled.section`
  margin: 5px 10px 0 0;
  float: right;

  @media only screen and (max-width: 768px) {
    margin-top: 0;
  }
`

const ContactList = styled.li`
  margin-left: 10px;
  width: 20px;

  a {
    width: inherit;
    color: var(--app-font-color);
  }
`

const bioQuery = graphql`
query BioQuery {
  avatar: file(absolutePath: { regex: "/profile.jpeg/" } ) {
    childImageSharp {
      gatsbyImageData( width : 200 placeholder: BLURRED formats: [AUTO, WEBP] )
    }
  }
  site {
    siteMetadata {
      nickname
      name
      mail
      location
      description
      skills
      link {
        github
        hackerrank
        # leetcode
        instagram
      }
    }
  }
}
`
