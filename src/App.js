import React, { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,

} from "react-router-dom";

import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

import NotFound from "./screens/NotFound";
import UserLoginSignupScreen from "./screens/UserLoginSignup/UserLoginSignupScreen";
import "./App.css";
import backgroundImg from "./assets/background.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import socket from "./socket";
import { io } from "socket.io-client";
import axios from "axios";
import UserInfoScreen from "./screens/UserInfoScreen";
import CreatePost from "./features/Posts/CreatePost";
import ChatSidebar from "./components/ChatSidebar";
import MessageDisplay from "./components/MessageDisplay";
import EditPool from "./features/Pool/EditPool";
import SinglePostCard from "./components/singlePost";
import ContactUs from "./screens/contactUs";
import TermsAndConditions from "./screens/termsandconditionpage";
import AdminPage from "./features/admin/adminPage";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
// Add this line to your index.js or App.js



const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected to socket in backend");
  //   });
  //   if (userInfo) {
  //     socket.emit("new_user");
  //   }
  // }, [socket, userInfo]);
  // if (userInfo) {
  //   socket.emit("new_user");
  // }
  return (
    <div>
      <Router>
        <Header />
        <main className="py-3">
          <Container
            style={{
              maxWidth: "1700px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Routes>
              <Route path="/login" element={<UserLoginSignupScreen />} />
              <Route exact path="/" element={<Navigate to="/app/pool" />} />
              <Route exact path="/app/*" element={<HomeScreen />} />
              <Route exact path="/app/post" element={<CreatePost />} />
              <Route exact path="/app/admin" element={<AdminPage />} />
              <Route exact path="/forgot-password" element={<ForgotPassword />} />
              <Route exact path="/reset/:token" element={<ResetPassword />} />
              <Route
                exact
                path="/app/user/:id/*"
                element={<UserInfoScreen />}
              />
              <Route exact path="app/singlepost/:id" element={<SinglePostCard />} />

              {/* New routes for chat components */}
            <Route
                exact
                path="/app/chats"
                element={<ChatSidebar />}
              />
              <Route
                path="/app/chats/:chatId"
                element={<MessageDisplay />}
              />
              <Route path="/app/edit-pool/:poolId" element={<EditPool />} /> 
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/terms" element={<TermsAndConditions />} />
            </Routes>
            
           
          </Container>
        </main>
      </Router>
    </div>
  );
};

export default App;
