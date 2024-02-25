export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    case "FORGOT_FAILURE":
      return { loading: false, error: action.payload };
    case "FORGOT_SUCCESS": 
      return { loading: false, message: action.payload}
    case 'RESET_PASSWORD_SUCCESS': 
      return { message: action.payload}
    case 'RESET_PASSWORD_FAIL':
      return { error: action.payload}
    case 'USER_CLEAR_ERRORS':
      console.log("errors cleared");
      const { error, ...restOfState } = state;
      return restOfState;
        
      
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, message: "User registered Successfully!" };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    case 'USER_CLEAR_ERRORS':
        return {
         
          
        };
      
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "RESET_USER_DETAILS":
      return { user: {} };
    default:
      return state;
  }
};

export const getMyPosts = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_POSTS_REQUEST":
      return { ...state, loading: true };
    case "GET_MY_POSTS_SUCCESS":
      return { loading: false, posts: action.payload };
    case "GET_MY_POSTS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addMyBio = (state = {}, action) => {
  switch (action.type) {
    case "ADD_MY_BIO_REQUEST":
      return { ...state, loading: true };
    case "ADD_MY_BIO_SUCCESS":
      return { loading: false, bio: action.payload };
    case "ADD_MY_BIO_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addMyProfile = (state = {}, action) => {
  switch (action.type) {
    case "ADD_MY_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "ADD_MY_PROFILE_SUCCESS":
      return { loading: false, profile: action.payload };
    case "ADD_MY_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// userReducers.js

const initialState = {
  user: {},
  error: null,
};

export const userSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_USER_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.length > 0 ? action.payload : {},
        error1: action.payload.length > 0 ? null : "no users found",
      };
    case 'SEARCH_USER_FAIL':
      return {
        ...state,
        user: {},
        error1: action.payload,
      };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "RESET_PASSWORD_REQUEST":
      return { loading: true };
    case "RESET_PASSWORD_SUCCESS":
      return { loading: false, success: true, message: "Password reset successfully!" };
    case "RESET_PASSWORD_FAIL":
      return { loading: false, error: action.payload };
    case "RESET_PASSWORD_RESET":
      return {};
    default:
      return state;
  }
};

