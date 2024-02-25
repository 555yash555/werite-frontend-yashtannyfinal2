// MessageDisplay.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../actions/messageActions';

const MessageDisplay = ({ chatId }) => {
  const dispatch = useDispatch();
  const { messages, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(getMessages(chatId));
  }, [dispatch, chatId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="message-display">
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.message_id}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageDisplay;
