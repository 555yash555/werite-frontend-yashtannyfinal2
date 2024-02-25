import React, { useState, useEffect } from "react";
import { Container, Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Feed from "../features/Feed";
import Pool from "../features/Pool/Pool";

import Play from "../features/Play";
import ProfileCard from "../components/ProfileCard";
import PoolConfig from "../features/Pool/PoolConfig";
import Message from "../components/Message";
import SearchFilter from "../components/SearchFilter";
import Townhall from "../features/TownHall/Townhall";
import { getUserDetails } from "../actions/userActions";
import pool from "../assets/pooll.svg";
import feed from "../assets/feed.svg";
import Townhallimg from "../assets/Townhall.svg";
import { BsPencil,BsPersonCircle } from 'react-icons/bs';
import ChatSidebar from "../components/ChatSidebar";
import MessageDisplay from "../components/MessageDisplay";

const HomeScreen = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [live, setLive] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const [path, setPath] = useState("");
  let location = useLocation();

  useEffect(() => {
    const x = location.pathname.split("/");

    setPath(x[x.length - 1]);
  }, [location]);

  useEffect(() => {
    dispatch(getUserDetails(userInfo?.id));
  }, [userInfo]);

  useEffect(() => {
    if (path === "app") {
      navigate("./pool");
    }
  }, [path, navigate]);

  const handleClick = () => {
    setLive(true);
  };

  return (
    <>
      <Container className="my-5 " style={{ maxWidth: "1800px" }}>
        <Row>
          <Col xs={12} md={9}>
            <ButtonGroup
              className="mb-2 shadow"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
              size="lg"
            >
              {/* <LinkContainer to="./feed">
                <Button
                  onClick={() => setLive(false)}
                  variant="light"
                  active={path === "feed"}
                >
                  FEED
                </Button>
              </LinkContainer> */}
              <LinkContainer to="./pool">
              
                <Button
                  onClick={() => setLive(false)}
                  variant="light"
                  active={path === "pool"}
                  
                ><img
                src={pool}
                width={36}
                alt="pool"
                style={{
                  margin: "0 1rem",
                 
                }}
              />
                  Pool
                </Button>
              </LinkContainer>
              <LinkContainer to="./townhall" active={path === "townhall"}>
                <Button onClick={() => setLive(false)} variant="light">
                <img
                src={feed}
                width={36}
                alt="pool"
                style={{
                  margin: "0 1rem",
                 
                }}
              />
                  Feed
                </Button>
              </LinkContainer>
              <LinkContainer to="./play" active={path === "play"}>
                <Button variant="light" onClick={handleClick}>
                <img
                src={Townhallimg}
                width={36}
                alt="live"
                style={{
                  margin: "0 1rem",
                 
                }}
              />
                  Townhall
                </Button>
              </LinkContainer>
            </ButtonGroup>
            
            
             
              {(path === "townhall" )&& (
                <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "2rem",
                  padding: " 0 2rem",
                }}
              >
              <div style={{ width: '100%', border: '3px solid black',height:'60px', marginRight: '10%',marginTop:'10px',backgroundColor: ' #fffff', borderRadius: '9px',marginLeft:'5%',display: "flex",
    
    alignItems: "center",  }} onClick={() => navigate('post')}>
             <span style={{ marginLeft: '20px',color: 'grey',fontSize:'1.4rem', marginRight: '10px'}}> <BsPersonCircle size={28} />   What's on your mind?  </span>
             <BsPencil size={24}  />
               </div>
               <SearchFilter townhall={live || path === "townhall"} />
               </div>
               
             )}
              {path === "pool" && (
             <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2rem",
                padding: " 0 2rem",
              }}
            >
              
              <SearchFilter townhall={live || path === "townhall"} />
            </div>
            )}
            <Container className="my-3" style={{ width: "100%" }}>
              <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route path="/pool" element={<Pool />} />
                <Route path="/townhall" element={<Townhall />} />
                <Route path="/play" element={<Townhall live={live} />} />
                {/* New routes for chat components */}
            <Route
                exact
                path="/app/chats"
                element={<ChatSidebar onChatSelect={setSelectedChat} />}
              />
              <Route
                path="/app/chats/:chatId"
                element={<MessageDisplay />}
              />

              </Routes>
            </Container>
          </Col>

          <Col
            xs={12}
            md={3}
            style={{
              position: "sticky",
              height: "10vh",
              top: "20px",
              overflow: "none",
            }}
          >
            <ProfileCard />
            <Routes>
              <Route path="/pool" element={<PoolConfig />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
