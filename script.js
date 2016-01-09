
var ReactWeather = React.createClass({
  getInitialState: function() {
    return {
      citiesArr: [],
      currentCity: '',
      userLocation: 'London'
    };
  },

  componentDidMount: function() {
    this._getCitysFromStorage();
    this._getGeoOfUser();
    this._updateWeatherState('London');
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
    if (!navigator.geolocation) {
      this.state.currentCity = 'Can\'t get geo!';
      return;
    }

    function success(position) {
      var lat  = position.coords.latitude;
      var lon = position.coords.longitude;
      console.log('Geo success: %s %s', lat, lon);

    };

    function error() {
      console.log('Geo FAIL!');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  _updateWeatherState: function(city) {

    var self = this;
    var appid = '2de143494c0b295cca9337e1e96b00e0';
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    
    $.get(url, {q: city, appid: appid}, function(data) {
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

    console.log(state);
    
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
          <input type='submit' value='Добавить' onClick={this.addCityHanler} />
          <input type='submit' value='Удалить всё' onClick={this.removeAllCitiesHandler} />
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
