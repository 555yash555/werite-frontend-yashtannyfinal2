
  
  export const editPoolReducer = (state = {}, action) => {
    switch (action.type) {
      case 'POOL_EDIT_REQUEST':
        return { eloading: true };
      case 'POOL_EDIT_SUCCESS':
        return { eloading: false, esuccess: true, pool: action.payload.updatedPool };
      case 'POOL_EDIT_FAIL':
        return { eloading: false, eerror: action.payload };
      case 'EDIT_CREATE_RESET':
          return {};
      default:
        return state;
    }
  };