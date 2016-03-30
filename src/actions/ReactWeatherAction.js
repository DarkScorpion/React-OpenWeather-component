
import jQuery from 'jquery-ajax'
import { appID as _appID } from '../../config.js'

export function updateWeather(arg) {
  
  return (dispatch) => {
    var city = '';
    var url = 'http://api.openweathermap.org/data/2.5/weather';

    var query = { appid: _appID };
    if (typeof arg === 'object' && typeof arg !== null) {
      query.lat = arg.lat;
      query.lon = arg.lon;
      city = 'Weather in the place where you are!';
    } else {
      city = arg;
      query.q = arg;
    }

    console.log('Query: %o', query);

    jQuery.ajax({
      url: url,
      data: query,
      dataType: 'json',
      success: (data) => {
        var resultData = {
          currentCity: city,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          pressure: data.main.pressure,
          humidity: data.main.humidity
        };
        dispatch( updateState(resultData) );
      },
      error: (req, status, err) => {
        console.log(req.responseText);
        var notSet = '??';
        var resultData = {
          currentCity: notSet,
          temp: notSet,
          icon: notSet,
          pressure: notSet,
          humidity: notSet
        };
        dispatch( updateState(resultData) );
      }
    });
  }
}

export function updateState(updateData) {
  return {
    type: 'UPDATE_STATE',
    payload: updateData
  }
}
