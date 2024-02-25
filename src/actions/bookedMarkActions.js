
import Axios from "axios";
export const bookmarkPostRequest = () => {
  return {
    type: 'BOOKMARK_POST_REQUEST',
  };
};

export const bookmarkPostSuccess = (message) => {
  return {
    type: 'BOOKMARK_POST_SUCCESS',
    payload: message,
  };
};

export const bookmarkPostFail = (error) => {
  return {
    type: 'BOOKMARK_POST_FAIL',
    payload: error,
  };
};

export const bookmarkPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch(bookmarkPostRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await Axios.post(`/api/bookmarks/post/${postId}`, {}, config);

    dispatch(bookmarkPostSuccess(data.message));
  } catch (error) {
    dispatch(bookmarkPostFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};


export const removeBookmarkRequest = () => {
  return {
    type: 'REMOVE_BOOKMARK_REQUEST',
  };
};

export const removeBookmarkSuccess = (message) => {
  return {
    type: 'REMOVE_BOOKMARK_SUCCESS',
    payload: message,
  };
};

export const removeBookmarkFail = (error) => {
  return {
    type: 'REMOVE_BOOKMARK_FAIL',
    payload: error,
  };
};

export const removeBookmark = (postId) => async (dispatch, getState) => {
  try {
    dispatch(removeBookmarkRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.delete(`/api/bookmarks/post/${postId}`, config);

    dispatch(removeBookmarkSuccess(data.message));
  } catch (error) {
    dispatch(removeBookmarkFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};