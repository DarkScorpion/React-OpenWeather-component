'use strict';
//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)

import React from 'react';
import style from './styles.styl';
import jQuery from '../modules/jquery-ajax.js';

//Props: 
//start - starting location;
//notSet - how display unknown data;
//appID - key for access (!)
class ReactWeather extends React.Component {
  constructor(props) {
    super(props);
    var notSet = this.props.notSet || '??';
    this.state = {
      citiesArr: [],
      notSet: notSet,
      currentCity: this.props.start || notSet,
      temp: notSet,
      icon: notSet,
      pressure: notSet,
      humidity: notSet
    };
  }

  componentDidMount() {
    var state = this.state;
    this._getCitysFromStorage();

    if(state.currentCity === state.notSet) {
      this._getGeoOfUser();
    } else {
      this._updateWeatherState(state.currentCity)
    }
  }

  componentDidUpdate() {
    this._setCitysToStorage();
  }

  _getCitysFromStorage() {
    //localStorage.removeItem('citiesArr');
    if(typeof localStorage.citiesArr === 'undefined') {
      localStorage.citiesArr = '[]';
    }

    this.setState({
      citiesArr: JSON.parse(localStorage.citiesArr)
    });
  }

  _setCitysToStorage() {
    localStorage.citiesArr = JSON.stringify(this.state.citiesArr);
  }

  _getGeoOfUser() {
    var geo = navigator.geolocation;
    if (!geo) {
      this.state.currentCity = 'Can\'t get geo!';
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
      this.setState({
        currentCity: 'Error getting location data'
      });
    };

    geo.getCurrentPosition(success, error);
  }

  _updateWeatherState(arg) {
    var appID = this.props.appID;
    var url = 'http://api.openweathermap.org/data/2.5/weather';

    var city = '';
    var query = { appid: appID };
    if (typeof arg === 'object' && typeof arg !== null) {
      query.lat = arg.lat;
      query.lon = arg.lon;
      city = 'Weather in the place where you are!';
    } else {
      city = arg;
      query.q = arg;
    }

    console.log('Query: %o', query);

    $.ajax({
      url: url,
      data: query,
      success: (data) => {
        this.setState({
          currentCity: city,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          pressure: data.main.pressure,
          humidity: data.main.humidity
        });
      },
      error: (req, status, err) => {
        console.log(req.responseText);
        var notSet = this.state.notSet;
        this.setState({
          //currentCity: city,
          temp: notSet,
          icon: notSet,
          pressure: notSet,
          humidity: notSet
        });
      }
    });
  }

  _getCitiesLine() {
    return this.state.citiesArr.map((value, key) => {
      var className = (value === this.state.currentCity) ? 'selectCity' : 'cityNames';
      return (
        <span className={className} key={key} onClick={this.cityClickHandler.bind(this)}>
          {value}
        </span>
      )
    });
  }

  _getIcon() {
    var state = this.state;
    if(state.currentCity !== state.notSet) {
      var iconLink = 'http://openweathermap.org/img/w/'+state.icon+'.png';
      return <img src={iconLink} />
    } else {
      return false;
    }
  }

  removeCityHandler(event) {
    var citiesArr = this.state.citiesArr;
    var cityName = this.state.currentCity;

    var elemNum = citiesArr.indexOf(cityName);

    if(elemNum !== -1) {
      citiesArr.splice(elemNum, 1);
      this.setState({
        citiesArr: citiesArr
      });
      console.log('Remove city: %s', cityName);
    }
  }

  addCityHanler(event) {
    var input = document.getElementById("addCity").value;

    console.log('addCityHanler: %s', input);

    if(input !== '') {
      this.setState(function(state) {
        var temp = state.citiesArr;
        temp.push(input);
        state.citiesArr = temp;
      });
    }
  }

  cityClickHandler(event) {
    var city = event.target.innerHTML;
    console.log('cityClickHandler: %s', city);
    this._updateWeatherState(city);
  }

  render() {
    var state = this.state;
    var icon = this._getIcon();
    var citiesLine = this._getCitiesLine();

    console.log('Render state: %o', state);
    
    return (
      <div className="ReactWeather">
        <h4>{state.currentCity}</h4>
        <div>{icon}</div>
        <div>
          <span>Humidity: {state.humidity} </span><br/>
          <span>Pressure: {state.pressure} </span><br/>
          <span>Temperature: {state.temp} </span><br/>
        </div>
        <div>
          <input type='text' id='addCity' /> <br/>
          <input type='submit' value='Add' onClick={this.addCityHanler.bind(this)} />
          <input type='submit' value='Remove' onClick={this.removeCityHandler.bind(this)} />
        </div>
        <div>{citiesLine}</div>
      </div>
    );
  }
};

export default ReactWeather;
