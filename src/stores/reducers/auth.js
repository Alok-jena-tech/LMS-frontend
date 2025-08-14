import { LOGIN_SUCCESS, LOGOUT  ,ALL_FILTERED_COURSES
} from "../../utils/constants";

// src/store/reducers/authReducer.js
const initialState = {
  user: null,
  isAuthenticated: false,
    all_filted_courses: [],

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
      case ALL_FILTERED_COURSES:
      return {
        ...state,
        all_filted_courses: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
