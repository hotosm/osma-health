import { call, put, take, all, fork } from 'redux-saga/effects';
import Api from '../api';

/* Actions */
const BOUNDARY_FETCH_FAILED = 'BOUNDARY_FETCH_FAILED';
const BOUNDARY_FETCH_SUCCEEDED = 'BOUNDARY_FETCH_SUCCEEDED';
const BOUNDARY_REQUESTED = 'BOUNDARY_REQUESTED';

const DOMAIN_FETCH_FAILED = 'DOMAIN_FETCH_FAILED';
const DOMAIN_FETCH_SUCCEEDED = 'DOMAIN_FETCH_SUCCEEDED';

export function boundaryFetchFailed (message) {
  console.error(BOUNDARY_FETCH_FAILED, message);
  return { type: BOUNDARY_FETCH_FAILED, message };
}

export function boundaryFetchSucceeded (data) {
  return { type: BOUNDARY_FETCH_SUCCEEDED, data };
}

export function domainFetchFailed (message) {
  console.error(DOMAIN_FETCH_FAILED, message);
  return { type: DOMAIN_FETCH_FAILED, message };
}

export function domainFetchSucceeded (data) {
  return { type: DOMAIN_FETCH_SUCCEEDED, data };
}

export function requestBoundary (country, boundary) {
  return { type: BOUNDARY_REQUESTED, country, boundary };
}

/* Saga */
export function* fetchBoundary (country, boundary) {
  try {
    const data = yield call(Api.fetchStats, country, boundary);
    yield put(boundaryFetchSucceeded(data));
  } catch (e) {
    yield put(boundaryFetchFailed(e.message));
  }
}

export function* fetchDomain (country) {
  try {
    const data = yield call(Api.fetchDomain, country);
    yield put(domainFetchSucceeded(data));
  } catch (e) {
    yield put(domainFetchFailed(e.message));
  }
}

export function* reportSaga () {
  while (true) {
    const {country, boundary} = yield take(BOUNDARY_REQUESTED);
    yield all([
      fork(fetchBoundary, country, boundary),
      fork(fetchDomain, country)
    ]);
  }
}

const initialState = {
  stats: null,
  domain: null
}

/* Reducer */
export default function AppState (state = initialState, action) {
  switch (action.type) {
    case BOUNDARY_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        stats: action.data,
      });
    case DOMAIN_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        domain: action.data,
      });

    default:
      break
  }

  return state;
}