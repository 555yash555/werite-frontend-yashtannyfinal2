import axios from 'axios';

// Action Types
export const POOL_EDIT_REQUEST = 'POOL_EDIT_REQUEST';
export const POOL_EDIT_SUCCESS = 'POOL_EDIT_SUCCESS';
export const POOL_EDIT_FAIL = 'POOL_EDIT_FAIL';

// Action Creators
export const editPool = (pool_id, poolData) => async (dispatch, getState) => {
  try {
    dispatch({ type: POOL_EDIT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(`/api/pools/${pool_id}`, poolData, config);

    dispatch({
      type: POOL_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error updating pool");
    dispatch({
      type: POOL_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};