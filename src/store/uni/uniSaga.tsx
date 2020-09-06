import { put, takeLatest, fork, select } from 'redux-saga/effects';
import { ActionType, Action } from 'types';

import { web3client } from 'lib';
import Config from 'config';
import { selectAccount } from 'store/account/accountSelector';
import { uniApproveTokenSuccess, uniGetEarnedSuccess, uniGetStaked, uniGetEarned, uniGetStakedSuccess, uniGetStakeTokenBalanceSuccess, uniGetStakeTokenBalance, uniGetTotalStakedSuccess, uniGetPeriodFinishSuccess } from './uniActions';

function* loadAllowance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const allowance = yield web3client.allowance(web3client.uniTokenContract, account.address, Config.UniPool.address);
    console.log('Allowance', allowance);
    yield put(uniApproveTokenSuccess(allowance));
  } catch(err) {
    yield put(uniApproveTokenSuccess(0));
  }
}

function* approve() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.approve(web3client.uniTokenContract, Config.UniPool.address, account.address);
    const allowance = yield web3client.allowance(web3client.uniTokenContract, account.address, Config.UniPool.address);
    yield put(uniApproveTokenSuccess(allowance));
  } catch(err) {
    yield put(uniApproveTokenSuccess(0));
  }
}

function* stake({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolStake(web3client.uniContract, payload, account.address);
    yield put(uniGetStaked());
  } catch(err) {
    console.error(err);
  }
}

function* withdraw({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolWithdraw(web3client.uniContract, payload, account.address);
    yield put(uniGetStaked());
  } catch(err) {
    
  }
}

function* harvest() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolHarvest(web3client.uniContract, account.address);
    yield put(uniGetEarned());
  } catch(err) {
    
  }
}

function* exit() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolExit(web3client.uniContract, account.address);
    yield put(uniGetStaked());
    yield put(uniGetEarned());
    yield put(uniGetStakeTokenBalance());
  } catch(err) {
    
  }
}

function* getEarned() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    const earned = yield web3client.poolGetEarned(web3client.uniContract, account.address);
    yield put(uniGetEarnedSuccess(earned));
  } catch(err) {
    
  }
}

function* getStaked() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    const staked = yield web3client.getBalance(web3client.uniContract, account.address);
    const totalStaked = yield web3client.getTotalSupply(web3client.uniContract);
    yield put(uniGetStakedSuccess(staked));
    yield put(uniGetTotalStakedSuccess(totalStaked));
    yield put(uniGetStakeTokenBalance());
  } catch(err) {
    
  }
}

function* getStakeTokenBalance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    const balance = yield web3client.getBalance(web3client.uniTokenContract, account.address);
    yield put(uniGetStakeTokenBalanceSuccess(balance));
  } catch(err) {
    console.error(err);
  }
}

function* getPeriodFinish() {
  try {
    const period = yield web3client.poolGetPeriodFinish(web3client.uniContract);
    yield put(uniGetPeriodFinishSuccess(period));
  } catch(err) {
    yield put(uniGetPeriodFinishSuccess(new Date()));
  }
}

function* sagaWatcher() {
  //yield takeLatest(ActionType.INIT_STORE as any, getStakeTokenBalance);
  yield takeLatest(ActionType.UNI_LOAD_ALLOWANCE as any, loadAllowance);
  yield takeLatest(ActionType.UNI_APPROVE_TOKEN as any, approve);
  yield takeLatest(ActionType.UNI_STAKE as any, stake);
  yield takeLatest(ActionType.UNI_WITHDRAW as any, withdraw);
  yield takeLatest(ActionType.UNI_HARVEST as any, harvest);
  yield takeLatest(ActionType.UNI_EXIT as any, exit);
  yield takeLatest(ActionType.UNI_GET_EARNED as any, getEarned);
  yield takeLatest(ActionType.UNI_GET_STAKED as any, getStaked);
  yield takeLatest(ActionType.UNI_GET_STAKE_TOKEN_BALANCE as any, getStakeTokenBalance);
  yield takeLatest(ActionType.INIT_STORE as any, getPeriodFinish);
}

export default [
  fork(sagaWatcher),
];
