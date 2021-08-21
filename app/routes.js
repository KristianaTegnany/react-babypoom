import React from 'react'
import App from './views/app'
import NotFound from './views/not-found'
import LandingPage from './views/landing-page'
import LandingPageFriends from './views/landing-page-friends'

const routes = [
  {
    path: '/not-found',
    component: NotFound,
  },
  {
    path: '/:uuid/lp',
    component: LandingPage,
  },
  {
    path: '/:uuid/gift',
    component: LandingPageFriends,
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
