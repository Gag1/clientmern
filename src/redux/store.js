import { combineReducers, createStore } from "redux";
import { initialUserInfo, userInfoReducer } from "./reducers/userInfoReducer";


export const myStore = createStore(combineReducers({
    userInfo:userInfoReducer
}))
