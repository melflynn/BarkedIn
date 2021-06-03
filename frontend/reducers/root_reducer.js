import sessionReducer from './session_reducer';
import entitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';
import { combineReducers } from 'redux';
import UIReducer from './ui_reducer';

export default combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  ui: UIReducer,
  errors: errorsReducer
})