import { put, takeLatest, fork, select } from 'redux-saga/effects';
import { ActionType, Action } from 'types';

import { web3client } from 'lib';
import Config from 'config';
import { selectAccount } from 'store/account/accountSelector';
import { poolApproveTokenSuccess, poolGetEarnedSuccess, poolGetStaked, poolGetEarned, poolGetStakedSuccess, poolGetStakeTokenBalanceSuccess, poolGetStakeTokenBalance, poolGetTotalStakedSuccess } from './poolActions';

function* loadAllowance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const allowance = yield web3client.allowance(web3client.stakingTokenContract, account.address, Config.Pool.address);
    yield put(poolApproveTokenSuccess(allowance));
  } catch(err) {
    yield put(poolApproveTokenSuccess(0));
  }
}

function* approve() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.approve(web3client.stakingTokenContract, Config.Pool.address, account.address);
    const allowance = yield web3client.allowance(web3client.stakingTokenContract, account.address, Config.Pool.address);
    yield put(poolApproveTokenSuccess(allowance));
  } catch(err) {
    yield put(poolApproveTokenSuccess(0));
  }
}

function* stake({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolStake(payload * Math.pow(10, Config.StakingToken.decimals), account.address);
    yield put(poolGetStaked());
  } catch(err) {
    console.error(err);
  }
}

function* withdraw({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolWithdraw(payload * Math.pow(10, Config.StakingToken.decimals), account.address);
    yield put(poolGetStaked());
  } catch(err) {
    
  }
}

function* harvest() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolHarvest(account.address);
    yield put(poolGetEarned());
  } catch(err) {
    
  }
}

function* exit() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.poolExit(account.address);
    yield put(poolGetStaked());
    yield put(poolGetEarned());
    yield put(poolGetStakeTokenBalance());
  } catch(err) {
    
  }
}

function* getEarned() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    const earned = yield web3client.poolGetEarned(account.address);
    yield put(poolGetEarnedSuccess(earned));
  } catch(err) {
    
  }
}

function* getStaked() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    const staked = yield web3client.getBalance(web3client.poolContract, account.address);
    const totalStaked = yield web3client.getTotalSupply(web3client.poolContract);
    yield put(poolGetStakedSuccess(staked));
    yield put(poolGetTotalStakedSuccess(totalStaked));
    yield put(poolGetStakeTokenBalance());
  } catch(err) {
    
  }
}

function* getStakeTokenBalance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    const balance = yield web3client.getBalance(web3client.stakingTokenContract, account.address);
    yield put(poolGetStakeTokenBalanceSuccess(balance));
  } catch(err) {
    console.error(err);
  }
}

function* sagaWatcher() {
  //yield takeLatest(ActionType.INIT_STORE as any, getStakeTokenBalance);
  yield takeLatest(ActionType.POOL_LOAD_ALLOWANCE as any, loadAllowance);
  yield takeLatest(ActionType.POOL_APPROVE_TOKEN as any, approve);
  yield takeLatest(ActionType.POOL_STAKE as any, stake);
  yield takeLatest(ActionType.POOL_WITHDRAW as any, withdraw);
  yield takeLatest(ActionType.POOL_HARVEST as any, harvest);
  yield takeLatest(ActionType.POOL_EXIT as any, exit);
  yield takeLatest(ActionType.POOL_GET_EARNED as any, getEarned);
  yield takeLatest(ActionType.POOL_GET_STAKED as any, getStaked);
  yield takeLatest(ActionType.POOL_GET_STAKE_TOKEN_BALANCE as any, getStakeTokenBalance);
}

export default [
  fork(sagaWatcher),
];
