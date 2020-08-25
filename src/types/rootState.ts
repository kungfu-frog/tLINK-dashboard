import { BasicReducerType } from 'store/app/basicReducer';
import { AccountReducerType } from 'store/account/accountReducer';

export interface RootState {
    basic: BasicReducerType;
    account: AccountReducerType;
}
