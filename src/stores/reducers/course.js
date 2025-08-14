import {
  ALL_COURSES,
  CLEAR_ALL_COURSES,
} from "../../utils/constants";

const initialState = {
  all_courses: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COURSES:
      return {
        ...state,
        all_courses: action.payload,
      };
    case CLEAR_ALL_COURSES:
      return {
        ...state,
        all_courses: [],
      };
    
    default:
      return state;
  }
};

export default courseReducer;
