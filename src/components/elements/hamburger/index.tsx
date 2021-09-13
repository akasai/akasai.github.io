import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  margin-left: 15px;
  
  svg {
    fill: #cdd9e5;
  }
`

export const Menu: React.FC = () => <Wrapper> <HamburgerIcon/> </Wrapper>

const HamburgerIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
  </svg>
)
