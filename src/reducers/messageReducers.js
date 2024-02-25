// messageReducers.js
const initialState = {
  chats: [],
  messages: [],
  error: null,
  loading: false,
};

export const chatReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHATS_REQUEST':
      return { ...state, loading: true };
    case 'GET_CHATS_SUCCESS':
      return { ...state, chats: action.payload, error: null, loading: false };
    case 'GET_CHATS_FAIL':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const sendMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SEND_MESSAGE_SUCCESS':
      return { ...state, messages: [...state.messages, action.payload], error: null, loading: false };
    case 'SEND_MESSAGE_FAIL':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const getMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES_REQUEST':
      return { ...state, loading: true };
    case 'GET_MESSAGES_SUCCESS':
      return { ...state, messages: action.payload, error: null, loading: false };
    case 'GET_MESSAGES_FAIL':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};