import { RootState } from 'types';
import { PoolReducerType } from './poolReducer';
import { createSelector } from 'reselect';

export const selectPoolState = (state: RootState, props?: any): PoolReducerType => {
    return state.pool;
};

export const selectPoolStakeAllowed = createSelector(
    [ selectPoolState ],
    (state) => state.allowance > 0,
);

export const selectPoolStaked = createSelector(
  [ selectPoolState ],
  (state) => state.staked,
);

export const selectPoolEarned = createSelector(
  [ selectPoolState ],
  (state) => state.earned,
);

export const selectStakeTokenBalance = createSelector(
  [ selectPoolState ],
  (state) => state.stakeTokenBalance,
);

export const selectPoolTotalStaked = createSelector(
  [ selectPoolState ],
  (state) => state.totalStaked,
);
