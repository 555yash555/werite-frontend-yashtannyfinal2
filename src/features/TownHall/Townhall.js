import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getVideoRecordingDetails } from "../../actions/videoRecordingActions";
import TownHallList from "./TownHallList";
import CreatePost from "../Posts/CreatePost";
import { getAllPosts } from "../../actions/postsAction"


const Townhall = ({ live }) => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const getPostsData = useSelector((state) => state.getAllPosts);
  const { loading, error, message, posts } = getPostsData;
  useEffect(() => {
    const x = posts && (
      <div>
        <TownHallList townHallData={posts} live={live} />
      </div>
    );
    setCards(x);
  }, [posts, live]);
  console.log(posts);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Container>
        
        {loading && <Loader />}
        <Col>{cards}</Col>
      </Container>
    </>
  );
};

export default Townhall;