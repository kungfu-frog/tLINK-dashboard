import { all, put } from "redux-saga/effects";
import { ActionType } from 'types';
import basic from 'store/app/basicSaga';
import account from 'store/account/accountSaga';

export default function* rootSaga() {
    yield all([
        ...basic,
        ...account,
    ]);
    yield put({
        type: ActionType.INIT_STORE
    });
}
