// ChatSidebar.js
import React, { useState } from 'react';
import ChatList from './chatllist';
import Chat from './chat';
import NewChatForm from './newchatform'; // Import the NewChatForm component
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getMessages, sendMessage } from '../actions/messageActions';
import { getChats } from '../actions/messageActions';

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const [reciever, setReceiver] = useState(null);
  const [recieverus, setReceiverus] = useState(null);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const location = useLocation();
  const initialChatUserId = new URLSearchParams(location.search).get('userId');
  console.log(initialChatUserId);
  const { chats, error, loading } = useSelector((state) => state.chatreducer);

  
  React.useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);


  const handleNewChat = () => {
    setShowNewChatForm(prevShowNewChatForm => !prevShowNewChatForm);
  };


  const handleSendNewChat = (userId, message) => {
    console.log('send new chat');
    console.log(userId);
    dispatch(sendMessage(userId, message));
  };
  const currentUserId = JSON.parse(localStorage.getItem('userInfo')).id;

  React.useEffect(() => {
    // If initialChatUserId is provided, find the corresponding chat
    if (initialChatUserId) {
      const initialUserIdString = String(initialChatUserId);
      console.log('Chats after fetching:', chats);

  const chatWithInitialUser = chats.find(
    (chat) =>
      String(chat.user_first) === initialUserIdString|| String(chat.user_second) === initialUserIdString
  );

  console.log('Chat with Initial User:', chatWithInitialUser);
      
      if (chatWithInitialUser) {
        console.log("hey its correct ");
        console.log(chatWithInitialUser);
        setSelectedChat(chatWithInitialUser.chat_id);
        setReceiver(initialChatUserId);
        return;
      }
    }

    // If no initialChatUserId or corresponding chat is found, open the topmost chat
    const topmostChat = chats[0];
    if (topmostChat) {
      setSelectedChat(topmostChat.chat_id);
      setReceiver(topmostChat.user_first === currentUserId ? topmostChat.user_second : topmostChat.user_first);
    }
  }, [chats, initialChatUserId]);


  return (
    <div className="chat-app">
      <ChatList onSelectChat={(chatId,chat,chatUsername) => {setSelectedChat(chatId);setReceiver(chat);setReceiverus(chatUsername)}} />
      {selectedChat ? (<Chat chatId={selectedChat} secondUserId={reciever} secondUsername={recieverus}/>): (
        <p>Please select a chat first.</p>
      )}
      {showNewChatForm && (
        <NewChatForm onClose={() => setShowNewChatForm(false)} onSend={handleSendNewChat} />
      )}
      
    </div>
  );
};

export default ChatSidebar;
