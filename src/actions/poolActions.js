import Axios from "axios";

export const createPool =
  (
    title,
    category,
    merit_required,
    discussion_type,
    spectators_allowed,
    stance,
    guts,
    source,
    duration,
    is_active,
    people_allowed,
    prompts
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CREATE_POOL_REQUEST" });

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
        "/api/pools",
        {
          title,
          category,
          merit_required,
          discussion_type,
          spectators_allowed,
          stance,
          guts,
          source,
          duration,
          is_active,
          people_allowed,
          prompts,
        },
        config
      );

      dispatch({ type: "CREATE_POOL_SUCCESS", payload: data });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "CREATE_POOL_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  export const getPools = (sortByName, sortByDate, isLive, male, female,sortByMerit,rev=true) => async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_POOLS_REQUEST" });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userInfo.token}`,
        },
      };
      let query = "/api/pools";
  
      if (sortByName) {
        query += `?sortByName=${sortByName}`;
      } else if (sortByDate) {
        query += `?sortByDate=${sortByDate}`;
      } else if (isLive) {
        query += `?isLive=${isLive}`;
      } else if (male) {
        query += `?filterByGender=male`;
      } else if (female) {
        query += `?filterByGender=female`;
      } else if (sortByMerit){
        query += `?sortByMerit=${sortByMerit}`;
      }
      console.log(query);
  
      let { data } = await Axios.get(query, config);
      if(!rev){
        data=data.reverse();
      }
      console.log("heyyyyyyyyyy i am poool data");
      console.log(data);
  
      dispatch({ type: "GET_POOLS_SUCCESS", payload: data });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "GET_POOLS_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getMyPools = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_MY_POOLS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.get("/api/pools/my", config);

    dispatch({ type: "GET_MY_POOLS_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_MY_POOLS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createPoolRequest =
  (pool_id, stance, guts) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CREATE_POOL_REQUEST_REQUEST", pool_id });

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
        `/api/pools/${pool_id}/requests`,
        { stance, guts },
        config
      );

      dispatch({ type: "CREATE_POOL_REQUEST_SUCCESS", payload: data, pool_id });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "CREATE_POOL_REQUEST_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
        pool_id,
      });
    }
  };

export const getMyPoolRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_MY_POOL_REQUESTS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.get(`/api/pools/requests/my`, config);

    dispatch({ type: "GET_MY_POOL_REQUESTS_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_MY_POOL_REQUESTS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const isCurrentPoolActive = async (pool_id) => {
  let token = JSON.parse(localStorage.getItem("userInfo")).token;
  console.log(`token: ${token}`);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const data = Axios.get(`http://localhost:8080/join/pool/${pool_id}`, config);
  return data;
};
export const getPoolById = (pool_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_POOL_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.get(`/api/pools/${pool_id}`, config);

    dispatch({ type: "GET_POOL_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_POOL_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};