import { ActionType } from 'types';

export const poolApproveToken = () => ({
  type: ActionType.POOL_APPROVE_TOKEN,
});

export const poolApproveTokenSuccess = (payload: number) => ({
  type: ActionType.POOL_APPROVE_TOKEN_SUCCESS,
  payload,
});

export const poolStake = (amount: number) => ({
  type: ActionType.POOL_STAKE,
  amount,
});

export const poolWithdraw = (amount: number) => ({
  type: ActionType.POOL_WITHDRAW,
  amount,
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

export const poolGetEarnedSuccess = (amount: number) => ({
  type: ActionType.POOL_GET_EARNED_SUCCESS,
  amount,
});

export const poolGetStaked = () => ({
  type: ActionType.POOL_GET_STAKED,
});

export const poolGetStakedSuccess = (amount: number) => ({
  type: ActionType.POOL_GET_STAKED_SUCCESS,
  amount,
});
