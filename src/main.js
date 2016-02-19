'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ReactWeather = require('./ReactWeather.js');

ReactDOM.render(
  <ReactWeather appID='44db6a862fba0b067b1930da0d769e98' />,
  document.getElementById('ReactWeather')
);
