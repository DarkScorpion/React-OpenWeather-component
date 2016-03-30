
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CitiesLine from '../components/CitiesLine.js'
import * as rwActions from '../actions/ReactWeatherAction.js'

function mapStateToProps (state) {
  return {weather: state.ReactWeatherReduser};
}

function mapDispatchToProps(dispatch) {
  return {
    updateWeather: bindActionCreators(rwActions.updateWeather, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesLine);
