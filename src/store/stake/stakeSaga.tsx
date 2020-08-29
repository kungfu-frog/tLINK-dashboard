import { put, takeLatest, fork, select, call } from 'redux-saga/effects';
import {
  ActionType,
} from 'types';

import { web3client } from 'lib';
import Config from 'config';
import { setStakeTokenAllowance, setTotalStaked, setStaked, setTotalLocked, setTotalUnlocked } from './stakeActions';
import { selectAccount } from 'store/account/accountSelector';

function* setAllowanceSaga() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const allowance = yield web3client.allowance(web3client.stakingTokenContract, account.address, Config.Pool.address);
    yield put(setStakeTokenAllowance(allowance));
  } catch(err) {
    yield put(setStakeTokenAllowance(0));
  }
}

function* setStakedSaga() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const result = yield web3client.totalStakedFor(account.address);
    yield put(setStaked(result));
  } catch(err) {
    yield put(setStaked(0));
  }
}

function* setTotalStakedSaga() {
  try {
    const result = yield web3client.totalStaked();
    yield put(setTotalStaked(result));
  } catch(err) {
    yield put(setTotalStaked(0));
  }
}

function* setTotalLockedSaga() {
  try {
    const result = yield web3client.totalLocked();
    yield put(setTotalLocked(result));
  } catch(err) {
    yield put(setTotalLocked(0));
  }
}

function* setTotalUnlockedSaga() {
  try {
    const result = yield web3client.totalUnlocked();
    yield put(setTotalUnlocked(result));
  } catch(err) {
    yield put(setTotalUnlocked(0));
  }
}

function* approve() {
  try {
    yield web3client.approve(web3client.stakingTokenContract, Config.Pool.address);
    yield call(setAllowanceSaga);
  } catch(err) {
  }
}

function* stakeSagaWatcher() {
  yield takeLatest(ActionType.INIT_STORE as any, setAllowanceSaga);
  yield takeLatest(ActionType.INIT_STORE as any, setStakedSaga);
  yield takeLatest(ActionType.INIT_STORE as any, setTotalStakedSaga);
  yield takeLatest(ActionType.INIT_STORE as any, setTotalLockedSaga);
  yield takeLatest(ActionType.INIT_STORE as any, setTotalUnlockedSaga);
  yield takeLatest(ActionType.STAKE_APPROVE_TOKEN as any, approve);
}

export default [
  fork(stakeSagaWatcher),
];
