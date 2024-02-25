import axios from 'axios';

// Action Types
export const GET_POOL_BY_ID_REQUEST = 'GET_POOL_BY_ID_REQUEST';
export const GET_POOL_BY_ID_SUCCESS = 'GET_POOL_BY_ID_SUCCESS';
export const GET_POOL_BY_ID_FAILURE = 'GET_POOL_BY_ID_FAILURE';

// Action Creators
export const getPoolByIdRequest = () => ({ type: GET_POOL_BY_ID_REQUEST });
export const getPoolByIdSuccess = (pool) => ({ type: GET_POOL_BY_ID_SUCCESS, payload: pool });
export const getPoolByIdFailure = (error) => ({ type: GET_POOL_BY_ID_FAILURE, payload: error });

// Async Action Creator
export const getPoolById = (poolId) => async (dispatch, getState) => {
  try {
    dispatch(getPoolByIdRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/pools/${poolId}`, config);

    dispatch(getPoolByIdSuccess(data));
  } catch (error) {
    dispatch(getPoolByIdFailure(error.message));
  }
};
