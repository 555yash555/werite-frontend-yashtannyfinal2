export const upVoteVideo = (state = {}, action) => {
  switch (action.type) {
    case "ADD_UPVOTE_REQUEST":
      return { loading: true };
    case "ADD_UPVOTE_SUCCESS":
      return { loading: false, message: "Video Liked" };
    case "ADD_UPVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUpVotes = (state = {}, action) => {
  switch (action.type) {
    case "GET_UPVOTE_REQUEST":
      return { loading: true };
    case "GET_UPVOTE_SUCCESS":
      return { loading: false, likes: action.payload };
    case "GET_UPVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeLike = (state = {}, action) => {
  switch (action.type) {
    case "REMOVE_UPVOTE_REQUEST":
      return { loading: true };
    case "REMOVE_UPVOTE_SUCCESS":
      return { loading: false, message: "Video Liked Removed" };
    case "REMOVE_UPVOTE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
