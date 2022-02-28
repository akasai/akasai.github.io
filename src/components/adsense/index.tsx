import React from 'react'
import { useEffect } from 'react'

export const Adsense: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    (window['adsbygoogle'] = window?.adsbygoogle || []).push({})
  })

  return (
    <div style={{ padding: 8 }}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={'ca-pub-7596204383080174'}
           data-ad-slot={'8308888794'}
           data-ad-format="auto"
           data-full-width-responsive="true"/>
    </div>
  )
}
