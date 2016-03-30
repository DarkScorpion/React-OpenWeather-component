
//MIT License (c) 2016 Александр Смит (https://github.com/DarkScorpion)
import React, { PropTypes } from 'react';

import './style/CitiesManager.styl'

class CitiesManager extends React.Component {

  componentDidMount() {
    this._getCitysFromStorage();
  }

  componentDidUpdate() {
    this._putCitysToStorage();
  }

  _getCitysFromStorage() {
    //localStorage.removeItem('citiesArr');
    if(typeof localStorage.citiesArr === 'undefined') {
      localStorage.citiesArr = '[]';
    }

    this.props.updateState({
      citiesArr: JSON.parse(localStorage.citiesArr)
    });
  }

  _putCitysToStorage() {
    var { citiesArr } = this.props.weather;
    localStorage.citiesArr = JSON.stringify(citiesArr);
  }

  removeCityHandler(event) {
    var { citiesArr, currentCity } = this.props.weather;

    var elemNum = citiesArr.indexOf(currentCity);

    if(elemNum !== -1) {
      citiesArr.splice(elemNum, 1);
      this.props.updateState({
        citiesArr: citiesArr
      });
      console.log('Remove city: %s', currentCity);
    }
  }

  addCityHanler(event) {
    var { citiesArr } = this.props.weather;
    var inputElem = document.getElementById("rwAddCity");

    var value = inputElem.value;
    inputElem.value = '';

    console.log('addCityHanler: %s', value);

    if(value !== '') {
      var temp = citiesArr;
      temp.push(value);
      this.props.updateState({
        citiesArr: temp
      })
    }
  }

  render() {
  return (
    <div className="citiesManager">
      <input type='text' id='rwAddCity' /> <br/>
      <input type='submit' value='Add' onClick={this.addCityHanler.bind(this)} />
      <input type='submit' value='Remove' onClick={this.removeCityHandler.bind(this)} />
    </div>
  )
  }
}

CitiesManager.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default CitiesManager;
