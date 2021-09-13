import { THEME_MODE, UT_THEME } from '@constant'
import { getTheme } from '@utils/storage'
import React, { createRef, RefObject, useEffect } from 'react'

interface CommentProps {
  repo: string
}

interface UtterancesConfig {
  src: string
  type: string
  repo: string
  theme: UT_THEME
  async: boolean
  'issue-term': string
  label: string
  crossorigin: 'anonymous'
}

const LABEL = '🗣:speech_balloon:'

export const Comment: React.FC<CommentProps> = ({ repo }) => {
  const commentRef: RefObject<HTMLSpanElement> = createRef()
  const mode = getTheme() ? THEME_MODE.DARK : THEME_MODE.LIGHT

  const config: UtterancesConfig = {
    src: 'https://utteranc.es/client.js',
    type: 'text/javascript',
    repo,
    theme: mode === THEME_MODE.DARK ? UT_THEME.DARK : UT_THEME.LIGHT,
    async: true,
    'issue-term': 'comment',
    label: LABEL,
    crossorigin: 'anonymous'
  }

  useEffect(() => {
    const curComment = commentRef.current!.firstChild
    if (curComment) {
      commentRef.current!.removeChild(curComment)
    }

    const utterances = document.createElement('script')
    Object.entries(config).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    commentRef.current!.appendChild(utterances)
  }, [])

  return (
    <span id="comment" ref={commentRef}/>
  )
}


