
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

export type IActionType = 
    | BasicType;

export const ActionType = {
    ...BasicType,
    ...AccountType,
};
