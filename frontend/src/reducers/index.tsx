import testReducer from "./test";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    test:testReducer
})

export default rootReducer;