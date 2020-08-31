
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
enum GeyserType {
    GEYSER_SET_ALLOWANCE = 'GEYSER_SET_ALLOWANCE',
    GEYSER_SET_TOTAL_STAKED = 'GEYSER_SET_TOTAL_STAKED',
    GEYSER_SET_STAKED = 'GEYSER_SET_STAKED',
    GEYSER_SET_TOTAL_LOCKED = 'GEYSER_SET_TOTAL_LOCKED',
    GEYSER_SET_TOTAL_UNLOCKED = 'GEYSER_SET_TOTAL_UNLOCKED',
    GEYSER_LOAD_ALLOWANCE = 'GEYSER_LOAD_ALLOWANCE',
    GEYSER_LOAD_STAKED = 'GEYSER_LOAD_STAKED',
    GEYSER_LOAD_LOCKED = 'GEYSER_LOAD_LOCKED',
    GEYSER_APPROVE_TOKEN = 'GEYSER_APPROVE_TOKEN',
    GEYSER_GEYSER_TOKEN = 'GEYSER_GEYSER_TOKEN',
    GEYSER_UNGEYSER_TOKEN = 'GEYSER_UNGEYSER_TOKEN',
}

export type IActionType = 
    | BasicType
    | AccountType
    | TokenType
    | GeyserType;

export const ActionType = {
    ...BasicType,
    ...AccountType,
    ...TokenType,
    ...GeyserType,
};
