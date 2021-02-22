import { combineReducers } from "redux";
import referenceReducer from "./referenceReducer";

export default combineReducers({
	items: referenceReducer
});
