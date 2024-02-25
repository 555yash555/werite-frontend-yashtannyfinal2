import React, { useState, useEffect } from "react";
import { Container, Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlockedUsers } from "../actions/blockActions";
import ProfileCard from "../components/ProfileCard";
import Posts from "../features/Posts/Posts";
import { getMyPosts, getUserDetails } from "../actions/userActions";
import UserInfoCard from "../components/UserInfoCard";
import Message from "../components/Message";


const UserInfoScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();

  const [activeButton, setActiveButton] = useState('posts');

  const handlePostsClick = () => {
    setActiveButton('posts');
    dispatch(getMyPosts(id));
  };

  const handleUpvotedClick = () => {
    setActiveButton('upvoted');
    dispatch(getMyPosts(id, true, false, false));
  };

  const handleDownvotedClick = () => {
    setActiveButton('downvoted');
    dispatch(getMyPosts(id, false, true, false));
  };

  const handleBookmarksClick = () => {
    setActiveButton('bookmarks');
    dispatch(getMyPosts(id, false, false, true));
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
    handlePostsClick();
  }, [dispatch, id]);

  return (
    <>
      <Container className="my-2 " style={{ maxWidth: "1800px" }}>
        <Row style={{ margin: "20px 0" }}>
          <Col xs={6}>{userInfo && <UserInfoCard user_id={id} />}</Col>
        </Row>
        <Row>
          <Col xs={12}>
          <ButtonGroup
  className="mb-2 shadow"
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
  }}
  size="lg"
>
  <Button variant="light" active={activeButton === 'posts'} onClick={handlePostsClick}>
    Posts
  </Button>
  <Button variant="light" active={activeButton === 'upvoted'} onClick={handleUpvotedClick} style={{ borderLeft: "3.5px solid #bdbdc5" }}>
    Upvoted
  </Button>
  <Button variant="light" active={activeButton === 'downvoted'} onClick={handleDownvotedClick} style={{ borderLeft: "3.5px solid #bdbdc5" }}>
    Downvoted
  </Button>
  {(userInfo.id == id) && (
  <Button variant="light" active={activeButton === 'bookmarks'} onClick={handleBookmarksClick} style={{ borderLeft: "3.5px solid #bdbdc5" }}>
    Saved
  </Button>
  )}
</ButtonGroup>

            <Container className="my-3" style={{ width: "100%" }}>
              <Posts id={id} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserInfoScreen;