import { ALL_STUDENT, CLEAR_ALL_STUDENT } from "../../utils/constants";

// src/store/reducers/studentReducer.js
const initialState = {
  all_students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_STUDENT:
      return {
        ...state,
        all_students: action.payload,
      };
    case CLEAR_ALL_STUDENT:
      return {
        ...state,
        all_students: [],
      };
    default:
      return state;
  }
};

export default studentReducer;
