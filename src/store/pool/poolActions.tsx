import { ActionType } from 'types';

export const poolApproveToken = () => ({
  type: ActionType.POOL_APPROVE_TOKEN,
});

export const poolLoadAllowance = () => ({
  type: ActionType.POOL_LOAD_ALLOWANCE,
});

export const poolApproveTokenSuccess = (payload: number) => ({
  type: ActionType.POOL_APPROVE_TOKEN_SUCCESS,
  payload,
});

export const poolStake = (payload: number) => ({
  type: ActionType.POOL_STAKE,
  payload,
});

export const poolWithdraw = (payload: number) => ({
  type: ActionType.POOL_WITHDRAW,
  payload,
});

export const poolHarvest = () => ({
  type: ActionType.POOL_HARVEST,
});

export const poolExit = () => ({
  type: ActionType.POOL_EXIT,
});

export const poolGetEarned = () => ({
  type: ActionType.POOL_GET_EARNED,
});

export const poolGetEarnedSuccess = (payload: number) => ({
  type: ActionType.POOL_GET_EARNED_SUCCESS,
  payload,
});

export const poolGetStaked = () => ({
  type: ActionType.POOL_GET_STAKED,
});

export const poolGetStakedSuccess = (payload: number) => ({
  type: ActionType.POOL_GET_STAKED_SUCCESS,
  payload,
});