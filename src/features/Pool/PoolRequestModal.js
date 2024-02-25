import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  Button,
  Badge,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { createPoolRequest } from "../../actions/poolActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import socket from "../../socket";

const PoolRequestModal = ({ show, setShow, modalPoolInfo: pool }) => {
  const [stance, setStance] = useState("");
  const [guts, setGuts] = useState(50);

  const dispatch = useDispatch();
  const createPoolRequestData = useSelector((state) => state.createPoolRequest);
  const { loading, error, message, noti, pool_id } = createPoolRequestData;

  const user=useSelector((state)=>state.userDetails);
  const pooll=useSelector((state)=>state.getPools);

  const handleSendRequest = (pool_id, user_id) => {
    if (user.merit < pooll.merit_required) {
        alert('You dont have enough merits to join this pool.');
        console.log("hello");
      return;
    }
    // console.log(pool_id)
    dispatch(createPoolRequest(pool_id, stance, guts));

    socket.emit("notification", { userId: user_id, message: noti });
    setStance("");
  };
  const handleClose = () => setShow(false);

  return (
    <>
      {message && pool.pool_id === pool_id && (
        <Message variant="success">{message}</Message>
      )}
      {error && pool.pool_id === pool_id && (
        <Message variant="danger">{error}</Message>
      )}
      <Modal show={show} onHide={handleClose} style={{ padding: "10%" }}>
        <Modal.Header closeButton>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <span className="ms-2">
              {" "}
              <i
                className="fa-solid fa-circle"
                style={{ color: "green" }}
              />{" "}
              00:22{" "}
            </span> */}
            <span>
              <span
                className="ms-1"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {`${pool.title}`}{" "}
              </span>
              <span style={{ fontSize: "15px" }}>{`(${pool.category})`}</span>
            </span>
            <Link
        to={`/app/user/${pool.user.user_id}/posts`}
        style={{ font: "inherit", textDecoration: "inherit" }}
        
        
      >
            <span className="me-2" style={{ color: "black" }}>
              <span className="me-2" style={{ color: "black" }}>{pool.user.username}</span>
              <span style={{ color: "black" }}>
                <i
                  className={`fa-solid fa-user${
                    pool.discussion_type === "panel" ? "s" : ""
                  }`}
                />
              </span>
            </span>
            </Link>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Container className="px-1">
            {loading && <Loader />}
            <Row>
              <Col xs={6}>
                <Container>
                  <Row>Stance: for</Row>
                  <Row>
                    <Form.Control
                      className="my-1"
                      type="text"
                      placeholder="Enter your Stance"
                      value={stance}
                      onChange={(e) => setStance(e.target.value)}
                    />
                  </Row>
                  <Row>
                    <Form.Label className="p-0">
                      Your Guts <Badge bg="dark">{guts}</Badge>
                    </Form.Label>
                    <Form.Range
                      className="mb-3"
                      value={guts}
                      onChange={(e) => setGuts(e.target.value)}
                    />
                  </Row>
                </Container>
              </Col>
              <Col xs={6}>
                <Container>
                  <Row>Duration : {pool.duration}</Row>
                  <Row>Talktime : {pool.talktime}</Row>
                  <Row>Merit Required: {pool.merit_required}</Row>
                  <Row className="my-3">
                    <Button
                      variant="dark"
                      onClick={() => {
                        handleSendRequest(pool.pool_id, pool.user_id);
                      }}
                    >
                      SEND REQUEST
                    </Button>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PoolRequestModal;
