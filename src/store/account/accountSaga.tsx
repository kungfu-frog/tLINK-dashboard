import { put, takeLatest, fork } from 'redux-saga/effects';
import {
  ActionType,
} from 'types';

import { web3client } from 'lib';
import { setAccount } from './accountActions';
import { poolLoadAllowance, poolGetPeriodFinish } from 'store/pool/poolActions';
import { uniLoadAllowance } from 'store/uni/uniActions';

function* setAccountSaga() {
  try {
    const address = yield web3client.getAccount();
    if (address) {
      const balance: number = yield web3client.getBalance(web3client.tokenContract, address);
      yield put(setAccount({ address, balance }));
      yield put(poolLoadAllowance());
      yield put(poolGetPeriodFinish());
      yield put(uniLoadAllowance());
    }
    else {
      yield put(setAccount(undefined));
    }
  } catch(err) {
    yield put(setAccount(undefined));
  }
}

function* accountSagaWatcher() {
  yield takeLatest(ActionType.LOAD_ACCOUNT as any, setAccountSaga);
  yield takeLatest(ActionType.INIT_STORE as any, setAccountSaga);
}

export default [
  fork(accountSagaWatcher),
];
