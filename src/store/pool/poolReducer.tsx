import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface PoolReducerType {
  allowance: number;
  staked: number;
  totalStaked: number;
  stakeTokenBalance: number;
  earned: number;
}

export const defaultState: PoolReducerType = {
  allowance: 0,
  staked: 0,
  totalStaked: 0,
  stakeTokenBalance: 0,
  earned: 0,
};

// reducers
const poolApproveTokenSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => {
  return {
    ...state,
    allowance: payload,
  };
};

const poolGetStakedSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => {
  return {
    ...state,
    staked: payload,
  };
};

const poolGetEarnedSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => {
  return {
    ...state,
    earned: payload,
  };
};

const poolGetStakeTokenBalanceReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => {
  return {
    ...state,
    stakeTokenBalance: payload,
  };
};

const poolGetTotalStakedSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => {
  return {
    ...state,
    totalStaked: payload,
  };
};

export const poolReducer = createReducer<PoolReducerType>(defaultState, {
  [ActionType.POOL_APPROVE_TOKEN_SUCCESS]: poolApproveTokenSuccessReducer,
  [ActionType.POOL_GET_STAKED_SUCCESS]: poolGetStakedSuccessReducer,
  [ActionType.POOL_GET_EARNED_SUCCESS]: poolGetEarnedSuccessReducer,
  [ActionType.POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS]: poolGetStakeTokenBalanceReducer,
  [ActionType.POOL_GET_TOTAL_STAKED_SUCCESS]: poolGetTotalStakedSuccessReducer,
});
