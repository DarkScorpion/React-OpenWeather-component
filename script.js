
var ReactWeather = React.createClass({
  getInitialState: function() {
    return { 
      userLocation: 'London',
      citysArr: []
    };
  },

  componentDidMount: function() {
    this._getCitysArr();

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

  componentWillUnmount: function() {
    this._setCitysArr();
  },

  _getCitysArr: function() {
    this.setState(JSON.parse(localStorage['citysArr']));
  },

  _setCitysArr: function() {
    localStorage['citysArr'] = JSON.stringify(this.state);
    //localStorage.setItem('ticker', JSON.stringify(this.state));
  },

  _getCityWeather: function(city, cb) {
    var appid = '2de143494c0b295cca9337e1e96b00e0';
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    
    $.get(url, {q: city, appid: appid}, cb);
  },

  _addCity: function(city) {
    this.setState(function(state) {
      state.citysArr = state.citysArr.push(city);
    });
  },
  
  render: function () {
    var state = this.state;
    var iconLink = 'http://openweathermap.org/img/w/'+state.icon+'.png'
    console.log(state);
    return (
      <div>
        <div><img src={iconLink} /></div>
        <div>
          <span>Влажность: {state.humidity} </span><br/>
          <span>Давление: {state.pressure} </span><br/>
          <span>Температура: {state.temp} </span><br/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ReactWeather />,
  document.getElementById('ReactWeather')
);
