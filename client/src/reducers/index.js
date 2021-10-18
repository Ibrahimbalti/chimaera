import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  err: errReducer
});
