import axios from "axios";

export const addDisLike = (video_id) => async (dispatch, getState) => {
  try {
    console.log('downvote request sent');
    dispatch({ type: "ADD_DOWNVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/downvotes/post/${video_id}`,
      {},
      config
    );

    dispatch({ type: "ADD_DOWNVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "ADD_DOWNVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getAllDisLikes = (video_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_DOWNVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/downvotes/video/${video_id}`,
      config
    );

    dispatch({ type: "GET_DOWNVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_DOWNVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeDislike = (video_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REMOVE_DOWNVOTE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/downvotes/post/${video_id}`,

      config
    );
    console.log(data);
    dispatch({ type: "REMOVE_DOWNVOTE_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "REMOVE_DOWNVOTE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
