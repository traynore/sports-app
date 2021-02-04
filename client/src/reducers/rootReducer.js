import { combineReducers } from "redux";
import playerProfileReducer from "./playerProfileReducer"
import coachProfileReducer from "./coachProfileReducer"
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    playerProfiles: playerProfileReducer,
    coachProfiles: coachProfileReducer
});