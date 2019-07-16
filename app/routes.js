import React from 'react'
import App from './views/app'
import StaticMessage from './views/static-message'

const routes = [
  {
    path: '/:uuid/:step?',
    component: App,
  },
  {
    path: '*',
    component: StaticMessage, // NotFound
  },
]

export default routes
