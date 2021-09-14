import { PreviewQueryResponse as PreviewNode } from '@constant'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface PreviewProps {
  node: PreviewNode
}

export const PostPreview = ({ node }: PreviewProps) => {
  const { fields, frontmatter, excerpt: description, timeToRead } = node
  const { category, sub_category, title, tags, date } = frontmatter

  return (
    <Preview key={fields.slug}>
      <Link to={fields.slug}>
        <PostTitle>
          <h3 id="post_category">{category}</h3>
          <h1 id="post_title">{title}</h1>
          {/*{series_name && <h4 id="series">{SERIES_TITLE}</h4>}*/}
        </PostTitle>
        <PostContent dangerouslySetInnerHTML={{ __html: description }}/>
        {/*{tags.length && <Tags tagList={tags}/>}*/}
        <PostInfo>
          <span className="date">{date}</span>
          <span className="time-to-read">{timeToRead} min read</span>
        </PostInfo>
      </Link>
    </Preview>
  )
}

const Preview = styled.article`
  padding: 2rem;
  border-bottom: 1px solid var(--app-main-border-color);

  &:hover {
    cursor: pointer;
    background-color: var(--app-hover-bg-color);
    transition: all ease 0.25s;
  }
`

const PostTitle = styled.section`
  display: inline-block;

  h3#post_category {
    font-size: 1.3rem;
    margin: 0 0 5px 3px;
    color: var(--category-font-color);
  }

  h1#post_title {
    font-size: 2.2rem;
    font-weight: bold;
    display: inline-block;
    color: var(--title-font-color);
  }

  @media only screen and (max-width: 768px) {
    h1#post_title {

    }
  }
`

const PostContent = styled.p`
  font-size: 1.5rem;
  color: var(--app-preview-font-color);
  margin: 10px 0 15px 0;
  word-break: keep-all;

  @media only screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const PostInfo = styled.section`
  font-size: 1.3rem;
  color: var(--preview-info-font-color);
  display: flex;
  align-items: center;

  .time-to-read {
    &:before {
      content: '·';
      margin: 0 5px;
    }
  }
`
