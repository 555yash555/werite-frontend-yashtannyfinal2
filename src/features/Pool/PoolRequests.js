import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Badge, Modal, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Axios from "axios";
import socket from "../../socket";
import { Link, useNavigate } from "react-router-dom";
import fire from "../../assets/fire.svg";

const PoolRequests = ({ pool_id }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showStanceModal, setShowStanceModal] = useState(false);
  const [stanceContent, setStanceContent] = useState('');

  const handleStanceClick = (stance) => {
    setShowStanceModal(true);
    setStanceContent(stance);
  };

  const handleRequestAccepted = async (ind) => {
    let newMap = [];
    for (let i in requests) newMap.push(requests[i]);

    newMap[ind]["status"] = "accepted";
    setRequests(newMap);

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.patch(
      `/api/pools/${pool_id}/request/accept`,
      { joiningUser_id: requests[ind]["user_id"] },
      config
    );

    socket.emit('notification', { userId: requests[ind]["user_id"], message: data.message})
  };

  const handleRequestRejected = async (ind) => {
    let newMap = [];
    for (let i in requests) newMap.push(requests[i]);

    newMap[ind]["status"] = "rejected";
    setRequests(newMap);

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.patch(
      `/api/pools/${pool_id}/request/reject`,
      { joiningUser_id: requests[ind]["user_id"] },
      config
    );
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/pools/${pool_id}/requests`, {
      method: "GET",
      headers: {
        Authorization: `${userInfo.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error getting users list";
        }
      })
      .then((data) => {
        setLoading(false);
        setRequests(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(error);
      });
  }, [pool_id, userInfo]);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Modal show={showStanceModal} onHide={() => setShowStanceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><u>Stance</u></Modal.Title>
        </Modal.Header>
        <Modal.Body>{stanceContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStanceModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {requests.map((req, index) => (
        <Card key={req.user_id} className="p-0 mb-2">
          <Card.Body className="p-2">
            <Row>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={`/app/user/${req.user_id}/posts`} style={{ font: "inherit", textDecoration: "inherit", color: "black" }}>
                  <span>
                    <i className="fa-regular fa-circle-user"></i>
                    {req.user.username}
                  </span>
                </Link>
                <span>
                  {req.status === "pending" ? (
                    <>
                      <i className="fa-regular fa-circle-check" onClick={() => handleRequestAccepted(index)}></i>
                      <i className="fa-regular fa-circle-xmark" onClick={() => handleRequestRejected(index)}></i>
                    </>
                  ) : req.status === "accepted" ? (
                    <Badge bg="success">Accepted</Badge>
                  ) : (
                    <Badge bg="danger">Rejected</Badge>
                  )}
                </span>
              </div>
            </Row>
            <Row>
              <Col>
                <i>
                  <img src={fire} width={18} alt="fire" style={{ margin: "-2px 3px 2px 3px" }} />{req.user.merit}
                </i>
              </Col>
              <Col>{req.guts}</Col>
              <Col>
                <OverlayTrigger
                  trigger="hover"
                  key="top"
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top`}>{req.stance.substr(0, 15)}</Tooltip>}
                >
                  <span style={{ cursor: 'pointer' }} onClick={() => handleStanceClick(req.stance)}><u><b>Stance</b></u></span>
                </OverlayTrigger>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PoolRequests;
