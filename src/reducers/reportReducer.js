export const reportPostReducer = (state = {}, action) => {
    switch (action.type) {
      case "REPORT_POST_REQUEST":
        return { loading: true };
      case "REPORT_POST_SUCCESS":
        return { loading: false, success: true, message: action.payload };
      case "REPORT_POST_FAIL":
        return { loading: false, error: action.payload };
      case 'REPORT_CREATE_RESET':
        return {};
      default:
        return state;
    }
  };
  