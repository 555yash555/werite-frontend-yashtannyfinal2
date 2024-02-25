const initialState = {
  Comments: [],
  loading: false,
  error: null,
};

export const commentReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT_REQUEST":
      return { ...state, loading: true, error: null };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        Comments: [action.rootComments, ...state.Comments],
      };
    case "ADD_COMMENT_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "ADD_REPLY_REQUEST":
      return { ...state, loading: true, error: null };
    case "ADD_REPLY_SUCCESS":
      return {
        ...state,
        loading: false,
        Comments: [action.rootComments, ...state.Comments],
      };
    case "ADD_REPLY_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "GET_REPLY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_REPLY_SUCCESS":
      return { loading: false, childComments: action.payload };
    case "GET_REPLY_FAIL":
      return { loading: false, error: action.payload };

    case "GET_PARENT_COMMENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_PARENT_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        Comments: action.rootComments,
      };
    case "GET_PARENT_COMMENT_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// reducers/commentReducers.js

export const commentUpvoteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT_UPVOTE_REQUEST":
      return { loading: true };
    case "ADD_COMMENT_UPVOTE_SUCCESS":
      return { loading: false, message: "Comment Upvoted" };
    case "ADD_COMMENT_UPVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// reducers/commentReducers.js

export const commentUpvotesReducer = (state = { upvotes: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_COMMENT_UPVOTES_REQUEST":
      return { loading: true, upvotes: [] };
    case "GET_ALL_COMMENT_UPVOTES_SUCCESS":
      return { loading: false, upvotes: action.payload.upvotes };
    case "GET_ALL_COMMENT_UPVOTES_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// reducers/commentReducers.js

export const commentDownvoteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT_DOWNVOTE_REQUEST":
      return { loading: true };
    case "ADD_COMMENT_DOWNVOTE_SUCCESS":
      return { loading: false, message: "Comment Downvoted" };
    case "ADD_COMMENT_DOWNVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// reducers/commentReducers.js

export const commentDownvotesReducer = (state = { downvotes: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_COMMENT_DOWNVOTES_REQUEST":
      return { loading: true, downvotes: [] };
    case "GET_ALL_COMMENT_DOWNVOTES_SUCCESS":
      return { loading: false, downvotes: action.payload.downvotes };
    case "GET_ALL_COMMENT_DOWNVOTES_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};






// export const createReply = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

// export const getReply = (state = {}, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

// export const getParentComments = (state = {}, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
