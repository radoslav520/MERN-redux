import quoteReducer from "./quoteReducer";
import dateReducer from "./dateReducer";
import taskReducer from "./taskReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  quote: quoteReducer,
  dates: dateReducer,
  tasks: taskReducer,
});

export default rootReducer;
