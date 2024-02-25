const BOOKMARK_POST_REQUEST = 'BOOKMARK_POST_REQUEST';
const BOOKMARK_POST_SUCCESS = 'BOOKMARK_POST_SUCCESS';
const BOOKMARK_POST_FAIL = 'BOOKMARK_POST_FAIL';

export const bookmarkPostReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARK_POST_REQUEST:
      return { loading: true };
    case BOOKMARK_POST_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case BOOKMARK_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const REMOVE_BOOKMARK_REQUEST = 'REMOVE_BOOKMARK_REQUEST';
const REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS';
const REMOVE_BOOKMARK_FAIL = 'REMOVE_BOOKMARK_FAIL';

export const removeBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_BOOKMARK_REQUEST:
      return { loading: true };
    case REMOVE_BOOKMARK_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case REMOVE_BOOKMARK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};