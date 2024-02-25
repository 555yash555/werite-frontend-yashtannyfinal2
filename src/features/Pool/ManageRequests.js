import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPoolRequests,
  isCurrentPoolActive,
} from "../../actions/poolActions";
import Message from "../../components/Message";
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/Loader";
import { isuserinacall } from "../../actions/userActions";

const ManageRequests = () => {
  function joinRoom(pool_id) {
    isuserinacall().then((res) => {
      isCurrentPoolActive(pool_id).then((res) => {
        console.log(`res.data.message: ${res.data.message}`);
        if (res.data.message === "You have already joined another call") {
          alert("You have joined another call.");
          return;
        } else if (res.data.message === "Pool Call Currently Not Active") {
          window.alert("Discussion has not started yet.");
        } else if (res.data.message === "Not authorised to join this call") {
          window.alert("Not authorised to join this call");
        } else {
          window.open(`http://localhost:8080/join/${pool_id}`, "_blank");
        }
      });
    });
  }

  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const navigate=useNavigate();

  const color = "#affcff";
  useEffect(() => {
    dispatch(getMyPoolRequests());
  }, []);

  const getMyPoolRequestsData = useSelector((state) => state.getMyPoolRequests);
  const { loading, error, requests } = getMyPoolRequestsData;

  console.log(requests);

  useEffect(() => {
    const x =
      requests &&
      requests.map((req) => {
        return (
          <Card
            key={req.pool_id}
            className="p-0 mb-2"
            onClick={() => {
              joinRoom(req.pool_id);
            }}
            style={{ backgroundColor: `${color}` }}
          >
            <Col sm={12}>
              <Card.Body>
                <Row>
                  <Col xs={12}>
                    <Row>
                      <Col className="mb-2">
                        <i
                          className="fa-solid fa-circle"
                          style={{ color: "green" }}
                        />
                        
                      </Col>
                      <Col>
                        <i
                          className={`fa-solid fa-user${
                            req.pool.discussion_type === "panel" ? "s" : ""
                          } me-2`}
                        />
                        {req.pool.discussion_type === "panel"
                          ? `1/${req.pool.people_allowed}`
                          : ""}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="mt-1"
                    >
                      <span style={{ cursor: "pointer" }}>
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                          {`${req.pool.title}`}{" "}
                        </span>
                        <span
                          style={{ fontSize: "13px" }}
                        >{`(${req.pool.category})`}</span>
                      </span>
                    </div>
                    <Col xs={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="mt-1"
                      >
                        <span style={{ fontSize: "14px" }}>
                          Status: {req.status}
                        </span>
                        <span style={{ fontSize: "14px" }}>
                          Guts: {req.guts}
                        </span>
                      </div>
                    </Col>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="mt-1"
                    >
                      <span style={{ fontSize: "14px" }}>
                        Stance: {req.stance.slice(0, 20)}
                        {/* <span>...</span> */}
                      </span>
                      {/* <span style={{ cursor: "pointer" }} className="me-1">
                      <i className="fa-regular fa-pen-to-square" onClick={()=> navigate(`/app/edit-pool/${req.pool.pool_id}`)} />
                      </span> */}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Card>
        );
      });
    setCards(x);
  }, [requests]);

  return (
    <Card.Body
      className="p-0"
      style={{
        maxHeight: "29.75rem",
        overflowY: "scroll",
        scrollBehavior: "smooth",
      }}
    >
      <Card.Text className="pt-3">
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {cards}
      </Card.Text>
    </Card.Body>
  );
};

export default ManageRequests;
