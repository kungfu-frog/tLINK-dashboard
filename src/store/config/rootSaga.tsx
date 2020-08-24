import { all, put } from "redux-saga/effects";
import { ActionType } from 'types';
import basic from 'store/app/basicSaga';

export default function* rootSaga() {
    yield all([
        ...basic,
    ]);
    yield put({
        type: ActionType.INIT_STORE
    });
}
