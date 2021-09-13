import React from 'react'
import styled from 'styled-components'

export interface TagsProps {
  tagList: string[]
}

const TagWrapper = styled.section`
  color: var(--app-font-color);
`

const TagUl = styled.ul`
  display: inline-block;
  margin-bottom: 5px;

  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;

  li {
    margin: 0 5px 5px 0;
    border-radius: 3px;
    background: var(--tag-bg-color);
    transition: background-color 0.3s, color 0.3s;
    font-size: 1.25rem;
    padding: 3px 7px;
    display: inline-block;
  }

  @media only screen and (max-width: 768px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const TagListSmall: React.FC<TagsProps> = ({ tagList }) => {
  return (
    <TagWrapper>
      <TagUl>
        {tagList.map((tag, idx) => <li key={idx}> #{tag} </li>)}
      </TagUl>
    </TagWrapper>
  )
}
