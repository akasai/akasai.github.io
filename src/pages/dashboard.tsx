import { Main } from '@components'
import { PageProps } from '@constant'
import Layout from '@layout'
import React from 'react'
import styled from 'styled-components'

const BASE_URL = `https://hits.seeyoufarm.com/api/count/graph/dailyhits.svg?url=https://akasai.space`

interface PanelData {
  url: string,
  title: string
}

const Panel = styled.span`
  background-color: var(--app-bg-color);
  display: inline-block;
  text-align: center;
  margin: 5px;
  padding: 2px 5px;
  border: 1px solid gray;
  border-radius: 5px;

  &:hover {
    transform: scale(1.8);
    cursor: zoom-in;
  }

  h3 {
    display: inline-block;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 3px 0;
  }

  > * {
    display: block;
  }
`

const Section = styled.section`
  margin: 8rem auto;
  width: 1200px;

  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const DashboardPage: React.FC<PageProps<any, { data: PanelData[] }>> = React.memo(({ pageContext }) => {
  const { data } = pageContext
  const target = (data || []).map(({ url, title }) => ({ url: `${BASE_URL}${url}`.replace(/\/$/, ''), title }))
  return (
    <Layout>
      <Main>
        <Section>
          <h1>Dashboard</h1>
          <section>
            {
              target.map(({ url, title }) => (<UnitPanel url={url} title={title}/>))
            }
          </section>
        </Section>
      </Main>
    </Layout>
  )
})

const UnitPanel: React.FC<PanelData> = (data) => {
  const { url, title } = data
  return (
    <Panel>
      <h3>{title}</h3>
      <a href={url} target="_blank">
        <img src={url} alt="" width="250px"/>
      </a>
    </Panel>
  )
}
export default DashboardPage
