import AppState, {appSaga} from './AppState';
import ReportState, {reportSaga} from './ReportState';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

export const rootState = combineReducers({
  AppState,
  ReportState
});

export function * rootSaga() {
  yield all([appSaga(), reportSaga()]);
}