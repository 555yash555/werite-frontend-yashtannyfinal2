import Axios from "axios";

export const blockUserRequest = () => ({
  type: "BLOCK_USER_REQUEST",
});

export const blockUserSuccess = (message) => ({
  type: "BLOCK_USER_SUCCESS",
  payload: message,
});

export const blockUserFail = (error) => ({
  type: "BLOCK_USER_FAIL",
  payload: error,
});

export const blockUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch(blockUserRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.post(
      `/api/users/block/${userId}`,
      {},
      config
    );

    dispatch(blockUserSuccess(data.message));
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch(
      blockUserFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};



export const unblockUserRequest = () => {
    return {
      type: 'UNBLOCK_USER_REQUEST',
    };
  };
  
  export const unblockUserSuccess = (message) => {
    return {
      type: 'UNBLOCK_USER_SUCCESS',
      payload: message,
    };
  };
  
  export const unblockUserFail = (error) => {
    return {
      type: 'UNBLOCK_USER_FAIL',
      payload: error,
    };
  };
  
  export const unblockUser = (userId) => async (dispatch, getState) => {
    try {
      dispatch(unblockUserRequest());
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.delete(`/api/users/block/${userId}`, config);
  
      dispatch(unblockUserSuccess(data.message));
    } catch (error) {
      console.log(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      dispatch(unblockUserFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      ));
    }
  };


//getAllblocks


// Action Types
export const GET_BLOCKED_USERS_REQUEST = "GET_BLOCKED_USERS_REQUEST";
export const GET_BLOCKED_USERS_SUCCESS = "GET_BLOCKED_USERS_SUCCESS";
export const GET_BLOCKED_USERS_FAIL = "GET_BLOCKED_USERS_FAIL";

// Action Creators
export const getBlockedUsersRequest = () => ({
  type: GET_BLOCKED_USERS_REQUEST,
});

export const getBlockedUsersSuccess = (blockedUsers) => ({
  type: GET_BLOCKED_USERS_SUCCESS,
  payload: blockedUsers,
});

export const getBlockedUsersFail = (error) => ({
  type: GET_BLOCKED_USERS_FAIL,
  payload: error,
});

// Async Action to Get Blocked Users
export const getBlockedUsers = () => async (dispatch, getState) => {
  try {
    dispatch(getBlockedUsersRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.get("/api/users/block", config);

    dispatch(getBlockedUsersSuccess(data));
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch(
      getBlockedUsersFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};


