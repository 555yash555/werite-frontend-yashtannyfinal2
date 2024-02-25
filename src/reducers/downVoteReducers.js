export const downVoteVideo = (state = {}, action) => {
  switch (action.type) {
    case "ADD_DOWNVOTE_REQUEST":
      return { loading: true };
    case "ADD_DOWNVOTE_SUCCESS":
      return { loading: false, message: "Video DisLiked" };
    case "ADD_DOWNVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getDownVotes = (state = {}, action) => {
  switch (action.type) {
    case "GET_DOWNVOTE_REQUEST":
      return { loading: true };
    case "GET_DOWNVOTE_SUCCESS":
      return { loading: false, dislikes: action.payload };
    case "GET_DOWNVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeDislike = (state = {}, action) => {
  switch (action.type) {
    case "REMOVE_DOWNVOTE_REQUEST":
      return { loading: true };
    case "REMOVE_DOWNVOTE_SUCCESS":
      return { loading: false, message: "Video DisLiked Removed" };
    case "REMOVE_DOWNVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
