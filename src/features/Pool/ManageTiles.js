import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  // Dropdown,
  OverlayTrigger,
  Tooltip,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyPools } from "../../actions/poolActions";
import Message from "../../components/Message";
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/Loader";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import PoolRequests from "./PoolRequests";
// import randomColor from "randomcolor";
// import { useLocation, useNavigate } from "react-router-dom";
import socket from "../../socket";
import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    mm: "%d mins",
  },
});

const ManageTiles = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return <div onClick={decoratedOnClick}>{children}</div>;
  }

  // const navigate = useNavigate();

  function CreateRoom({ pool }) {
    const { pool_id, title } = pool;
    const startBtnClick = () => {
      console.log(`/api/pools/${pool_id}/requests`)
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
            throw Error("Error getting users list");
          }
        })
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].status === "accepted")
              socket.emit("notification", {
                userId: data[i].user_id,
                message: `${userInfo.username} has started ${title}. Click here to join the discussion.`,
              });
          }
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
          // setIsError(true)
        });

      // socket.emit('notification', { userId:user_id , message: noti})

      console.log("helllo");
      window.open(`http://localhost:8080/join/${pool_id}`, "_blank");
      // joinRoom(pool_id)

      // console.log(`http://localhost:5000/join/${pool_id}`)
    };

    return (
      <span style={{ cursor: "pointer" }} className="me-1">
        <i className="fa-solid fa-play" onClick={startBtnClick} />
      </span>
    );
  }

  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(getMyPools());
  }, []);

  const color = "#ffe6cd";

  const getMyPoolsData = useSelector((state) => state.getMyPools);
  const { loading, error, message, pools } = getMyPoolsData;

  // const handleVideoStart = (id) => {
  //   window.location.replace(`http://localhost:8080/join/${id}`);
  // };

  useEffect(() => {
    const x =
      pools &&
      pools.map((pool, index) => {
        const time = moment(pool.created_at).fromNow();

        return (
          <Card
            key={pool.pool_id}
            style={{ background: `${color}` }}
            className="p-0 mb-2"
          >
            <Col sm={12}>
              <CustomToggle eventKey={`${index}`}>
                <Card.Body style={{ cursor: "pointer" }}>
                  <Row>
                    <Col xs={12}>
                      <Row>
                        <Col xs={4} className="mb-2 d-flex">
                          <i
                            className="fa-solid fa-circle"
                            style={{ color: "green", alignSelf: "center" }}
                          />

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`${time}`}>
                                <strong>{time}</strong>.
                              </Tooltip>
                            }
                          >
                            <span
                              style={{ alignSelf: "center", marginLeft: "4px" }}
                            >
                              {time.slice(0, 3)}...
                            </span>
                          </OverlayTrigger>
                        </Col>
                        <Col xs={4}>
                          <i
                            className={`fa-solid fa-user${
                              pool.discussion_type === "panel" ? "s" : ""
                            } `}
                            style={{ marginRight: "4px" }}
                          />
                          1/{pool.people_allowed}
                        </Col>
                        <Col xs={4}>
                          <i
                            className="fa-solid fa-bell"
                            style={{ marginRight: "7px", cursor: "pointer" }}
                          />
                          <i
                            className="fa-solid fa-share"
                            style={{ marginRight: "7px" }}
                          />
                          
                          <i className="fa-regular fa-pen-to-square" onClick={()=> navigate(`/app/edit-pool/${pool.pool_id}`)} />
                          
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
                        <span style={{ cursor: "pointer" }} className="ms-1">
                          {pool.title.length < 16 ? (
                            <span
                              style={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                              {pool.title}
                            </span>
                          ) : (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`${pool.title}`}>
                                  <strong>{pool.title}</strong>.
                                </Tooltip>
                              }
                            >
                              <span
                                style={{
                                  alignSelf: "center",

                                  fontSize: "13px",
                                  fontWeight: "bold",
                                }}
                              >
                                {pool.title.slice(0, 15)}...
                              </span>
                            </OverlayTrigger>
                          )}

                          <span
                            style={{ fontSize: "13px", marginLeft: "4px" }}
                          >{`(${pool.category})`}</span>
                        </span>
                        {/* <span
                          style={{ cursor: "pointer" }}
                          className="me-1"
                          onClick={() => handleVideoStart(pool.pool_id)}
                        >
                          <i class="fa-solid fa-play" />
                        </span> */}
                        <CreateRoom pool={pool}></CreateRoom>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </CustomToggle>
              <Accordion.Collapse
                eventKey={`${index}`}
                style={{
                  maxHeight: "14.3rem",
                  overflowY: "scroll",
                  scrollBehavior: "smooth",
                }}
              >
                <Card.Footer>
                  <PoolRequests pool_id={pool.pool_id} />
                </Card.Footer>
              </Accordion.Collapse>
            </Col>
          </Card>
        );
      });
    setCards(<Accordion>{x}</Accordion>);
  }, [pools]);

  return (
    <Card.Body
      style={{
        maxHeight: "32.5rem",
        overflowY: "scroll",
        scrollBehavior: "smooth",
      }}
      className="p-0"
    >
      <Card.Text className="pt-3">
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {cards}
      </Card.Text>
    </Card.Body>
  );
};

export default ManageTiles;
