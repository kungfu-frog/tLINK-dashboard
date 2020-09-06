import { combineReducers } from "redux";
import { basicReducer } from "store/app/basicReducer";
import { accountReducer } from "store/account/accountReducer";
import { tokenReducer } from "store/token/tokenReducer";
import { stakeReducer } from "store/stake/stakeReducer";
import { poolReducer } from "store/pool/poolReducer";
import { uniReducer } from "store/uni/uniReducer";

const appReducer = combineReducers({
    basic: basicReducer,
    account: accountReducer,
    token: tokenReducer,
    stake: stakeReducer,
    pool: poolReducer,
    uni: uniReducer,
});

export default (state: any, action: any) => {
    return appReducer(state, action);
}
