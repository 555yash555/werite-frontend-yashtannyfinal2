import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";
import { BsFileText } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import { FaShareAlt } from "react-icons/fa";
import DoughNutChart from "./DoughNutChart";
import { HiDotsVertical } from "react-icons/hi";
import VideoPlayer from "./VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../actions/upVoteAction";
// import { bookmarkPost,removeBookmark } from "../actions/bookedMarkActions";
import { addDisLike, removeDislike } from "../actions/downVoteAction";
import { GoPrimitiveDot } from "react-icons/go";
import CommentForm from "./Comments/CommentForm";
import { blockUser,unblockUser } from "../actions/blockActions";
import Comments from "./Comments/Comments";
import {bookmarkPost,removeBookmark} from "../actions/bookedMarkActions";
import { reportPost } from "../actions/reportActions";
import "./ProfileCard.css";
import AttachmentCarousel from "./corosloe";

const TownHallCard = ({ townHall, showId, setShowId, live }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modalShow, setModalShow] = useState(false);
  const userLikeExist = townHall.upvoted;
  

  const [reportText, setReportText] = useState("");
  const userBookMark= townHall.bookmarked;
  console.log("hello my name uss");
  console.log(userBookMark);
  const haveUrl=townHall.source_link;
  
   
  
  const userDislikeExist = townHall.downvoted;

  const [upVoteCount, setUpVoteCount] = useState(townHall.upvotes.length);
  const [downVoteCount, setDownVoteCount] = useState(townHall.downvotes.length);
  const [thumbsUp, setThumbsUp] = useState(userLikeExist);
  const [thumbsDown, setThumbsDown] = useState(userDislikeExist);
  const [bookMark, setBookMark] = useState(userBookMark);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  
  
  const handleBookmark = (post_id) => {
    console.log(" bookmark")
    if (bookMark) {
      // User wants to remove the bookmark
      dispatch(removeBookmark(post_id));
    } else {
      // User wants to bookmark the post
      dispatch(bookmarkPost(post_id));
    }
    setBookMark(!bookMark); // Toggle bookmark state
  };


  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const displayUrl = haveUrl.length > 15 ? `${haveUrl.slice(0, 80)}...` : haveUrl;

  const handleAddLike = (post_id) => {
    dispatch(removeDislike(post_id));
    setThumbsDown(false);
    setThumbsUp(true);
    dispatch(addLike(post_id));
    console.log(thumbsUp);
    setUpVoteCount(upVoteCount + 1);
    setDownVoteCount(downVoteCount - 1);
  };
  const handleremovedisLike = (post_id) => {
    dispatch(removeDislike(post_id));
    setThumbsDown(false);
    
    
    console.log(thumbsUp);
    
    setDownVoteCount(downVoteCount - 1);
  };

  const handleremoveLike = (post_id) => {
    dispatch(removeLike(post_id));
    setThumbsUp(false);
    
    
  
   
    setUpVoteCount(upVoteCount - 1);
  };

  const handleAddDisLike = (post_id) => {
    dispatch(removeLike(post_id));
    if(thumbsUp){setUpVoteCount(upVoteCount - 1);}
    setThumbsUp(false);
    setThumbsDown(true);
    dispatch(addDisLike(post_id));
    setDownVoteCount(downVoteCount + 1);
   if(thumbsUp){setUpVoteCount(upVoteCount - 1);}
    
  };
  
  const handleBlockUser = () => {
    // Assuming townHall.user.user_id contains the user ID to be blocked
    dispatch(blockUser(townHall.user_id));
  };

  
  function MyVerticallyCenteredModal(props) {
    const [customCategory, setCustomCategory] = useState("");
    
  const handleReport = () => {
    let selectedProblemToSend = selectedProblem;
  
    if (selectedProblem === "Other" && customCategory.trim() !== "") {
      // If "Other" is selected and customCategory is not empty, use customCategory
      selectedProblemToSend = customCategory;
    }
  
    if (selectedProblemToSend) {
      dispatch(reportPost(townHall.post_id, selectedProblemToSend));
      setModalShow(false); // Close the modal after submitting the report
      // Optionally, you can reset the selected problem state and customCategory
      setSelectedProblem(null);
      setCustomCategory("");
    }
  };
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ background: "#df4759", color: "white" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Submit a Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: "30vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifySelf: "flex-start",
              marginBottom: "10px",
            }}
          >
            <h6>Please select the problem with the post</h6>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              "Spam",
              "Hate Speech",
              "Violence",
              "Illegal",
              "Explicit Content",
              "Offensive",
              "Personal Information",
              "Terrorism",
              "Other",
            ].map((problem) => (
              <div key={problem} style={{ borderRadius: "50%" }}>
                <Button
                  style={{
                    margin: "10px",
                    backgroundColor:
                      selectedProblem === problem ? "#e0e0e0" : "white",
                      border: selectedProblem === problem ? "2px solid white" : "2px solid black", 
                  }}
                  variant="light"
                  onClick={() => setSelectedProblem(problem)}
                >
                  {problem}
                </Button>
              </div>
            ))}
            {/* Render an input field for custom category if "Other" is selected */}
            {selectedProblem === "Other" && (
  <div style={{ marginTop: "10px", width: "100%",justifyContent: "flex-start",
  alignItems: "flex-start" }}>
    <input
      type="text"
      placeholder="Enter custom category"
      value={customCategory}
      onChange={(e) => setCustomCategory(e.target.value)}
      style={{ width: "100%", height:"100px", borderRadius: "10px", // Add curved borders
      border: "2px solid black" ,textAlign: "left", // Position the text at the left
      verticalAlign: "top", // Position the text at the top
      paddingLeft: "10px", paddingBottom:"70px"
    }} // Adjust the width as needed
    />
  </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleReport(customCategory)}
            variant="danger"
            style={{ opacity: "0.9", fontWeight: "bold" }}
            disabled={!selectedProblem && !customCategory}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }



  let totalLikeAndDislikeCount =townHall.upvotes.length + townHall.downvotes.length;
  console.log(totalLikeAndDislikeCount);

  const handleShowComments = () => {
    if (showId === townHall.post_id) {
      setShowId(null);
    } else {
      setShowId(townHall.post_id);
    }
  };

  let countColor;
  if (thumbsUp) {
    countColor = "blue";
  } else if (thumbsDown) {
    countColor = "red";
  } else {
    countColor = "";
  }

  if (live && townHall.attachments.video_attachments.length > 0){
  return (
    <div
      style={{
        backgroundColor: "white",
        marginBottom: "40px",
        width: "90%",
        borderRadius: "20px",
      }}
      className="shadow-lg"
      key={townHall.post_id}
    >
      <Container style={{ padding: "20px" }}>
        <Row>
          <Col xs={2}>
            <div
              style={{
                margin: "15px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              {live ? (
                <>
                  {/* <GoPrimitiveDot
                    style={{ color: "red", margin: "0 3px" }}
                    size={20}
                  />
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Live
                  </span> */}
                </>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col xs={7}>
            <h3
              style={{
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              {townHall.title}
            </h3>
          </Col>
          
          <Col xs={3}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "1.3rem", marginRight: "5px" }}>
                  {townHall.user.username}
                </span>

                <div
                  className="image_container"
                  style={{ width: "45px", height: "45px" }}
                >
                  <Link
        to={`/app/user/${townHall.user.user_id}/posts`}
        style={{ font: "inherit", textDecoration: "inherit" }}
                   
      >
                  <img
                    className="user_round"
                    src={
                      townHall.user?.profile_pic ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt="user"
                  />
                  </Link>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginRight: "3rem",
                  marginTop: "-.15rem",
                }}
              >
                
                {/* <span style={{ fontWeight: "bold", margin: "0 3px" }}>
                  {townHall.category}
                </span> */}
                
              </div>
            </div>
          </Col>
          
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              borderRadius: "20px",
              height: "400px",
              width: "100%",
              display: "flex",
              paddingLeft: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              overflow:"hidden"
            }}
          >
            <AttachmentCarousel attachments={townHall.attachments} post_id={townHall.post_id} live={live} />
          </div>
          <div style={{ height: "inherit", margin: "15px 0" }}>
            <Dropdown key={"end"} id={`dropdown-button-drop-end`} drop="end">
              <Dropdown.Toggle as={CustomToggle}>
                <HiDotsVertical size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  background: "#252627",
                  opacity: "0.7",
                }}
              >
                <Dropdown.Item
                  eventKey="1"
                  style={{ color: "white", background: "transparent" }}
                  onClick={() => setModalShow(true)}
                >
                  Report
                </Dropdown.Item>

                <Dropdown.Item
                  eventKey="2"
                  style={{ color: "white", background: "transparent" }}
                  onClick={() => setModalShow(true)}
                >
                  Alarm
                </Dropdown.Item>

                <Dropdown.Divider style={{ background: "white" }} />
                <Dropdown.Item
                
                  eventKey="2"
                  style={{ color: "white", background: "transparent" }}
                  onClick={handleBlockUser}
                >
                  Block
        </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
        <Row style={{ padding: "1.5rem 1.5rem", display: "flex", alignItems: "center" }}>
  <Col xs={3}>
    <div style={{ display: "flex", alignItems: "center" }}>
      {thumbsUp ? (
        <Button variant="white" style={{ marginRight: "10px" }}>
          <TbArrowBigUpLines
            size={40}
            style={{ color: "blue", backgroundColor: "color" }}
          />
        </Button>
      ) : (
        <Button
          variant="white"
          onClick={() => {
            handleAddLike(townHall.post_id);
          }}
          style={{ border: "none", marginRight: "10px" }}
        >
          <TbArrowBigUpLines size={40} />
        </Button>
      )}
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: ` ${countColor}`,
        }}
      >
        {upVoteCount}
      </span>
      {thumbsDown ? (
        <Button variant="white" style={{ marginLeft: "10px" }}>
          <TbArrowBigDownLines
            size={40}
            style={{ color: "red", backgroundColor: "color" }}
          />
        </Button>
      ) : (
        <Button
          variant="white"
          onClick={() => {
            handleAddDisLike(townHall.post_id);
          }}
          style={{ border: "none", marginLeft: "10px" }}
        >
          <TbArrowBigDownLines size={40} />
        </Button>
      )}
      <div
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          margin: "0 10px",
        }}
      >
        <DoughNutChart
          count={upVoteCount}
          totalCount={totalLikeAndDislikeCount}
        />
      </div>
    </div>
  </Col>
  <Col xs={2} >
    <div className="reactionDiv" style={{ display: "flex", alignItems: "center",justifyContent:"center"}}>
      <div >
        <Button
          style={{
            fontSize: "1.80rem",
            borderRadius: "20px",
          }}
          onClick={handleShowComments}
        >
          Reaction
        </Button>
      </div>
    </div>
  </Col>
  <Col xs={5}>
    <div style={{ display: "flex", alignItems: "flex-start" }}>
    <div>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative' }}
      >
        <a href={haveUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="white" style={{ marginRight: "10px" }}>
            <BsFileText
              size={45}
              style={{ color: haveUrl ? "green" : "black" }}
            />
          </Button>
        </a>
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '-20px', // Adjust the value based on your design
              left: 0,
              background: 'white',
              whiteSpace: 'nowrap',
              padding: '2px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              zIndex: 1,
            }}
          >
            {displayUrl}
          </div>
        )}
      </div>
    </div>
      <Button
  variant="white"
  style={{ marginRight: "10px" }}
  
>
  <BsBookmark size={40} style={{ color: bookMark ? "red" : "black" }} onClick={() => handleBookmark(townHall.post_id)}/>
</Button>

      <Button variant="white" >
      <Link
      to={`/app/singlepost/${townHall.post_id}/`}
      style={{ font: "inherit", textDecoration: "inherit" }}
    >
    <FaShareAlt size={40} />
  </Link>
      </Button>
    </div>
  </Col>
</Row>

        {showId === townHall.post_id && (
          <Container style={{ margin: "10px 0" }}>
            <CommentForm post_id={townHall.post_id} reply_of_comment_id={0} />

            <div className="mt-4">
              <Comments post_id={townHall.post_id} />
            </div>
          </Container>
        )}
      </Container>
    </div>
  );}
  else if (!live) {
    return (
      <div
        style={{
          backgroundColor: "white",
          marginBottom: "40px",
          width: "90%",
          borderRadius: "20px",
        }}
        className="shadow-lg"
        key={townHall.post_id}
      >
        <Container style={{ padding: "20px" }}>
          <Row>
            <Col xs={2}>
              <div
                style={{
                  margin: "15px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {live ? (
                  <>
                    {/* <GoPrimitiveDot
                      style={{ color: "red", margin: "0 3px" }}
                      size={20}
                    />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                    >
                      Live
                    </span> */}
                  </>
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col xs={7}>
              <h3
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                {townHall.title}
              </h3>
            </Col>
            <Col xs={3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "1.3rem", marginRight: "5px" }}>
                    {townHall.user.username}
                  </span>
  
                  <div
                    className="image_container"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <Link
        to={`/app/user/${townHall.user.user_id}/posts`}
        style={{ font: "inherit", textDecoration: "inherit" }}
                   
      >
                    <img
                      className="user_round"
                      src={
                        townHall.user?.profile_pic ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="user"
                    />
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginRight: "3rem",
                    marginTop: "-.15rem",
                  }}
                >
                  
                  {/* <span style={{ fontWeight: "bold", margin: "0 3px" }}>
                    {townHall.category}
                  </span> */}
                  
                </div>
              </div>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
                height: "400px",
                width: "100%",
                display: "flex",
                paddingLeft: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                overflow:"hidden"
              }}
            >
              <AttachmentCarousel attachments={townHall.attachments} post_id={townHall.post_id} live={live} />
            </div>
            <div style={{ height: "inherit", margin: "15px 0" }}>
              <Dropdown key={"end"} id={`dropdown-button-drop-end`} drop="end">
                <Dropdown.Toggle as={CustomToggle}>
                  <HiDotsVertical size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    background: "#252627",
                    opacity: "0.7",
                  }}
                >
                  <Dropdown.Item
                    eventKey="1"
                    style={{ color: "white", background: "transparent" }}
                    onClick={() => setModalShow(true)}
                  >
                    Report
                  </Dropdown.Item>
  
                  <Dropdown.Item
                    eventKey="2"
                    style={{ color: "white", background: "transparent" }}
                    onClick={() => setModalShow(true)}
                  >
                    Alarm
                  </Dropdown.Item>
  
                  <Dropdown.Divider style={{ background: "white" }} />
                  <Dropdown.Item
                
                  eventKey="2"
                  style={{ color: "white", background: "transparent" }}
                  onClick={handleBlockUser}
                >
                  Block
        </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
          <Row style={{ padding: "1.5rem 1.5rem", display: "flex", alignItems: "center" }}>
  <Col xs={3}>
    <div style={{ display: "flex", alignItems: "center" }}>
      {thumbsUp ? (
        <Button variant="white" style={{ marginRight: "10px" }}onClick={() => {
          handleremoveLike(townHall.post_id);
        }}>
          <TbArrowBigUpLines
            size={40}
            style={{ color: "blue", backgroundColor: "color" }}
          />
        </Button>
      ) : (
        <Button
          variant="white"
          onClick={() => {
            handleAddLike(townHall.post_id);
          }}
          style={{ border: "none", marginRight: "10px" }}
        >
          <TbArrowBigUpLines size={40} />
        </Button>
      )}
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: ` ${countColor}`,
        }}
      >
        {upVoteCount}
      </span>
      {thumbsDown ? (
        <Button variant="white" style={{ marginLeft: "10px" }} onClick={() => {
          handleremovedisLike(townHall.post_id);
        }}>
          <TbArrowBigDownLines
            size={40}
            style={{ color: "red", backgroundColor: "color" }}
          />
        </Button>
      ) : (
        <Button
          variant="white"
          onClick={() => {
            handleAddDisLike(townHall.post_id);
          }}
          style={{ border: "none", marginLeft: "10px" }}
        >
          <TbArrowBigDownLines size={40} />
        </Button>
      )}
      <div
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          margin: "0 10px",
        }}
      >
        <DoughNutChart
          count={upVoteCount}
          totalCount={totalLikeAndDislikeCount}
        />
      </div>
    </div>
  </Col>
  <Col xs={3}>
    <div style={{ display: "flex", alignItems: "center",justifyContent:"center"}}>
      <div >
        <Button
          style={{
            fontSize: "1.80rem",
            borderRadius: "20px",
          }}
          onClick={handleShowComments}
        >
          Reaction
        </Button>
      </div>
    </div>
  </Col>
  <Col xs={5} >
    <div style={{ display: "flex", alignItems: "flex-start" }}>
    <div>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative' }}
      >
        <a href={haveUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="white" style={{ marginRight: "10px" }}>
            <BsFileText
              size={45}
              style={{ color: haveUrl ? "green" : "black" }}
            />
          </Button>
        </a>
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '-20px', // Adjust the value based on your design
              left: 0,
              background: 'white',
              whiteSpace: 'nowrap',
              padding: '2px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              zIndex: 1,
            }}
          >
            {displayUrl}
          </div>
        )}
      </div>
    </div>

      <Button variant="white" style={{ marginRight: "10px" }} onClick={() => handleBookmark(townHall.post_id)}>
        <BsBookmark size={40} style={{ color: bookMark ? "red" : "black" }}/>
      </Button>
      <Button variant="white">
      <Link
      to={`/app/singlepost/${townHall.post_id}`}
      style={{ font: "inherit", textDecoration: "inherit" }}
    >
    <FaShareAlt size={40} />
  </Link>
      </Button>
    </div>
  </Col>
</Row>

          {showId === townHall.post_id && (
            <Container style={{ margin: "10px 0" }}>
              <CommentForm post_id={townHall.post_id} reply_of_comment_id={0} />
  
              <div className="mt-4">
                <Comments post_id={townHall.post_id} />
              </div>
            </Container>
          )}
        </Container>
      </div>
    );
          }else{
            return null;
          }
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant="white"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));



export default TownHallCard;
