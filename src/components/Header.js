import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  InputGroup,
  Navbar,
  FormControl,
  NavLink,
  Overlay,
  Popover,
  Badge,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { OverlayTrigger, Tooltip,Dropdown } from 'react-bootstrap';
import { Link,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { FaRocket, FaCog,FaSignOutAlt, FaKey, FaPen, FaFileAlt  } from "react-icons/fa";
import { BsChatLeftFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import logo from "../assets/logo.png";
import { getNotifications } from "../actions/notificationActions";
import Notifications from "./Notifications";
import werite from "../assets/werite.png";
import socket from "../socket";
import Message from "./Message";
import styled from 'styled-components';
import SearchBox from "./searchboxforheader";
import { searchUser } from '../actions/userActions';
import {   Card, Col } from 'react-bootstrap';
import {  getMessages, sendMessage } from '../actions/messageActions';
import { getChats } from '../actions/messageActions';


const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const location = useLocation();
  const isHomeRoute = location.pathname === "/login";
 
  const [searchTerm, setSearchTerm] = useState('');
  const { user, error1 } = useSelector((state) => state.userSearchReducer);
  console.log(error1);
  const handleSend = (userId, event) => {
    // Prevent the default action of the click event
    event.preventDefault();
  
    // Perform the logic to send the message
    // Assuming you have a function or action to handle sending messages
    dispatch(sendMessage(userId));
    navigate(`/app/chats?userId=${userId}`)
    dispatch(getChats());
    setSearchTerm(''); // Sending a blank string as the message
    
    // Optionally, you can also close the form or perform other actions
  };
  const handleswipe=()=>{
    setSearchTerm(''); 
  }

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      dispatch(searchUser(searchTerm));
      console.log("search results hererrr");
    console.log(user);
    }
    
  };
  let timeoutId;

  const handleInputChange = (e) => {
    dispatch(searchUser(e.target.value));
    setSearchTerm(e.target.value);
    console.log("search results hererrr");
    console.log(user);

    
    
  };


  const handleLogout = () => {
    socket.on("disconnect", () => {
      socket.on("user_disconnected", (userId) => {
        console.log(`${userId} logged out`);
        dispatch(logout());
      });
    });
    dispatch(logout());
  };
  const StyledTooltip = styled(Tooltip)`
  .tooltip-inner {
    background-color: #aedef1;
    color: black;
  }
  
  
}
  
`;
  

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [notiCount, setNotiCount] = useState(0);
  const [message, setMessage] = useState("");
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    dispatch(getNotifications());

    socket.on("notificationRefresh", () => {
      dispatch(getNotifications());
      setShow(true);
    });
  }, []);

  socket.on("notificationRefresh", ({ message }) => {
    setMessage(message);
    dispatch(getNotifications());
  });

  const getNotificationsData = useSelector((state) => state.notifications);
  const { loading, error, notifications } = getNotificationsData;

  useEffect(() => {
    if (notifications)
      setNotiCount(
        notifications.reduce((a, noti) => {
          return (noti.viewed ? 0 : 1) + a;
        }, 0)
      );
  }, [notifications]);

  const funcMsg = (msg) => {
    return <Message>{msg}</Message>;
  };
  const navigate = useNavigate();
  

  return (
    <>
    {isHomeRoute ? (
      <nav style={{ zIndex: 100 }}>
        <Navbar
          variant="light"
          className="shadow mb-2 "
          sticky="top"
          style={{ padding: "0.5rem 2rem" }}
        >
          <Container
            fluid
            className="d-flex justify-content-between  align-items-center justify-content-lg-evenly"
          >
            <Link
              to="/app"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 20px",
              }}
              className="display-5 align-items-center d-flex font-weight-bold"
            >
              <div
                className="display-6 fw-bold d-flex"
                style={{ alignItems: "flex-start" }}
              >
                <img
                  src={logo}
                  width={55}
                  alt="logo"
                  style={{
                    margin: "0 1rem",
                    borderRadius: "100%",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                />{" "}
              </div>
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                <img src={werite} alt="" width={120} />
              </span>
            </Link>
            </Container>
          </Navbar>
        </nav>
    ):(
       <nav style={{ zIndex: 100 }}>
        <Navbar
          variant="light"
          className="shadow mb-2 "
          sticky="top"
          style={{ padding: "0.5rem 2rem" }}
        >
          <Container
            fluid
            className="d-flex justify-content-between  align-items-center justify-content-lg-evenly"
          >
            <Link
              to="/app"
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: "0 20px",
              }}
              className="display-5 align-items-center d-flex font-weight-bold"
            >
              <div
                className="display-6 fw-bold d-flex"
                style={{ alignItems: "flex-start" }}
              >
                <img
                  src={logo}
                  width={55}
                  alt="logo"
                  style={{
                    margin: "0 1rem",
                    borderRadius: "100%",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                />{" "}
              </div>
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                <img src={werite} alt="" width={120} />
              </span>
            </Link>
            {/* <InputGroup>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                size="lg"
                variant="outline-secondary"
              />
              <Button variant="outline-secondary">
                <i className="fa fa-search"></i>
              </Button>

            </InputGroup> */}
            {/* <SearchBox /> */}

            <InputGroup style={{display: 'flex', flexDirection: 'col',justifyContent: 'space-between'}}>
  <FormControl
    placeholder="Search"
    aria-label="Search"
    size="lg"
    variant="outline-secondary"
    value={searchTerm}
    onChange={handleInputChange}
  />
  <Button variant="outline-secondary" onClick={handleSearch}>
    <i className="fa fa-search"></i>
  </Button>

  {user.length > 0 && searchTerm !== '' && (
    <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1,overflow:'auto' ,maxHeight: '700px', width: '100%',}}>
      {user.map((singleUser) => (
        
        <Link
        to={`/app/user/${singleUser.user_id}/posts`}
        style={{ font: "inherit", textDecoration: "inherit" }}
        onClick={() => handleswipe()}
        
      >
        {/* <Card key={singleUser.user_id} style={{ maxWidth: '50rem', width:'38.5rem' ,marginBottom: '10px' }}>
          <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <Card.Img
              variant="top"
              style={{
                marginRight:10,
                width: '50px',
                height: '50px',
                borderRadius: '50%',
              }}
              src={singleUser.profile_pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
              alt="user"
            />
            <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{singleUser.username}</Card.Title> */}
           
            {/* <Card.Text>
  <Button variant="outline-secondary" onClick={() => navigate(`/app/user/${singleUser.user_id}/posts`)} style={{display:"flex",justifyContent:'space-between',alignItems:'center',marginLeft:30,marginTop:15}}>
    <i className="fa fa-user"></i> View Profile
  </Button>
</Card.Text> */}
            {/* <Card.Text>
              <Button variant="outline-secondary" onClick={() => handleSend(singleUser.user_id)} style={{display:"flex",justifyContent:'space-between',alignItems:'center',marginLeft:30}}>
                <i className="fa fa-envelope"></i>
              </Button>
            </Card.Text>
          </Card.Body>
        </Card> */}
        <Card key={singleUser.user_id} style={{ maxWidth: '50rem', width:'38.5rem' ,marginBottom: '10px' }}>
  <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Card.Img
        variant="top"
        style={{
          marginRight:10,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
        }}
        src={singleUser.profile_pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
        alt="user"
      />
      <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{singleUser.username}</Card.Title>
    </div>
    <Card.Text >
      
    <Button variant="outline-secondary" onClick={(event) => handleSend(singleUser.user_id, event)} style={{display:"flex",justifyContent:'space-between',alignItems:'center',marginLeft:40}}>
  <i className="fa fa-envelope"></i>
</Button>
    </Card.Text>
  </Card.Body>
</Card>
        </Link>
        
      ))}
    </div>
  )}

  {searchTerm !== '' && error1 && (
    <Card style={{ minWidth: '18rem', position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
      <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Card.Title style={{ wordWrap: 'break-word' }}>{error1}</Card.Title>
      </Card.Body>
    </Card>
  )}
</InputGroup>

            
            
            
            <OverlayTrigger
  key='bottom'
  placement='bottom'
  overlay={
    <StyledTooltip id={`tooltip-bottom`}>
      Coming Soon
    </StyledTooltip>
  }
>
  <div
    style={{
      marginLeft: " 40px",
      marginRight: "20px",
    }}
  >
    <FaRocket
      style={{
        color: "#636363",
      }}
      size={28}
    />
  </div>
</OverlayTrigger>


            <div ref={ref} style={{ margin: "0 20px" }}>
              <IoMdNotifications
                style={{
                  width: "40px",
                  height: "40px",
                  color: "#636363",
                }}
                ref={target}
                onClick={handleClick}
              />
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                rootClose
                onHide={() => setShow(false)}
              >
                <Popover id="popover-contained">
                  <Popover.Body>
                    <Notifications notifications={notifications} />
                  </Popover.Body>
                </Popover>
              </Overlay>
              <div style={{ position: "absolute", top: 18, right: 635, }}>
                <Badge bg="info" style={{
      padding: "0.35em 0.35em", // Adjust padding here
      fontSize: "0.75em", 
      
      // Adjust font size here
    }} >{notiCount}</Badge>
              </div>
            </div>

            <BsChatLeftFill
              style={{
                width: "75px",
                height: "75px",
                marginLeft: "20px",
                marginRight: "40px",
                color: "#636363",
              }}
              
              onClick={() => navigate('/app/chats')}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 10px",
              }}
            >
              <div style={{ margin: "0 30px" }}>
              <OverlayTrigger
  key='bottom'
  placement='bottom'
  overlay={
    <StyledTooltip id={`tooltip-bottom`}>
      Coming Soon
    </StyledTooltip>
  }
>
  <Button
    variant="secondary"
    className="shadow-sm rounded px-3 fw-bold"
    style={{ backgroundColor: "#6940aa" }}
  >
    Community
  </Button>
</OverlayTrigger>
              </div>
              <div style={{ margin: "0 30px" }}>
              <OverlayTrigger
  key='bottom'
  placement='bottom'
  overlay={
    <StyledTooltip id={`tooltip-bottom`}>
      Coming Soon
    </StyledTooltip>
  }
>
  <Button
    variant="light shadow-sm"
    style={{
      display: "flex",
      alignItems: "center",
    }}
    className="px-3 fw-bold"
  >
    <FaCrown
      style={{ color: "#ffc334", marginRight: "12px" }}
      size={30}
    />
    <div>Premium</div>
  </Button>
</OverlayTrigger>
              </div>
            </div>

            {userInfo ? (
  <Dropdown drop='down' id='settings-dropdown' >
    <Dropdown.Toggle variant="light" className=" px-2.5 fw-bold" style={{ background: "#cdcdcd" }} id="dropdown-basic" >
      <FaCog size={22}/>
    </Dropdown.Toggle>
    <div style={{ position: 'absolute', // Try different position values
    right: 130, }}>
    
    <Dropdown.Menu  >
    {userInfo.type === 'admin' && (
  <Dropdown.Item href="/app/admin" className="px-3 fw-bold">
    Admin
  </Dropdown.Item>
)}
    
      <Dropdown.Item href="/forgot-password" className="px-3 fw-bold">Change Password</Dropdown.Item>
      <Dropdown.Item href="/contact-us" className="px-3 fw-bold">Write to Us</Dropdown.Item>
      <Dropdown.Item href="/terms" className="px-3 fw-bold"> Terms & Conditions</Dropdown.
    Item>
    <Dropdown.Item onClick={handleLogout} className="px-3 fw-bold"> Logout</Dropdown.Item>
    
    </Dropdown.Menu>
    </div>
  </Dropdown>
) : (
  <LinkContainer to="/login">
    <NavLink>
      <Button variant="secondary" className=" px-3 fw-bold">
        Login
      </Button>
    </NavLink>
  </LinkContainer>
)}
          </Container>
        </Navbar>
      </nav>
      // {message && funcMsg(message)}
    )}
    </>
  );
};

export default Header;
