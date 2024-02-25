//admin
// reducers/userReducers.js

export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_REQUEST":
      return { ...state,loading: true };
    case "GET_ALL_USERS_SUCCESS":
      console.log("i am from reducer");
      console.log(action.payload);
      return { ...state,loading: false, listofusers: action.payload };
    case "GET_ALL_USERS_FAIL":
      return { ...state,loading: false, error: action.payload };
    default:
      return state;
  }
};

  
  
  export const poolReducer = (state = {}, action) => {
    switch (action.type) {
      case 'GET_ALL_POOLS_REQUEST':
        return {
          ...state,
          poolloading: true,
          error: null,
        };
  
      case 'GET_ALL_POOLS_SUCCESS':
        console.log(action.payload);
        return {
          ...state,
          poolloading: false,
          pools: action.payload,
        };
  
      case 'GET_ALL_POOLS_FAILURE':
        return {
          ...state,
          poolloading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };

  export const getAllReportsReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_REPORTS_REQUEST":
        return { ...state, reportLoading: true,error:null };
      case "GET_ALL_REPORTS_SUCCESS":
        console.log("i am from reducer");
        console.log(action.payload);
        return { ...state, reportLoading: false, reports: action.payload };
      case "GET_ALL_REPORTS_FAIL":
        return { ...state, reportLoading: false, error: action.payload };
      default:
        return state;
    }
  };
  