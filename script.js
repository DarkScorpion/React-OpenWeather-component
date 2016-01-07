
var ReactWeather = React.createClass({
  getInitialState: function() {
    return {
      citiesArr: [],
      userLocation: 'London'
    };
  },

  componentDidMount: function() {
    this._getCitysFromStorage();

    var self = this;
    self._getCityWeather('London', function(result) {
      if ( self.isMounted() ) {
        self.setState({
          temp: result.main.temp,
          icon: result.weather[0].icon,
          pressure: result.main.pressure,
          humidity: result.main.humidity
        });
      }
    });
  },

  componentDidUpdate: function() {
    this._setCitysToStorage();
  },

  _getCitysFromStorage: function() {
    //localStorage.removeItem('citiesArr');
    console.log(localStorage['citiesArr']);
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

  _getCityWeather: function(city, cb) {
    var appid = '2de143494c0b295cca9337e1e96b00e0';
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    
    $.get(url, {q: city, appid: appid}, cb);
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
    return this.state.citiesArr.map(function(city) {
      return <span>{city},&nbsp;</span>
    });
  },

  removeAllCitiesHandler: function(event) {
    this.setState({
      citiesArr: []
    });
  },

  addCityHanler: function(event) {
    var str = document.getElementById("addCity").value;
    console.log('inputHandler activate: ' + str);
    this._addCity(str);
  },
  
  render: function () {
    var state = this.state;
    var iconLink = 'http://openweathermap.org/img/w/'+state.icon+'.png'
    
    var citiesLine = this._getCitiesLine();

    console.log(state);
    
    return (
      <div>
        <div><img src={iconLink} /></div>
        <div>
          <span>Влажность: {state.humidity} </span><br/>
          <span>Давление: {state.pressure} </span><br/>
          <span>Температура: {state.temp} </span><br/>
        </div>
        <div>
          <input type='text' id='addCity' />
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
