import { TagsProps } from '@components'
import React from 'react'
import styled from 'styled-components'
import Tags from '@assets/svg/tags.svg'

const TagWrapper = styled.section`
  color: var(--app-font-color);
  margin: 8rem 0 2rem;
  display: flex;

  @media only screen and (max-width: 768px) {
    padding-left: 12px;
  }
`

const TagUl = styled.ul`
  display: inline-block;
  align-items: center;

  li {
    margin: 0 5px 5px;
    border-radius: 25px;
    background: var(--tag-bg-color);
    transition: background-color 0.3s, color 0.3s;
    font-size: 1.45rem;
    padding: 3px 14px;
    display: inline-block;
  }
`

const Icon = styled.span`
  display: inline-block;
  padding-top: 5px;
  
  svg {
    width: 2.2rem;
    margin-right: 3px;
  }
`

export const PostTagList: React.FC<TagsProps> = ({ tagList }) => {
  return (
    <TagWrapper>
      <Icon>
        <Tags/>
      </Icon>
      <TagUl>
        {tagList.map((tag, idx) => <li key={idx}> #{tag} </li>)}
      </TagUl>
    </TagWrapper>
  )
}
