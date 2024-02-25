import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../actions/messageActions';
import send from "../assets/send.svg";
import { Link, useNavigate } from "react-router-dom";
import Loader from './Loader'; // Make sure to import your Loader component
import './chat.css';

const Chat = ({ chatId, onOpenMessageForm,secondUserId,secondUsername}) => {
  const dispatch = useDispatch();
  const chatRef = useRef(null);
  const { chats } = useSelector((state) => state.chatreducer);
  console.log("chatdtaaaa");
  console.log(chats);
  const { messages, loading } = useSelector((state) => state.getMessagesReducer);
  const [newMessage, setNewMessage] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const chatData = chats.find(chat => chat.chat_id === chatId);
  
  



  useEffect(() => {
    const refreshChat = () => {
      dispatch(getMessages(chatId));
      // scrollToBottom();
      if (firstLoad && !loading) {
    
        scrollToBottom();
        setFirstLoad(false);
      }
    };

    const intervalId = setInterval(refreshChat, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, chatId, firstLoad, loading]);

  


  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      dispatch(sendMessage(secondUserId, newMessage));
      dispatch(getMessages(chatId));
      setNewMessage('');
      scrollToBottom();

    }
  };

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  return (
    <div className="chat">
       <div style={{ display: 'flex', alignItems: 'center', paddingLeft:'5%', paddingBottom:'1.5%', paddingTop:"1.75%" }}>
  <Link
    to={`/app/user/${secondUserId}/posts`}
    style={{ font: "inherit", textDecoration: "inherit"}}
  >
    <img
      style={{
        marginRight: 15,
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        objectFit: 'cover',
      }}
      src={chatData.user_data_second.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
      alt="user"
    />
  </Link>
  <h2 style={{ borderBottom: '2px solid black' }}>{secondUsername}</h2>
</div>
      {firstLoad && loading ? (
        <Loader />
      ) : (
        <>
          <ul ref={chatRef} className="chat-messages">
            {messages.filter((message) => message.message.trim() !== "").map((message) => (
              <li key={message.message_id} className={message.sender_id === JSON.parse(localStorage.getItem('userInfo')).id ? 'sent' : 'received'}>
                {message.message}
              </li>
            ))}
            
          </ul>
          <div className="send-message"  >
      <textarea
        className="inputt"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.ctrlKey) {
            e.preventDefault(); // prevent the default action (new line or form submission)
            handleSendMessage();
          } else if (e.key === 'Enter' && e.ctrlKey) {
            // add a new line
            setNewMessage((prevMessage) => prevMessage + '\n');
          }
        }}
      />

      <button
        style={{ backgroundColor: '#6940aa' }}
        className="rounded"
        onClick={handleSendMessage}
      >
        <img
          src={send}
          width={25}
          alt="send"
          style={{
            margin: '0 1rem',
          }}
        />
      </button>
    </div>
        </>
      )}
    </div>
  );
};

export default Chat;