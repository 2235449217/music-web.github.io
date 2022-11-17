// 从redux引入combineReducers改成从redux-immutable引入combineReducers
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";
import { reducer as playerReducer } from "../pages/player/store";

const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
});
export default cReducer;
