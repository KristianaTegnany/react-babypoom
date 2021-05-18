import React from 'react'
import App from './views/app'
import NotFound from './views/not-found'
import LandingPage from './views/landing-page'

const routes = [
  {
    path: '/:uuid/lp',
    component: LandingPage,
  },
  {
    path: '/:uuid',
    component: App,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
