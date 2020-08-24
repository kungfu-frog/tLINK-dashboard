import { combineReducers } from "redux";
import { basicReducer } from "store/app/basicReducer";

const appReducer = combineReducers({
    basic: basicReducer,
});

export default (state: any, action: any) => {
    return appReducer(state, action);
}
