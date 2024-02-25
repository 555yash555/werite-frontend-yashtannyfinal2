import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsChatLeftFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import "./ProfileCard.css";
import Loader from "./Loader";
import { getBlockedUsers } from "../actions/blockActions";
import BlockedList from "../screens/blockList";
import {  getMessages, sendMessage } from '../actions/messageActions';
import { getChats } from '../actions/messageActions';

import fire from "../assets/fire.svg";
import { addMyBio, addMyProfile } from "../actions/userActions";
import Message from "./Message";
import { getUserDetails } from "../actions/userActions";
const UserInfoCard = ({ user_id }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);
  const [fullBioShow, setFullBioShow] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();
  
  let userr_id = JSON.parse(localStorage.getItem("userInfo")).id;
  let myuser=String(userr_id)===String(user_id);

  const handleSend = (userId) => {
    // Perform the logic to send the message
    // Assuming you have a function or action to handle sending messages
    dispatch(sendMessage(userId));
    navigate(`/app/chats?userId=${userId}`)
    dispatch(getChats());
     // Sending a blank string as the message
  
    // Optionally, you can also close the form or perform other actions
  };

  const {
    loading,
    error,
    user,
  } = useSelector((state) => state.userDetails);
  console.log("userrrr herrrreeeeee")
  console.log(user);

  const {blocks,blockloading,errorBlock}=useSelector((state)=>state.getBlockedUsers);
  useEffect(() => {
    console.log('useEffect: before dispatching');
    dispatch(getBlockedUsers ())
      .then(() => console.log('useEffect: after dispatching'))
      .catch((err) => console.error('useEffect: error dispatching', err));
  }, []);

  
  console.log('listofusers:', blocks);
  console.log('loading:', blockloading);

  const {
    loading: fetching,
    error: fault,
    bio,
  } = useSelector((state) => state.addMyBio);

  const {
    loading: isLoading,
    error: isError,
    profile,
  } = useSelector((state) => state.addMyProfile);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleProfileAddShow = () => setProfileShow(true);

  const handleProfileClose = () => setProfileShow(false);

  const imageSource =
    profile || (user?.profile_pic !== null && user?.profile_pic !== "")
      ? profile || user?.profile_pic
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

  return (
    <>
      {loading && <Loader />}
      <div style={{ marginBottom: "20px" }} className="user_card">
        <Row >
          <Col xs={3} >
            <div className="image_container">
            <img className="user_round" src={imageSource} alt="user" onClick={() => setShowImageModal(true)} />
            </div>

            {myuser && <Button
              className="user_round_plus"
              variant="white"
              onClick={handleProfileAddShow}
            >
              <BsFillPlusCircleFill size={24} />
            </Button>}
            <FileModal
              onHide={handleProfileClose}
              show={profileShow}
              setProfileShow={setProfileShow}
            />
          </Col>
          <Col>
            <Container>
            <Row>
  <Col >
    <Row>
      <span style={{ fontSize: "25px" }}>
        {user ? user.username : "Username"}
      </span>
    </Row>
    <div style={{ display: "flex", alignItems: "center" }}>
    <span style={{ fontSize: "17px", fontWeight: "normal " }}
                title={`Merit points: ${user ? user.merit : 'Merit'}`}>
                <img
                src={fire}
                width={18}
                alt="fire"
                style={{
                  margin: "-2px 3px 2px 3px",
                  
                  
                 
                }}
                 />
                  {user ? user.merit : "Merit"}
                </span>
      {myuser &&  <Button
        variant="white"
        onClick={() => setShowBlockedUsers(true)}
        style={{
          border: "2px solid black",
          marginLeft: "10px", // Add some margin to separate the button from the merit display
          fontSize: "12px", // Reduce the font size
          padding: "2px 6px", // Reduce the padding to make the button smaller
          flexShrink: 0 // Prevent the button from shrinking
        }}
        className="blocked-users-btn"
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e0e0e0")} // grey background on hover
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
      >
        Blocked Users
      </Button> }
      {!myuser &&  
      <Button variant="outline-secondary" onClick={() => handleSend(user_id)} style={{display:"flex",justifyContent:'space-between',alignItems:'center',marginLeft:30}}>
        <i className="fa fa-envelope"></i>
      </Button>
}
    </div>
  </Col>
</Row>
            </Container>
          </Col>
        </Row>
        <Row style={{ marginTop: "1.4rem",maxWidth:"190%",width:"170%" }}>
         <div
            style={{
              fontWeight: "400",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
       {myuser &&        <div
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                cursor: "pointer",
              }}
              onClick={() => setFullBioShow(true)}
            >
              {bio || (user?.bio !== null && user?.bio !== "")
                 ? `Bio : ${((bio || user?.bio) || '').substring(0, 150)}${(bio || user?.bio)?.length > 150 ? '...' : ''}`
                : "Add Bio"}
            </div> }
            <Modal
              show={fullBioShow}
              onHide={() => setFullBioShow(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Full Bio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ wordWrap: 'break-word' }}>{bio || user?.bio}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setFullBioShow(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div> 
            {myuser &&      <Button variant="white" onClick={handleShow}>
                <MdModeEdit size={24} />
              </Button>}
              <FormModal onHide={handleClose} show={show} setShow={setShow} />
            </div>
            <div style={{ marginLeft: "40px", position: "relative" }}>
              

              <Modal
                show={showBlockedUsers}
                onHide={() => setShowBlockedUsers(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: "40px" }}>
                    Blocked Users
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {(blockloading === undefined || blockloading) ? (
                    <p>Loading...</p>
                  ) : (
                    <BlockedList blocks={blocks} />
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowBlockedUsers(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
  <Modal.Header closeButton>
  <Modal.Title>Profile Image</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <img src={imageSource} alt="user" style={{ width: '100%' }} />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowImageModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
          </div>
          
        </Row>
      </div>
    </>
  );
};

function FormModal(props) {
  const [bio, setBio] = useState("");
  const [charsLeft, setCharsLeft] = useState(145); // New state variable
  const { user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    setBio(user?.bio);
    setCharsLeft(145 - (user?.bio?.length || 0)); // Update charsLeft when bio changes
  }, [user]);

  const dispatch = useDispatch();

  const handleAddBio = () => {
    dispatch(addMyBio(bio));
    props.setShow(false);
  };

  const handleChange = (e) => {
    setBio(e.target.value);
    setCharsLeft(145 - e.target.value.length); // Update charsLeft when bio changes
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={145} // Limit input to 200 characters
                onChange={handleChange}
              />
              <p>{charsLeft} characters left</p> {/* Display number of characters left */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddBio}>Add Bio</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function FileModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleAddProfile = () => {
    console.log(selectedFile);

    dispatch(addMyProfile(selectedFile));
    props.setProfileShow(false);
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Display Picture</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddProfile}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserInfoCard;
