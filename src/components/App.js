
import React from 'react'

import CitiesLine from '../containers/CitiesLine.js'
import ReactWeather from '../containers/ReactWeather.js'
import CitiesManager from '../containers/CitiesManager.js'

import './style/App.styl'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ReactWeather />
        <CitiesManager />
        <CitiesLine />
      </div>
    )
  }
}

export default App;
