import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  POST_LOADING
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
