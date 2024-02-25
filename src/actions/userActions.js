import Axios from "axios";

export const Login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await Axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      console.log(`data: ${data}`);
      console.log(data.name);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
      // const cookiename = `localhost` + data.name
      document.cookie = `localhost=${JSON.stringify(data)}`;


      localStorage.setItem("userInfo", JSON.stringify(data));
      
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: "USER_LOGOUT",
  });

  dispatch({
    type: "RESET_USER_DETAILS",
  });
};

export const register =
  ({ name, email, password, gender, mobile, username }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await Axios.post(
        "/api/users",
        { name, email, password, gender, mobile, username },
        config
      );

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await Axios.get(`/api/users/${id}`, config);

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (
      message === "Invalid token. Please log in again!" ||
      message === "Your token has expired! Please log in again." ||
      message === "jwt expired"
    ) {
      dispatch(logout());
    }
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: message,
    });
  }
};

export const isuserinacall = () => {
  let token = JSON.parse(localStorage.getItem("userInfo")).token;
  console.log(localStorage.getItem("userInfo"));
  console.log("hey token here");
  console.log(`token: ${token}`);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const data = Axios.get(`http://localhost:8080/isuserincall}`, config);
  return data;
};

export const getMyPosts = (id, upvoted, downvoted, bookmarked)=> async (dispatch, getState) => {
  try {
    console.log("id is here", id)
    dispatch({
      type: "GET_MY_POSTS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let query;
    console.log("heyy query of getmyposts herer")
    console.log("upvoted",upvoted);
    console.log("downvoted",downvoted);
    console.log("bookmarked",bookmarked);
    if (upvoted) {
      query = "/api/users/upvotes";
    } else if (downvoted) {
      query = "/api/users/downvotes";
    } else if (bookmarked) {
      query = "/api/users/bookmarks";
    } else {
      query = "/api/users";
    }
    console.log(id);

    if (id) {
      query += `?id=${id}`;
    }
    console.log(query);

    const { data } = await Axios.get(query, config);

    dispatch({
      type: "GET_MY_POSTS_SUCCESS",
      payload: data,
    });
  }  catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_MY_POSTS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addMyBio = (bio) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_MY_BIO_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await Axios.patch(`/api/users`, { bio }, config);

    dispatch({
      type: "ADD_MY_BIO_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "ADD_MY_BIO_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// userActions.js



export const searchUser = (username) => async (dispatch) => {
  try {
    let token=JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const response = await Axios.get(`/api/users/searchLike?username=${username}`,config);
    dispatch({
      type: 'SEARCH_USER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'SEARCH_USER_FAIL',
      payload: error.response ? error.response.data.message : 'Error searching user',
    });
  }
};


export const addMyProfile = (selectedFile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_MY_PROFILE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await Axios.patch(
      `/api/users/uploads`,
      { profile_pic: selectedFile },
      config
    );

    dispatch({
      type: "ADD_MY_PROFILE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "ADD_MY_PROFILE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const Forgot = email =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await Axios.post(
        "/api/users/forgot",
        {email},
        config
      );
      dispatch({
        type: "FORGOT_SUCCESS",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "FORGOT_FAILURE",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });

    }
  };

  export const Reset =
  (password,token) =>
  async (dispatch) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await Axios.put(
        `/api/users/reset/${token}`,
        {password},
        config
      );

      dispatch({
        type: "RESET_PASSWORD_SUCCESS",
        payload: data,
      });

    } catch (err) {
      dispatch({
        type: "RESET_PASSWORD_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });

    }
  };