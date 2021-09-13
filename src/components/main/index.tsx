import { ChildrenProps } from '@constant'
import React from 'react'
import styled from 'styled-components'

interface MainProps extends ChildrenProps {
}

const MainWrapper = styled.section`
  display: flex;

  @media only screen and (max-width: 1200px) {
    padding: 0 8px;
  }
`

const Aside = styled.aside`
  padding: 0 10px;
  margin: 8.5rem 10px 0 10px;
  flex: 1;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <MainWrapper>
      <Aside/>
      {children}
      <Aside/>
    </MainWrapper>
  )
}
