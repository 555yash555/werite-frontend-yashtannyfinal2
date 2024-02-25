import Axios from "axios";

export const reportPostRequest = () => ({
  type: "REPORT_POST_REQUEST",
});

export const reportPostSuccess = (message) => ({
  type: "REPORT_POST_SUCCESS",
  payload: message,
});

export const reportPostFail = (error) => ({
  type: "REPORT_POST_FAIL",
  payload: error,
});

export const reportPost = (postId, reportText) => async (dispatch, getState) => {
  try {
    dispatch(reportPostRequest());

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
      `/api/post/${postId}/report`,
      { report_text: reportText },
      config
    );

    dispatch(reportPostSuccess(data.message));
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch(
      reportPostFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};



export const getAllReports = () => async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_ALL_REPORTS_REQUEST" });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get("/api/admin/reports", config);
  
      dispatch({ type: "GET_ALL_REPORTS_SUCCESS", payload: data.reports });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: "GET_ALL_REPORTS_FAIL",
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };