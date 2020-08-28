import { RootState } from 'types';
import { StakeReducerType } from './stakeReducer';
import { createSelector } from 'reselect';

export const selectStakeState = (state: RootState, props?: any): StakeReducerType => {
    return state.stake;
};

export const selectStakingTokenAllowance = createSelector(
    [ selectStakeState ],
    (state) => state.allowance,
);
