
//MIT License (c) 2016 Александр Смит (https://github.com/DarkScorpion)
import React, { PropTypes } from 'react';

class ReactWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { currentCity, notSet } = this.props.weather;

    if(currentCity === notSet) {
      this._getGeoOfUser();
    } else {
      this._updateWeatherState(currentCity)
    }
  }

  _getGeoOfUser() {
    var geo = navigator.geolocation;
    if (!geo) {
      this.props.updateState({
        currentCity: 'Can\'t get geo!'
      });
      return;
    }

    var success = (position) => {
      var pos = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };

      this._updateWeatherState(pos);
    };

    var error = (err) => {
      console.log('Geo FAIL: %o', err);
      this.props.updateState({
        currentCity: 'Error getting location data'
      });
    };

    geo.getCurrentPosition(success, error);
  }

  _updateWeatherState(arg) {
    this.props.updateWeather(arg);
  }

  _getIcon() {
    var { currentCity, notSet, icon } = this.props.weather;
    if(currentCity !== notSet) {
      var iconLink = 'http://openweathermap.org/img/w/'+icon+'.png';
      return <img src={iconLink} />
    } else {
      return false;
    }
  }

  render() {
    var icon = this._getIcon();
    var { currentCity, humidity, pressure, temp } = this.props.weather;

    console.log('Render state: %o', this.props.weather);
    
    return (
      <div className="ReactWeather">
        <h4>{currentCity}</h4>
        <div>{icon}</div>
        <div>
          <span>Humidity: {humidity} </span><br/>
          <span>Pressure: {pressure} </span><br/>
          <span>Temperature: {temp} </span><br/>
        </div>
      </div>
    );
  }
};

ReactWeather.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default ReactWeather;
