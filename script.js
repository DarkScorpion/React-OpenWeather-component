
var ReactWeather = React.createClass({
  getInitialState: function() {
    return { 
      userLocation: 'London'
    };
  },

  componentDidMount: function() {
    var self = this;
    self._getCityWeather('London', function(result) {
      if ( self.isMounted() ) {
        self.setState({
          temp: result.main.temp,
          //icon: result.weather.icon,
          pressure: result.main.pressure,
          humidity: result.main.humidity
        });
      }
    });
  },

  _getCityWeather: function(city, cb) {
    var appid = '2de143494c0b295cca9337e1e96b00e0';
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    
    $.get(url, {q: city, appid: appid}, cb);
  },
  
  render: function () {
    var state = this.state;
    console.log(state);
    return (
      <p>
        <span>Температура: {state.temp}</span>
        <span>Влажность: {state.humidity}</span>
        <span>Давление: {state.pressure}</span>
      </p>
    );
  }
});

ReactDOM.render(
  <ReactWeather />,
  document.getElementById('ReactWeather')
);

/*
var url = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=2de143494c0b295cca9337e1e96b00e0'
$.get(url, function(data) {
  console.log(data);
});
*/
//Иконки: http://openweathermap.org/img/w/10d.png