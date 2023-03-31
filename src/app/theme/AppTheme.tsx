// resetting basic css rules which not related directly to specific UI components or current project
import './styles/preflight.css'
// default antd resetter, but without duplications that were met at preflight.css removing of this rules can affect antd components
import './styles/antd-reset.css'
// tailwind layers import + project specific "@layer base" customization
import './styles/tailwind.css'

import { ReactNode } from 'react'

import { AntdConfigProvider } from './AntdConfigProvider'

export const AppTheme = ({ children }: { children: ReactNode }) => (
  <AntdConfigProvider>
    {children}
  </AntdConfigProvider>
)
