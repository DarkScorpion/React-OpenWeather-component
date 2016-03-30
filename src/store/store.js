
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../redusers/rootReduser.js'

function getStore(initState) {

  const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(thunk)
  );

  return store
}

export default getStore;
