import {
  INNER_LOADER,
  CLEAR_INNER_LOADER,
  MAIN_LOADER,
  CLEAR_MAIN_LOADER,
} from "../../utils/constants";

const initialState = {
  inner_loader: false,
  main_loader: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case INNER_LOADER:
      return { ...state, inner_loader: action.payload };
    case CLEAR_INNER_LOADER:
      return { ...state, inner_loader: action.payload };
    case MAIN_LOADER:
      return { ...state, main_loader: action.payload };
    case CLEAR_MAIN_LOADER:
      return { ...state, main_loader: action.payload };
    default:
      return state;
  }
};

export default loaderReducer;
