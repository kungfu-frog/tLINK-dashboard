import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface PoolReducerType {
  allowance: number;
  staked: number;
  totalStaked: number;
  earned: number;
}

export const defaultState: PoolReducerType = {
  allowance: 0,
  staked: 0,
  totalStaked: 0,
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

export const poolReducer = createReducer<PoolReducerType>(defaultState, {
  [ActionType.POOL_APPROVE_TOKEN_SUCCESS]: poolApproveTokenSuccessReducer,
  [ActionType.POOL_GET_STAKED_SUCCESS]: poolGetStakedSuccessReducer,
  [ActionType.POOL_GET_EARNED_SUCCESS]: poolGetEarnedSuccessReducer,
});
