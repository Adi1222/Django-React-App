import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility"; // not used

export const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
