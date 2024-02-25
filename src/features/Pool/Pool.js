import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { getPools } from "../../actions/poolActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import MasonryLayout from "../../components/MasonryLayout";
import socket from "../../socket";
import { io } from "socket.io-client";
import { getUserDetails } from "../../actions/userActions";

const Pool = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);

  const [userStatus, setUserStatus] = useState([]);

  useEffect(() => {
    dispatch(getPools());
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getPoolsData = useSelector((state) => state.getPools);
  const { loading, error, message, pools } = getPoolsData;
  //let onlineUsers = [];

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log(users);
      dispatch(getUserDetails(userInfo.id));

      // onlineUsers.push(...onlineUsers, userId);
      console.log([...users]);

      setUserStatus([...users]);
    });
    return () => socket.off("onlineUsers");
  }, [socket, userStatus]);

  useEffect(() => {
    const x = pools && (
      <div>
        <MasonryLayout pools={pools} userStatus={userStatus} />
      </div>
    );

    setCards(x);
  }, [pools]);
  return (
    <>
      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Container>
        <Row>
          {loading && <Loader />}
          {cards}
        </Row>
      </Container>
    </>
  );
};

export default Pool; 
