import Axios from "axios";

export const getNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_NOTIFICATIONS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.get("/api/notifications", config);

    dispatch({ type: "GET_NOTIFICATIONS_SUCCESS", payload: data });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_NOTIFICATIONS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
