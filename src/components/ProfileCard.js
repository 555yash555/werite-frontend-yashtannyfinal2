import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import fire from "../assets/fire.svg";


const ProfileCard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const Tooltip = ({ children, tooltipText }) => (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{tooltipText}</span>
    </div>
  );

  return (
    <Link
      to={`/app/user/${userInfo?.id}/posts`}
      style={{ font: "inherit", textDecoration: "inherit" }}
    >
      <div className="card-container" style={{ borderRadius: "20px" }}>
        <div
          className="image_container"
          style={{ width: "95px", height: "70px" }}
        >
          <img
            className="user_round"
            src={
              (user && user.length > 0 && user[0]?.profile_pic) ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            alt="user"
            style={{ objectFit: "cover" }}
          />
        </div>
        <Container>
          <Row>
            <Col>
              <Row>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '10px' }}>
                <span style={{ fontSize: "25px" }}>
                  {userInfo ? userInfo.username : "Username"}{" "}
                </span>
                </div>
              </Row>
              <Row>
                <span style={{ fontSize: "17px", fontWeight: "normal ",width:"55%",justifyContent:"flex-start" }}
                title={`Merits are validation points you generate through engagement.`}>
                <img
                src={fire}
                width={18}
                
                alt="fire"
                style={{
                  margin: "-2px 3px 2px 3px",
                  
                 
                }}
                 />
                 Merit:
                  {userInfo ? userInfo.merit : "Merit"}
                </span>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Link>
  );
};

export default ProfileCard;
