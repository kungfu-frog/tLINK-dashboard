import { BasicReducerType } from 'store/app/basicReducer';
import { AccountReducerType } from 'store/account/accountReducer';
import { TokenReducerType } from 'store/token/tokenReducer';

export interface RootState {
    basic: BasicReducerType;
    account: AccountReducerType;
    token: TokenReducerType;
}
