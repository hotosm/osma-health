import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';

/* Actions */
const BOUNDARY_FETCH_FAILED = 'BOUNDARY_FETCH_FAILED';
const BOUNDARY_FETCH_SUCCEEDED = 'BOUNDARY_FETCH_SUCCEEDED';
const BOUNDARY_REQUESTED = 'BOUNDARY_REQUESTED';

export function boundaryFetchFailed (message) {
  console.error(BOUNDARY_FETCH_FAILED, message);
  return { type: BOUNDARY_FETCH_FAILED, message };
}

export function boundaryFetchSucceeded (data) {
  return { type: BOUNDARY_FETCH_SUCCEEDED, data };
}

export function requestBoundary (country, boundary) {
  return { type: BOUNDARY_REQUESTED, country, boundary };
}

/* Saga */
export function* fetchBoundary ({country, boundary}) {
  try {
    const data = yield call(Api.fetchStats, country, boundary);
    yield put(boundaryFetchSucceeded(data));
  } catch (e) {
    yield put(boundaryFetchFailed(e.message));
  }
}

export function* reportSaga () {
  yield takeLatest (BOUNDARY_REQUESTED, fetchBoundary);
}

const initialState = {
  stats: null
}

/* Reducer */
export default function AppState (state = initialState, action) {
  switch (action.type) {
    case BOUNDARY_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        stats: action.data,
      });

    default:
      break
  }

  return state;
}