import { ChildrenProps } from '@constant'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import React from 'react'

interface EventProps extends ChildrenProps {
  category: string
  label?: string
}

export const EventTracker: React.FC<EventProps> = ({ category, children, label = '' }) => {
  const action = 'Click'
  const onClick = (e: any) => {
    e.preventDefault()
    trackCustomEvent({ category, action, label })
  }

  return (
    <span onClick={onClick}>
      {children}
    </span>
  )
}
