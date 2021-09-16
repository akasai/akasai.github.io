import { ClapButton, Provider } from '@lyket/react'
import React from 'react'
import styled from 'styled-components'

const ClapWrapper = styled.span`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 3rem 0;

  & button:hover {
    background-color: var(--anchor-font-color);
    opacity: 1;
  }

  & svg {
    fill: var(--app-font-color);
  }

  & > div {
    div:first-child > div {
      color: var(--app-font-color);
      background-color: rgba(173, 228, 255, 0.58);
    }

    div:last-child {
      color: var(--app-font-color);
      font-family: 'Roboto Condensed', sans-serif;
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`

export const Clap: React.FC<{ slug: string }> = ({ slug }) => {
  const API_KEY = 'pt_583fb73d3cbb3c2382193195fa54e4'
  const NAMESPACE = 'post'
  const ID = () => {
    const urls = slug.split('/').filter((u) => u)
    const lastDomain = urls[urls.length - 1]
    return lastDomain.replace('_', '-')
  }

  const defaultTheme = { colors: { primary: '#29b6f6a6' } }
  return (
    <ClapWrapper>
      <Provider apiKey={API_KEY} theme={defaultTheme}>
        <ClapButton namespace={NAMESPACE} id={ID()}/>
      </Provider>
    </ClapWrapper>
  )
}
