import { ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import colors from 'tailwindcss/colors'

import tailwindConfig from '@tailwindConfig'

const { theme } = tailwindConfig
const { fontFamily } = theme

// https://ant.design/docs/react/customize-theme#seedtoken
export const AntdConfigProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: colors.blue[500],
        colorLink: colors.blue[500],
        colorLinkHover: colors.blue[200],
        colorLinkActive: colors.blue[400],
        colorInfo: colors.blue[400],
        colorSuccess: colors.green[400],
        colorError: colors.red[400],
        colorWarning: colors.orange[400],
        colorTextBase: theme.extend.colors.black,
        fontSize: 14,
        fontFamily: fontFamily.sans.join(', '),
        lineHeight: 1.5,
      },
    }}
  >
    {children}
  </ConfigProvider>
)
