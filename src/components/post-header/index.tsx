import Clock from '@assets/svg/clock.svg'
import { HitCounter } from "@components"
import React from 'react'
import styled from 'styled-components'

interface PostHeaderProps {
  data: {
    category: string
    title: string
    date: string
    timeToRead: number
    url: string
  }
}

export const PostHeader = React.memo<PostHeaderProps>(({ data }) => {
  const { category, title, date, timeToRead, url } = data
  return (
    <PostHeaderSection>
      <PostCategory>{category}</PostCategory>
      <PostTitle>{title}</PostTitle>
      <PostDate>
        <Clock className="icon"/>{date} · {timeToRead} min read
        {/*{{edited($page.post)}}*/}
      </PostDate>
      <HitCounter url={url}/>
    </PostHeaderSection>
  )
})

const PostHeaderSection = styled.section`
  padding: 20px 0 0;

  @media only screen and (max-width: 768px) {
    padding: 10px 10px 0;
  }
`

const PostCategory = styled.h3`
  margin: 0 0 10px 3px;
  font-weight: 400;
  font-size: 1.4rem;
  color: var(--category-font-color)
`

const PostTitle = styled.h1`
  font-size: 2.8rem;
  color: var(--title-font-color);
  margin-bottom: 8px;
  display: inline-block;
`

const PostDate = styled.span`
  font-size: 1.3rem;
  color: var(--info-font-color);
  margin-bottom: 8px;
  display: block;
  text-align: right;

  .icon {
    width: 1.3rem;
    vertical-align: text-bottom;
    margin-right: 5px;
  }
`
