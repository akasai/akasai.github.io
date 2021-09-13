import { Footer, Header } from '@components'
import { ChildrenProps } from '@constant'
import React from 'react'

import './index.scss'

export interface LayoutProps extends ChildrenProps {
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <React.Fragment>
    <Header/>
    {children}
    <Footer/>
  </React.Fragment>
)

export default Layout
