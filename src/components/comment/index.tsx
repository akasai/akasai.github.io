import { BOOLEAN_STRING, GISCUS_THEME, THEME_MODE } from '@constant'
import { CommentProps, GiscusConfig } from '@constant/types'
import { getTheme } from '@utils/storage'
import React, { createRef, RefObject, useEffect } from 'react'
import styled from 'styled-components'

const BASE = `https://giscus.app/client.js`
const CommentWrapper = styled.span`
`

export const Comment: React.FC<CommentProps> = ({ data }) => {
  const commentRef: RefObject<HTMLSpanElement> = createRef()
  const mode = getTheme() ? THEME_MODE.DARK : THEME_MODE.LIGHT
  const config: GiscusConfig = {
    src: BASE,
    'data-repo': data.giscus,
    'data-repo-id': data.repo_id,
    'data-category': 'General',
    'data-category-id': data.category_id,
    'data-mapping': 'title',
    'data-reactions-enabled': BOOLEAN_STRING.FALSE,
    'data-emit-metadata': BOOLEAN_STRING.FALSE,
    'data-theme': mode === THEME_MODE.DARK ? GISCUS_THEME.DARK : GISCUS_THEME.LIGHT,
    'data-lang': 'ko',
    crossorigin: 'anonymous'
  }
  // window.addEventListener('message', handleMessage);

  useEffect(() => {
    const curComment = commentRef.current!.firstChild
    if (curComment) {
      commentRef.current!.removeChild(curComment)
    }

    const giscus = document.createElement('script')
    Object.entries(config).forEach(([key, value]) => {
      giscus.setAttribute(key, value)
    })
    commentRef.current!.appendChild(giscus)
  }, [])

  return (
    <CommentWrapper id="comment" ref={commentRef}/>
  )
}

function handleMessage(event: MessageEvent) {
  if (event.origin !== 'https://giscus.app') return;
  if (!(typeof event.data === 'object' && event.data.giscus)) return;

  const giscusData = event.data.giscus;
  if ('discussion' in giscusData) {
    const metadataMessage = giscusData;
    console.log(metadataMessage.discussion);
    console.log(metadataMessage.viewer);
  }
}
