import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { weatherApiErrorReceived } from './weather.reducer';

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(weatherApiErrorReceived.type, apiErrorReceived);
}
