import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface StakeReducerType {
  allowance: number;
}

export const defaultState: StakeReducerType = {
  allowance: 0,
};

// reducers
const setStakeTokenAllownaceReducer = (
  state: StakeReducerType,
  { payload }: Action<number>,
): StakeReducerType => {
  return {
    ...state,
    allowance: payload,
  };
}

export const stakeReducer = createReducer<StakeReducerType>(defaultState, {
  [ActionType.STAKE_SET_ALLOWANCE]: setStakeTokenAllownaceReducer,
});
