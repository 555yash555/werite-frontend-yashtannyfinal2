import axios from "axios";

export const addComment =
  (post_id , comment, reply_of_comment_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_COMMENT_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/comments/post/${post_id}`,
        { reply_of_comment_id, comment },
        config
      );

      dispatch({ type: "ADD_COMMENT_SUCCESS", rootComments: data });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "ADD_COMMENT_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const addReply =
  (post_id, comment, reply_of_comment_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_REPLY_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/comments/post/${post_id}`,
        { comment, reply_of_comment_id },
        config
      );
      console.log("this sis repy");
      console.log(data);

      dispatch({
        type: "ADD_REPLY_SUCCESS",
        rootComments: data,
      });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "ADD_REPLY_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getParentComments = (post_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_PARENT_COMMENT_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/comments/post/${post_id}`, config);
    console.log("comments are here",data);
    dispatch({ type: "GET_PARENT_COMMENT_SUCCESS", rootComments: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_PARENT_COMMENT_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getReplies =
  (post_id, reply_of_comment_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_REPLY_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/comments/post/${post_id}/${reply_of_comment_id}`,
        config
      );
      // console.log(1, data);
      dispatch({ type: "GET_REPLY_SUCCESS", payload: data });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "GET_REPLY_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };


  // actions/commentActions.js



export const addCommentUpvote = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADD_COMMENT_UPVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/comments/${commentId}/upvote`,
      {},
      config
    );

    dispatch({ type: "ADD_COMMENT_UPVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "ADD_COMMENT_UPVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


// actions/commentActions.js

export const getAllCommentUpvotes = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_ALL_COMMENT_UPVOTES_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(
      `/api/comments/${commentId}/upvote`,
      config
    );

    dispatch({ type: "GET_ALL_COMMENT_UPVOTES_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_ALL_COMMENT_UPVOTES_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// actions/commentActions.js



export const addCommentDownvote = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADD_COMMENT_DOWNVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/comments/${commentId}/downvote`,
      {},
      config
    );

    dispatch({ type: "ADD_COMMENT_DOWNVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "ADD_COMMENT_DOWNVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


// actions/commentActions.js



export const getAllCommentDownvotes = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_ALL_COMMENT_DOWNVOTES_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(
      `/api/comments/${commentId}/downvote`,
      config
    );

    dispatch({ type: "GET_ALL_COMMENT_DOWNVOTES_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_ALL_COMMENT_DOWNVOTES_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


