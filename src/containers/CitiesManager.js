
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CitiesManager from '../components/CitiesManager.js'
import * as rwActions from '../actions/ReactWeatherAction.js'

function mapStateToProps (state) {
  return {
    weather: state.ReactWeatherReduser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateState: bindActionCreators(rwActions.updateState, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesManager);
