import { TagListSmall } from '@components'
import { BioQueryResponse } from '@constant'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

export const PostBio: React.FC = () => {
  const { avatar, site } = useStaticQuery<BioQueryResponse>(bioQuery)
  const image = getImage(avatar) as IGatsbyImageData
  const { siteMetadata } = site

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
            <Description>
              {siteMetadata.description}
            </Description>
            <TagListSmall tagList={siteMetadata.skills}/>
          </ProfileContentWrapper>
        </li>
      </LayoutSection>
    </BioWrapper>
  )
}

const BioWrapper = styled.article`
  margin: 3rem 0.5rem 2rem;
`

const LayoutSection = styled.ul`
  display: flex;

  > li {
    display: inline-block;

    &:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
    }

    &:last-child {
      position: relative;
      padding-left: 8px;
      width: 75%;
    }
  }
`

const ProfileImageWrapper = styled.section`
  display: inline-block;
  text-align: center;
  width: 60%;

  img {
    border-radius: 20%;
    width: 85%;
    margin: auto;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const ProfileContentWrapper = styled.section`
  h2 {
    color: var(--app-font-color);
    font-size: 2.5rem;
    margin-bottom: 2px;
    
    &:before {
      content: 'written by ';
      font-size: 1.4rem;
      font-weight: 200;
    }
  }

  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
    }
  }
`

const Description = styled.p`
  font-size: 1.75rem;
  font-weight: 200;

  @media only screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const bioQuery = graphql`
query PostBioQuery {
  avatar: file(absolutePath: { regex: "/profile.jpeg/" } ) {
    childImageSharp {
      gatsbyImageData( width : 200 placeholder: BLURRED formats: [AUTO, WEBP] )
    }
  }
  site {
    siteMetadata {
      nickname
      description
      skills
    }
  }
}
`
