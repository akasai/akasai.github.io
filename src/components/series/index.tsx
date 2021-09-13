import { SeriesNode, SeriesValue } from '@constant'
import { Link } from 'gatsby'
import React from 'react'

import './index.scss'

interface SeriesProps {
  seriesName: string
  curSeriesNum: number
  seriesList: SeriesNode[]
}

export const Series: React.FC<SeriesProps> = ({ seriesName, curSeriesNum, seriesList }) => {
  return (
    <section className="series">
      <h3 id="title">「{seriesName}」 Series</h3>
      <article className="series__wrapper">
        <ul>
          {
            seriesList.map(({ fields: { slug }, frontmatter }, idx) => {
              return (
                <li key={idx}>
                  <Link to={slug}>
                    <ListContent cur={curSeriesNum} data={frontmatter}/>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </article>
    </section>
  )
}

const ListContent: React.FC<{ cur: number, data: SeriesValue }> = ({ cur, data }) => {
  const { date, series_num, title } = data
  return (
    <section className="series_content">
      <span className="num">{cur === series_num ? '▷' : `${series_num}.`}</span>
      <span className="title"><b>{title}</b></span>
      <span className="date">{date}</span>
    </section>
  )
}
