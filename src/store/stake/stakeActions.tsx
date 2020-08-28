import { ActionType } from 'types';

export const setStakeTokenAllowance = (
    payload: number
) => {
    return {
        type: ActionType.STAKE_SET_ALLOWANCE,
        payload,
    };
};
