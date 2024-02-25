import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMyPosts } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import PostsList from "./PostsList";

const Posts = (id) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    
  }, [userInfo]);

  const { loading, error, posts } = useSelector((state) => state.getMyPosts);

  useEffect(() => {
    const x =
      posts?.length > 0 ? (
        <div>
          <PostsList posts={posts} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "38vh",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop: "4rem",
          }}
        >
          No Posts Available
        </div>
      );
    setCards(x);
  }, [posts]);
  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Container>
        <Col>{cards}</Col>
      </Container>
    </>
  );
};

export default Posts;
