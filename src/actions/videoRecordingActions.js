import axios from "axios";

export const getVideoRecordingDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "VIDEO_REC_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/videoRecording/insertVideoRecordingUrl`,
      config
    );
    dispatch({
      type: "VIDEO_REC_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "VIDEO_REC_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
