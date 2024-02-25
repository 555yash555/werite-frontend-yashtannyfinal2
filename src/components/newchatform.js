// NewChatForm.js
import React, { useState } from 'react';

const NewChatForm = ({ onClose, onSend }) => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Perform validation or other checks before sending
    if (userId.trim() !== '' && message.trim() !== '') {
      onSend(userId, message);
      onClose();
    }
  };

  return (
    <div className="new-chat-form">
      <label>User ID:</label>
      <input className="inputt" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <label>Message:</label>
      <input className="inputt" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default NewChatForm;
