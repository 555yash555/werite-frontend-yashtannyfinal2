export const videoRecordingDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "VIDEO_REC_REQUEST":
      return { ...state, loading: true };
    case "VIDEO_REC_SUCCESS":
      return { loading: false, townHallData: action.payload };
    case "VIDEO_REC_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
