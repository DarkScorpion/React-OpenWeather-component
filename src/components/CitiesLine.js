
//MIT License (c) 2016 Александр Смит (https://github.com/DarkScorpion)
import React, { PropTypes } from 'react';

import './style/CitiesLine.styl';

class CitiesLine extends React.Component {

  cityClickHandler(event) {
    var city = event.target.innerHTML;
    console.log('cityClickHandler: %s', city);
    this.props.updateWeather(city);
  }
 
  render() {
    var { citiesArr, currentCity } = this.props.weather;
    var Line = citiesArr.map((city, key) => {
      var className = (city === currentCity) ? 'selectCity' : 'cityNames';
      return (
        <span className={className} key={key} onClick={this.cityClickHandler.bind(this)}>
          {city}
        </span>
      )
    });
    return <div>{Line}</div>
  }
}

CitiesLine.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default CitiesLine;
