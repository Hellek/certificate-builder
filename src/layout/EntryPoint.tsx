import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useGate } from 'effector-react'

import { publicRoutes } from '@app/routes'
import { AppTheme } from '@app/theme'
import { AppGate } from '@models/app'

const PublicRoute = () => useRoutes(Object.values(publicRoutes))

const EntryPoint = () => {
  useGate(AppGate)

  return (
    <AppTheme>
      <BrowserRouter>
        <PublicRoute />
      </BrowserRouter>
    </AppTheme>
  )
}

export default EntryPoint
