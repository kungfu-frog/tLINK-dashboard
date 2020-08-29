import { ActionType } from 'types';

export const setStakeTokenAllowance = (payload: number) => ({
  type: ActionType.STAKE_SET_ALLOWANCE,
  payload,
});

export const setTotalStaked = (payload: number) => ({
  type: ActionType.STAKE_SET_TOTAL_STAKED,
  payload,
});

export const setStaked = (payload: number) => ({
  type: ActionType.STAKE_SET_STAKED,
  payload,
});

export const setTotalLocked = (payload: number) => ({
  type: ActionType.STAKE_SET_TOTAL_LOCKED,
  payload,
});

export const setTotalUnlocked = (payload: number) => ({
  type: ActionType.STAKE_SET_TOTAL_UNLOCKED,
  payload,
});

export const approveStakingToken = () => {
  return {
    type: ActionType.STAKE_APPROVE_TOKEN,
  };
};
