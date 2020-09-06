import { ActionType } from 'types';

export const uniApproveToken = () => ({
  type: ActionType.UNI_APPROVE_TOKEN,
});

export const uniLoadAllowance = () => ({
  type: ActionType.UNI_LOAD_ALLOWANCE,
});

export const uniApproveTokenSuccess = (payload: number) => ({
  type: ActionType.UNI_APPROVE_TOKEN_SUCCESS,
  payload,
});

export const uniStake = (payload: number) => ({
  type: ActionType.UNI_STAKE,
  payload,
});

export const uniWithdraw = (payload: number) => ({
  type: ActionType.UNI_WITHDRAW,
  payload,
});

export const uniHarvest = () => ({
  type: ActionType.UNI_HARVEST,
});

export const uniExit = () => ({
  type: ActionType.UNI_EXIT,
});

export const uniGetEarned = () => ({
  type: ActionType.UNI_GET_EARNED,
});

export const uniGetEarnedSuccess = (payload: number) => ({
  type: ActionType.UNI_GET_EARNED_SUCCESS,
  payload,
});

export const uniGetStaked = () => ({
  type: ActionType.UNI_GET_STAKED,
});

export const uniGetStakedSuccess = (payload: number) => ({
  type: ActionType.UNI_GET_STAKED_SUCCESS,
  payload,
});

export const uniGetStakeTokenBalance = () => ({
  type: ActionType.UNI_GET_STAKE_TOKEN_BALANCE,
});

export const uniGetStakeTokenBalanceSuccess = (payload: number) => ({
  type: ActionType.UNI_GET_STAKE_TOKEN_BALANCE_SUCCESS,
  payload,
});

export const uniGetTotalStakedSuccess = (payload: number) => ({
  type: ActionType.UNI_GET_TOTAL_STAKED_SUCCESS,
  payload,
});

export const uniGetPeriodFinish = () => ({
  type: ActionType.UNI_GET_PERIOD_FINISH,
});

export const uniGetPeriodFinishSuccess = (payload: Date) => ({
  type: ActionType.UNI_GET_PERIOD_FINISH_SUCCESS,
  payload,
});
