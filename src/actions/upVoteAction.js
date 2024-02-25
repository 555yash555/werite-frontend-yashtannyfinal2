import axios from "axios";

export const addLike = (post_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADD_UPVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/upvotes/post/${post_id}`,
      {},
      config
    );
    console.log(data);
    dispatch({ type: "ADD_UPVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "ADD_UPVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getAllLikes = (post_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_UPVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/upvotes/post/${post_id}`, config);

    dispatch({ type: "GET_UPVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_UPVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeLike = (post_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REMOVE_UPVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/upvotes/post/${post_id}`,
      config
    );
    console.log(data);
    dispatch({ type: "REMOVE_UPVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "REMOVE_UPVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
