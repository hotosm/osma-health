import AppState, {appSaga} from './AppState';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

export const rootState = combineReducers({
  AppState
});

export function * rootSaga() {
  yield all([appSaga()]);
}