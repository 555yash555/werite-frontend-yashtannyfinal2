// postReducer.js

import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
} from '../constants/postConstants.js'

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      
      return { loading: false, success: true, post: action.payload,message: "Posted Successfully!" };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case 'POST_CREATE_RESET':
        return {};
    default:
      return state;
  }
};

export const getAllPostss = (state ={}, action) => {
  switch (action.type) {
    case "GET_ALL_POSTS_REQUEST":
      return { ...state, loading: true };
    case "GET_ALL_POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "GET_ALL_POSTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// reducers/postReducers.js

export const getPostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_POST_REQUEST':
      return { loading: true };
    case 'GET_POST_SUCCESS':
      return { loading: false, post: action.payload };
    case 'GET_POST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_POST_REQUEST':
      return { loading: true };
    case 'DELETE_POST_SUCCESS':
      return { loading: false, success: true, postId: action.payload };
    case 'DELETE_POST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

