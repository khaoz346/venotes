import { combineReducers } from 'redux';
import snackbarReducer from './snackbar';

const rootReducer = combineReducers({
  snackbar: snackbarReducer
});

export default rootReducer;
