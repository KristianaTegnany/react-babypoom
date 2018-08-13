import React from 'react'
import App from './views/app/'
import NotFound from './views/not-found/'

const routes = [
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
