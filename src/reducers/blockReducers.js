export const blockUserReducer = (state = {}, action) => {
    switch (action.type) {
      case "BLOCK_USER_REQUEST":
        return { loading: true };
      case "BLOCK_USER_SUCCESS":
        console.log("i am from reducer");
        console.log(action.payload);
        return { loading: false, bsuccess: true, message: "User Blocked" };
      case "BLOCK_USER_FAIL":
        return { loading: false, berror: action.payload };
      case 'BLOCK_CREATE_RESET':
        return {};
      default:
        return state;
    }
  };
  

  
  export const unblockUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'UNBLOCK_USER_REQUEST':
        return { loading: true };
      case 'UNBLOCK_USER_SUCCESS':
        return { loading: false, message: action.payload };
      case 'UNBLOCK_USER_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };




// Reducer Function
export const getBlockedUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_BLOCKED_USERS_REQUEST':
      return { ...state, blockloading: true, error: null };
    case 'GET_BLOCKED_USERS_SUCCESS':
      console.log("i am from reducer");
      console.log(action.payload);
      return { ...state, blockloading: false, blocks: action.payload };
    case 'GET_BLOCKED_USERS_FAIL':
      return { ...state, blockloading: false, error: action.payload };
    default:
      return state;
  }
};
  