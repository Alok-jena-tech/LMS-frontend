import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./reducers/loader";
import authReducer from "./reducers/auth";
import studentReducer from "./reducers/student";
import courseReducer from "./reducers/course";
import batchReducer from "./reducers/batches";
export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    student: studentReducer,
    course:courseReducer,
    batch:batchReducer
  },
});
