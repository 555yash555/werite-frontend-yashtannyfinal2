//getAllUser// actions/userActions.js

import Axios from "axios";

export const getAllUsersRequest = () => ({
  type: "GET_ALL_USERS_REQUEST",
});

export const getAllUsersSuccess = (users) => ({
  type: "GET_ALL_USERS_SUCCESS",
  payload: users,
});

export const getAllUsersFail = (error) => ({
  type: "GET_ALL_USERS_FAIL",
  payload: error,
});

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(getAllUsersRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.get("/api/admin/users", config);
    console.log("mammaamaa");
    console.log(data);

    dispatch(getAllUsersSuccess(data));
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch(
      getAllUsersFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};


// actions/poolActions.js

export const getAllPoolsRequest = () => ({
  type: 'GET_ALL_POOLS_REQUEST',
});

export const getAllPoolsSuccess = (pools) => ({
  type: 'GET_ALL_POOLS_SUCCESS',
  payload: pools,
});

export const getAllPoolsFailure = (error) => ({
  type: 'GET_ALL_POOLS_FAILURE',
  payload: error,
});

export const getAllPools = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllPoolsRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userInfo.token}`,
        },
      };

      const response = await Axios.get('/api/admin/pools', config);
      console.log(response.data);

      dispatch(getAllPoolsSuccess(response.data));
    } catch (error) {
      dispatch(getAllPoolsFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      ));
    }
  };
};

