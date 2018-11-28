import { combineReducers } from "redux";
import mainReducer from "./main_reducer.js";

const appReducer = combineReducers({ mainReducer });

export default (state = {}, action) => appReducer(state, action);
