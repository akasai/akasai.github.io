import React from 'react'
import styled from 'styled-components'
import { contentText } from './mixin'

interface PostContentsProps {
  html: string
}

export const PostContents = React.memo<PostContentsProps>(({ html }) => (
  <PostContent dangerouslySetInnerHTML={{ __html: html }}/>
))


const PostContent = styled.article`
  @media only screen and (max-width: 768px) {
    padding: 0 12px;
  }

  font-size: 1.5rem;
  margin-top: 10px;
  
  ${contentText};
`
