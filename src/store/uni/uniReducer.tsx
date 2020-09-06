import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface UniReducerType {
  allowance: number;
  staked: number;
  totalStaked: number;
  stakeTokenBalance: number;
  earned: number;
  periodFinish: Date;
}

export const defaultState: UniReducerType = {
  allowance: 0,
  staked: 0,
  totalStaked: 0,
  stakeTokenBalance: 0,
  earned: 0,
  periodFinish: new Date(),
};

// reducers
const uniApproveTokenSuccessReducer = (
  state: UniReducerType,
  { payload }: Action<number>,
): UniReducerType => {
  return {
    ...state,
    allowance: payload,
  };
};

const uniGetStakedSuccessReducer = (
  state: UniReducerType,
  { payload }: Action<number>,
): UniReducerType => {
  return {
    ...state,
    staked: payload,
  };
};

const uniGetEarnedSuccessReducer = (
  state: UniReducerType,
  { payload }: Action<number>,
): UniReducerType => {
  return {
    ...state,
    earned: payload,
  };
};

const uniGetStakeTokenBalanceReducer = (
  state: UniReducerType,
  { payload }: Action<number>,
): UniReducerType => {
  return {
    ...state,
    stakeTokenBalance: payload,
  };
};

const uniGetTotalStakedSuccessReducer = (
  state: UniReducerType,
  { payload }: Action<number>,
): UniReducerType => {
  return {
    ...state,
    totalStaked: payload,
  };
};

const uniGetPeriodFinishSuccessReducer = (
  state: UniReducerType,
  { payload }: Action<Date>,
): UniReducerType => {
  return {
    ...state,
    periodFinish: payload,
  };
};

export const uniReducer = createReducer<UniReducerType>(defaultState, {
  [ActionType.UNI_APPROVE_TOKEN_SUCCESS]: uniApproveTokenSuccessReducer,
  [ActionType.UNI_GET_STAKED_SUCCESS]: uniGetStakedSuccessReducer,
  [ActionType.UNI_GET_EARNED_SUCCESS]: uniGetEarnedSuccessReducer,
  [ActionType.UNI_GET_STAKE_TOKEN_BALANCE_SUCCESS]: uniGetStakeTokenBalanceReducer,
  [ActionType.UNI_GET_TOTAL_STAKED_SUCCESS]: uniGetTotalStakedSuccessReducer,
  [ActionType.UNI_GET_PERIOD_FINISH_SUCCESS]: uniGetPeriodFinishSuccessReducer,
});
