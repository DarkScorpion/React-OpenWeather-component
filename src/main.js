
import React from 'react';
import ReactDOM from 'react-dom'

import { appID } from '../config.js'
import ReactWeather from './ReactWeather.js'

ReactDOM.render(
  <ReactWeather appID={appID} />,
  document.getElementById('ReactWeather')
);
