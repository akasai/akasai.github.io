import { THEME_MODE, UT_THEME } from '@constant/enum'
import { addClassToHTML, removeClassToHTML } from '@utils/dom'
import { getTheme, setTheme } from '@utils/storage'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const ThemeToggle: React.FC = () => {
  const [MODE, setCurMode] = useState<THEME_MODE>()

  const toggle = () => {
    const isLight = MODE === THEME_MODE.LIGHT
    const m = !isLight ? THEME_MODE.LIGHT : THEME_MODE.DARK
    toggleTheme(m, setCurMode)

    const message = { type: 'set-theme', theme: !isLight ? UT_THEME.LIGHT : UT_THEME.DARK }
    const utterances = document.querySelector<HTMLIFrameElement>('iframe.utterances-frame')?.contentWindow
    utterances?.postMessage(message, 'https://utteranc.es')
  }

  useEffect(() => {
    const mode = getTheme() ? THEME_MODE.DARK : THEME_MODE.LIGHT
    toggleTheme(mode, setCurMode)
  }, [])

  return (
    <Wrapper onClick={() => toggle()}>
      {MODE === THEME_MODE.LIGHT ? <SunIcon/> : <MoonIcon/>}
    </Wrapper>
  )
}

const toggleTheme = (theme: THEME_MODE, fn: (a: THEME_MODE) => void): void => {
  switch (theme) {
    case THEME_MODE.LIGHT:
      setTheme(false)
      removeClassToHTML(THEME_MODE.DARK)
      break
    case THEME_MODE.DARK:
      setTheme(true)
      removeClassToHTML(THEME_MODE.LIGHT)
      break
  }
  fn(theme)
  addClassToHTML(theme)
}

const Wrapper = styled.span`
  margin-left: 10px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #cdd9e5;
    cursor: pointer;

    &:hover {
      color: var(--anchor-font-color);
      transition: .4s ease all;
    }
  }
`

const MoonIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       className="feather feather-moon">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const SunIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       className="feather feather-sun">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

