
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReactWeather from '../components/ReactWeather.js'
import * as rwActions from '../actions/ReactWeatherAction.js'

function mapStateToProps (state) {
  return {weather: state.ReactWeatherReduser};
}

function mapDispatchToProps(dispatch) {
  return {
    updateState: bindActionCreators(rwActions.updateState, dispatch),
    updateWeather: bindActionCreators(rwActions.updateWeather, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactWeather);
