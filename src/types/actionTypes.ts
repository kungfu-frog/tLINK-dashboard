
export interface Action<T> {
    type: IActionType;
    payload: T;
}

export interface FormFieldPayload<T> {
    index?: number | string;
    key: T;
    value: string | any;
}

enum BasicType {
    INIT_STORE = 'ON_INIT',
    SET_NAVIGATION = 'SET_NAVIGATION',
    SET_LOADING = 'SET_LOADING',
}
enum AccountType {
    LOAD_ACCOUNT = 'LOAD_ACCOUNT',
    SET_ACCOUNT = 'SET_ACCOUNT',
}
enum TokenType {
    TOKEN_SET_TOTAL_SUPPLY = 'TOKEN_SET_TOTAL_SUPPLY',
    TOKEN_LOAD_TOTAL_SUPPLY = 'TOKEN_LOAD_TOTAL_SUPPLY',
}
enum StakeType {
    STAKE_SET_ALLOWANCE = 'STAKE_SET_ALLOWANCE',
    STAKE_SET_TOTAL_STAKED = 'STAKE_SET_TOTAL_STAKED',
    STAKE_SET_STAKED = 'STAKE_SET_STAKED',
    STAKE_SET_TOTAL_LOCKED = 'STAKE_SET_TOTAL_LOCKED',
    STAKE_SET_TOTAL_UNLOCKED = 'STAKE_SET_TOTAL_UNLOCKED',
    STAKE_APPROVE_TOKEN = 'STAKE_APPROVE_TOKEN',
}

export type IActionType = 
    | BasicType
    | AccountType
    | TokenType
    | StakeType;

export const ActionType = {
    ...BasicType,
    ...AccountType,
    ...TokenType,
    ...StakeType,
};
