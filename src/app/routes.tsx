import { HomePage } from '@pages/HomePage'
import NotFound from '@pages/NotFound'

export const publicRoutes = {
  HomePage: {
    path: '/',
    element: <HomePage />,
  },
  NotFound: {
    path: '*',
    element: <NotFound />,
  },
}
