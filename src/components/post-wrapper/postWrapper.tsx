import { ChildrenProps } from '@constant'
import React from 'react'
import styled from 'styled-components'

interface PostWrapperProps extends ChildrenProps {
}

export const PostWrapper: React.FC<PostWrapperProps> = ({ children }) => {
  // todo: routing등의 설정이 필요할 경우
  return (
    <PostWrapperSection>
      {children}
    </PostWrapperSection>
  )
}

const PostWrapperSection = styled.section`
  min-height: calc(100vh - 15rem);
  max-width: var(--width-size);
  min-width: var(--app-min-width);
  width: 100%;
  margin: 45px auto 0 auto;
  padding-top: 1.4rem;
`
