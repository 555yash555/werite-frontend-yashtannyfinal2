import Axios from "axios";
export const getChats = () => async (dispatch) => {
  dispatch({ type: 'GET_CHATS_REQUEST' });
    try {
        let user_id = JSON.parse(localStorage.getItem("userInfo")).id;
        let token=JSON.parse(localStorage.getItem("userInfo")).token;
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          };
      
          const { data } = await Axios.get(`/api/chats/`, config);
          console.log(data);
      // Implement your API call here
      
     
  
      dispatch({ type: 'GET_CHATS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_CHATS_FAIL', payload: error.message });
    }
  };
  
  export const sendMessage = (user_id, message='') => async (dispatch) => {
    try {

        let token=JSON.parse(localStorage.getItem("userInfo")).token;
      // Implement your API call here
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        
      };
      const response = await Axios.post(`/api/message?user_id=${user_id}`,JSON.stringify({ 'message':message }),config);
      
      console.log(response);
  
      dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: response });
    } catch (error) {
        console.log(error.message);
      dispatch({ type: 'SEND_MESSAGE_FAIL', payload: error.message });
    }
  };
  
  export const getMessages = (chatId) => async (dispatch) => {
    try {
      dispatch({ type: 'GET_MESSAGES_REQUEST' });
        let token=JSON.parse(localStorage.getItem("userInfo")).token;
        console.log(token);
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          };
      
          const { data } = await Axios.get(`/api/message/${chatId}`, config);
          console.log(data);
      // Implement your API call here
      
  
      dispatch({ type: 'GET_MESSAGES_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_MESSAGES_FAIL', payload: error.message });
    }
  };


  
   
  