import React from 'react'
import App from './views/app/Component'
import NotFound from './views/not-found/Component'

const routes = [
  {
    path: '/:uuid/:step?',
    component: App,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
