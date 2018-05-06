import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './views/app/Component';
import Welcome from './views/welcome/Component';
import Game from './views/game/Component';
import Arrival from './views/arrival/Component';
import Trip from './views/trip/Component';
import VisitorBook from './views/visitorbook/Component';
import Gift from './views/gift/Component';
import Souvenir from './views/souvenir/Component';

import { NAMES_TO_PATHS } from './views/app/steps';

export default (
  <Route path={NAMES_TO_PATHS.get('welcome')} component={App}>
    <IndexRoute component={Welcome} />

    <Route path={NAMES_TO_PATHS.get('game')} component={Game} />
    <Route path={NAMES_TO_PATHS.get('arrival')} component={Arrival} />
    <Route path={NAMES_TO_PATHS.get('trip')} component={Trip} />
    <Route path={NAMES_TO_PATHS.get('visitorbook')} component={VisitorBook} />
    <Route path={NAMES_TO_PATHS.get('gift')} component={Gift} />
    <Route path={NAMES_TO_PATHS.get('souvenir')} component={Souvenir} />
  </Route>
)
