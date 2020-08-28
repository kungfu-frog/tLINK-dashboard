import { put, takeLatest, fork, select } from 'redux-saga/effects';
import {
  ActionType,
} from 'types';

import { web3client } from 'lib';
import Config from 'config';
import { setStakeTokenAllowance } from './stakeActions';
import { selectAccount } from 'store/account/accountSelector';

function* setAllowance() {
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

function* stakeSagaWatcher() {
  yield takeLatest(ActionType.STAKE_SET_ALLOWANCE as any, setAllowance);
  yield takeLatest(ActionType.INIT_STORE as any, setAllowance);
}

export default [
  fork(stakeSagaWatcher),
];
