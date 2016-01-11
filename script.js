'use strict';
//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)
class ReactWeather extends React.Component {
  constructor(props) {
    super(props);
    var notSet = '??';
    this.state = {
      citiesArr: [],
      currentCity: '',
      temp: notSet,
      icon: notSet,
      pressure: notSet,
      humidity: notSet
    };

    this.addCityHanler = this.addCityHanler.bind(this);
    this.removeAllCitiesHandler = this.removeAllCitiesHandler.bind(this);
    this.cityClickHandler = this.cityClickHandler.bind(this);
  }

  componentDidMount() {
    this._getGeoOfUser();
    this._getCitysFromStorage();
  }

  componentDidUpdate() {
    this._setCitysToStorage();
  }

  _getCitysFromStorage() {
    //localStorage.removeItem('citiesArr');
    if(typeof localStorage['citiesArr'] === 'undefined') {
      localStorage['citiesArr'] = '[]';
    }

    this.setState({
      citiesArr: JSON.parse(localStorage['citiesArr'])
    });
  }

  _setCitysToStorage() {
    localStorage['citiesArr'] = JSON.stringify(this.state.citiesArr);
  }

  _getGeoOfUser() {

    if (!navigator.geolocation) {
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

    navigator.geolocation.getCurrentPosition(success, error);
  }


  _updateWeatherState(arg) {
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

    $.get(url, query, (data) => {
      this.setState({
        currentCity: city,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        humidity: data.main.humidity
      });
    });
  }

  _addCity(city) {
    if(city === '') {
      return
    }

    this.setState((state) => {
      var temp = state.citiesArr;
      temp.push(city);
      state.citiesArr = temp;
    });
  }

  _getCitiesLine() {
    return this.state.citiesArr.map((value, key) => {
      var className = (value === this.state.currentCity) ? 'selectCity' : 'cityNames';
      return ( <span className={className} key={key} onClick={this.cityClickHandler}>{value}</span> )
    });
  }

  removeAllCitiesHandler(event) {
    this.setState({
      citiesArr: []
    });
  }

  addCityHanler(event) {
    var input = document.getElementById("addCity").value;
    console.log('addCityHanler: %s', input);
    this._addCity(input);
  }
  
  cityClickHandler(event) {
    var city = event.target.innerHTML;
    console.log('cityClickHandler: %s', city);
    this._updateWeatherState(city);
  }

  render() {
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

};

ReactDOM.render(
  <ReactWeather appID='2de143494c0b295cca9337e1e96b00e0' />,
  document.getElementById('ReactWeather')
);
