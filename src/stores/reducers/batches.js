import {
  ALL_BATCHES,
  CLEAR_ALL_BATCHES,
  ALL_FILTERED_BATCHES,
} from "../../utils/constants";

const initialState = {
  all_batches: [],
  all_filtered_batch: [],
};

const batchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_BATCHES:
      return {
        ...state,
        all_batches: action.payload,
      };
    case CLEAR_ALL_BATCHES:
      return {
        ...state,
        all_batches: [],
      };
    case ALL_FILTERED_BATCHES:
      return {
        ...state,
        all_filtered_batch: action.payload,
      };
    default:
      return state;
  }
};

export default batchReducer;
