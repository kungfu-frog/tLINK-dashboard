import { combineReducers } from "redux";
import { basicReducer } from "store/app/basicReducer";
import { accountReducer } from "store/account/accountReducer";

const appReducer = combineReducers({
    basic: basicReducer,
    account: accountReducer,
});

export default (state: any, action: any) => {
    return appReducer(state, action);
}
