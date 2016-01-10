//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)
var ReactWeather = React.createClass({
  getInitialState: function() {
    return {
      citiesArr: [],
      currentCity: ''
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
    if(typeof localStorage['citiesArr'] === 'undefined') {
      localStorage['citiesArr'] = '[]';
    }

    this.setState({
      citiesArr: JSON.parse(localStorage['citiesArr'])
    });
  },

  _setCitysToStorage: function() {
    localStorage['citiesArr'] = JSON.stringify(this.state.citiesArr);
  },

  _getGeoOfUser: function() {
    var self = this;

    if (!navigator.geolocation) {
      this.state.currentCity = 'Can\'t get geo!';
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
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  _updateWeatherState: function(arg) {

    var self = this;
    var appID = '2de143494c0b295cca9337e1e96b00e0';
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

    console.log('Query: ', query);

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

  _addCity: function(city) {
    if(city === '') {
      return
    }

    this.setState(function(state) {
      var temp = state.citiesArr;
      temp.push(city);
      state.citiesArr = temp;
    });
  },

  _getCitiesLine: function() {
    var self = this;
    return self.state.citiesArr.map(function(value, key) {
      var className = (value === self.state.currentCity) ? 'selectCity' : 'cityNames';
      return ( <span className={className} key={key} onClick={self.cityClickHandler}>{value}</span> )
    });
  },

  removeAllCitiesHandler: function(event) {
    this.setState({
      citiesArr: []
    });
  },

  addCityHanler: function(event) {
    var input = document.getElementById("addCity").value;
    console.log('addCityHanler: ' + input);
    this._addCity(input);
  },
  
  cityClickHandler: function(event) {
    var city = event.target.innerHTML;
    console.log('cityClickHandler: ' + city);
    this._updateWeatherState(city);
  },

  render: function () {
    var state = this.state;
    var citiesLine = this._getCitiesLine();
    var iconLink = 'http://openweathermap.org/img/w/'+state.icon+'.png';

    console.log('Render state: %o', state);
    
    return (
      <div>
        <h4>{state.currentCity}</h4>
        <div><img src={iconLink} /></div>
        <div>
          <span>Влажность: {state.humidity} </span><br/>
          <span>Давление: {state.pressure} </span><br/>
          <span>Температура: {state.temp} </span><br/>
        </div>
        <div>
          <input type='text' id='addCity' /> <br/>
          <input type='submit' value='Add' onClick={this.addCityHanler} />
          <input type='submit' value='Remove All' onClick={this.removeAllCitiesHandler} />
        </div>
        <div>{citiesLine}</div>
      </div>
    );
  }

});

ReactDOM.render(
  <ReactWeather />,
  document.getElementById('ReactWeather')
);
