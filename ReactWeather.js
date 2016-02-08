'use strict';
//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)
var ReactWeather = React.createClass({
  getInitialState: function() {
    var notSet = '??';
    return {
      citiesArr: [],
      currentCity: notSet,
      temp: notSet,
      icon: notSet,
      pressure: notSet,
      humidity: notSet
    };
  },

  componentDidMount: function() {
    this._getGeoOfUser();
    this._getCitysFromStorage();
  },

  componentDidUpdate: function() {
    this._setCitysToStorage();
  },

  _getCitysFromStorage: function() {
    //localStorage.removeItem('citiesArr');
    if(typeof localStorage.citiesArr === 'undefined') {
      localStorage.citiesArr = '[]';
    }

    this.setState({
      citiesArr: JSON.parse(localStorage.citiesArr)
    });
  },

  _setCitysToStorage: function() {
    localStorage.citiesArr = JSON.stringify(this.state.citiesArr);
  },

  _getGeoOfUser: function() {
    var self = this;
    var geo = navigator.geolocation;

    if (!geo) {
      self.state.currentCity = 'Can\'t get geo!';
      return;
    }

    function success(position) {
      var pos = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };

      self._updateWeatherState(pos);
    };

    function error(err) {
      console.log('Geo FAIL: %o', err);
      self.setState({
        currentCity: 'Error getting location data'
      });
    };

    geo.getCurrentPosition(success, error);
  },

  _updateWeatherState: function(arg) {
    var self = this;
    var appID = this.props.appID;
    var url = 'http://api.openweathermap.org/data/2.5/weather';

    var city = '';
    var query = { appid: appID };
    if (typeof arg === 'object') {
      query.lat = arg.lat;
      query.lon = arg.lon;
      city = 'Weather in the place where you are!';
    } else {
      query.q = arg;
      city = arg;
    }

    console.log('Query: %o', query);

    $.get(url, query, function(data) {
      if ( self.isMounted() ) {
        self.setState({
          currentCity: city,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          pressure: data.main.pressure,
          humidity: data.main.humidity
        });
      }
    });
  },

  _getCitiesLine: function() {
    var self = this;
    return self.state.citiesArr.map(function(value, key) {
      var className = (value === self.state.currentCity) ? 'selectCity' : 'cityNames';
      return ( <span className={className} key={key} onClick={self.cityClickHandler}>{value}</span> )
    });
  },

  _getIcon: function() {
    var notSet = '??';
    var state= this.state;

    if(state.currentCity !== notSet) {
      var iconLink = 'http://openweathermap.org/img/w/'+state.icon+'.png';
      return <img src={iconLink} />
    } else {
      return false;
    }
  },

  removeCityHandler: function(event) {
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
  },

  addCityHanler: function(event) {
    var input = document.getElementById("addCity").value;

    console.log('addCityHanler: %s', input);

    if(input !== '') {
      this.setState(function(state) {
        var temp = state.citiesArr;
        temp.push(input);
        state.citiesArr = temp;
      });
    }
  },
  
  cityClickHandler: function(event) {
    var city = event.target.innerHTML;
    console.log('cityClickHandler: %s', city);
    this._updateWeatherState(city);
  },

  render: function () {
    var state = this.state;
    var icon = this._getIcon();
    var citiesLine = this._getCitiesLine();

    console.log('Render state: %o', state);
    
    return (
      <div>
        <h4>{state.currentCity}</h4>
        <div>{icon}</div>
        <div>
          <span>Humidity: {state.humidity} </span><br/>
          <span>Pressure: {state.pressure} </span><br/>
          <span>Temperature: {state.temp} </span><br/>
        </div>
        <div>
          <input type='text' id='addCity' /> <br/>
          <input type='submit' value='Add' onClick={this.addCityHanler} />
          <input type='submit' value='Remove' onClick={this.removeCityHandler} />
        </div>
        <div>{citiesLine}</div>
      </div>
    );
  }

});

ReactDOM.render(
  <ReactWeather appID='44db6a862fba0b067b1930da0d769e98' />,
  document.getElementById('ReactWeather')
);
