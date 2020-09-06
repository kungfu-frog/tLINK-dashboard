import { RootState } from 'types';
import { UniReducerType } from './uniReducer';
import { createSelector } from 'reselect';

export const selectUniState = (state: RootState, props?: any): UniReducerType => {
    return state.uni;
};

export const selectUniStakeAllowed = createSelector(
    [ selectUniState ],
    (state) => state.allowance > 0,
);

export const selectUniStaked = createSelector(
  [ selectUniState ],
  (state) => state.staked,
);

export const selectUniEarned = createSelector(
  [ selectUniState ],
  (state) => state.earned,
);

export const selectStakeTokenBalance = createSelector(
  [ selectUniState ],
  (state) => state.stakeTokenBalance,
);

export const selectUniTotalStaked = createSelector(
  [ selectUniState ],
  (state) => state.totalStaked,
);

export const selectUniPeriodFinish = createSelector(
  [ selectUniState ],
  (state) => state.periodFinish,
);
