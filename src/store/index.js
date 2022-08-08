import thunk from 'redux-thunk'

import {legacy_createStore as createStore, applyMiddleware,compose, combineReducers} from 'redux'
import collapseReducer from './reducer/collaspe_reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const allReducers = combineReducers({
    collapse:collapseReducer
})
export default createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));