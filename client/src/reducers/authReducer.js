import {
  SET_CURRENT_USER,
  SET_DEFAULT_STATE,
  SET_ICONS,
  SET_BLOGS
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  icons: {},
  blogs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case SET_ICONS:
      return {
        ...state,
        icons: action.payload
      };
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload
      };
    case SET_DEFAULT_STATE:
      return {
        isAuthenticated: false,
        user: {},
        icons: {}
      };
    default:
      return state;
  }
}
