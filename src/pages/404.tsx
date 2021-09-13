import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '@layout'
import { Main } from '@components'
import styled from 'styled-components'

const NotFoundPage = () => {
  return (
    <Layout>
      <Main>
        <Section>
          <H1>🚫 Page Not Found 🚫</H1>
          <P>
            Sorry 😔
            <br/>
            We could not find what you were looking for.
            <br/>
            <Link to="/">Go home</Link>.
          </P>
        </Section>
      </Main>
    </Layout>
  )
}

const Section = styled.section`
  margin: 5rem 0;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const H1 = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin: 4rem 0;
`

const P = styled.p`
  font-size: 2rem;

  @media only screen and (max-width: 768px) {
    padding: 0 10px;
    font-size: 1.5rem;
  }
`

export default NotFoundPage
