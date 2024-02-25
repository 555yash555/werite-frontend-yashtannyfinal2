export const createPoolReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_POOL_REQUEST":
      return { loading: true };
    case "CREATE_POOL_SUCCESS":
      return { loading: false, success: true, message: "Pool created Successfully!" };
    case "CREATE_POOL_FAIL":
      return { loading: false, error: action.payload };
    case 'POOL_CREATE_RESET':
        return {};
    default:
      return state;
  }
};

export const getPoolsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POOLS_REQUEST":
      return { loading: true };
    case "GET_POOLS_SUCCESS":
      return { loading: false, pools: action.payload };
    case "GET_POOLS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getMyPoolsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_POOLS_REQUEST":
      return { loading: true };
    case "GET_MY_POOLS_SUCCESS":
      return { loading: false, pools: action.payload };
    case "GET_MY_POOLS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPoolRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_POOL_REQUEST_REQUEST":
      return { loading: true };
    case "CREATE_POOL_REQUEST_SUCCESS":
      return {
        loading: false,
        message: "Request Sent Successfully!",
        pool_id: action.pool_id,
        noti: action.payload.noti
      };
    case "CREATE_POOL_REQUEST_FAIL":
      return { loading: false, error: action.payload, pool_id: action.pool_id };
    default:
      return state;
  }
};

export const getMyPoolRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_POOL_REQUESTS_REQUEST":
      return { loading: true };
    case "GET_MY_POOL_REQUESTS_SUCCESS":
      return { loading: false, requests: action.payload };
    case "GET_MY_POOL_REQUESTS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
